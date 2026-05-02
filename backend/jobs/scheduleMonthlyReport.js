import cron from "node-cron";
import supervisorQueries from "../db/messSupervisor.db.js";
import userQueries from "../db/user.query.js";
import { sendMonthlyReportEmail } from "../utils/mailer.js";
import { monthlyReportTemplate } from "../utils/templates/monthlyReportTemplate.js";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/** Calendar month immediately before the reference date (e.g. run on Feb 15 → January). */
export function getPreviousCalendarMonth(referenceDate = new Date()) {
  const d = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() - 1,
    1
  );
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

function parseExtraEmails() {
  const raw = process.env.MONTHLY_REPORT_CC_EMAILS || "";
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

/**
 * @param {import("mysql2/promise").Pool} pool
 */
export async function runMonthlyReportJob(pool) {
  const { year, month } = getPreviousCalendarMonth();
  const periodLabel = `${MONTH_NAMES[month - 1]} ${year}`;

  const [hostels] = await pool.query(userQueries.getAllHostels);
  if (!hostels?.length) {
    console.warn("[monthly-report] No hostels found; skipping.");
    return;
  }

  for (const hostel of hostels) {
    const hostelId = hostel.hostel_id;
    try {
      const [wardenRows] = await pool.query(userQueries.getWardenEmailsByHostel, [
        hostelId
      ]);
      const wardenEmails = (wardenRows || [])
        .map((r) => r.email)
        .filter(Boolean);
      const extra = parseExtraEmails();
      const recipients = [...new Set([...wardenEmails, ...extra])];

      if (!recipients.length) {
        console.warn(
          `[monthly-report] Hostel ${hostelId} (${hostel.hostel_name}): no WARDEN emails and MONTHLY_REPORT_CC_EMAILS empty; skip.`
        );
        continue;
      }

      const [
        [consumptionData],
        [summaryData],
        [billData],
        [dailyData],
        [specialData],
        [feedbackData]
      ] = await Promise.all([
        pool.query(supervisorQueries.getMonthlyConsumption, [
          hostelId,
          year,
          month
        ]),
        pool.query(supervisorQueries.getMonthlyConsumptionSummary, [
          hostelId,
          year,
          month
        ]),
        pool.query(userQueries.getMonthlyBillSummaryByHostel, [
          hostelId,
          month,
          year
        ]),
        pool.query(userQueries.getMonthlyDailyExpenseTotalByHostel, [
          hostelId,
          year,
          month
        ]),
        pool.query(userQueries.getMonthlySpecialMealsSummaryByHostel, [
          hostelId,
          year,
          month
        ]),
        pool.query(userQueries.getMonthlyFeedbackAvgByHostel, [
          hostelId,
          year,
          month
        ])
      ]);

      const summary = summaryData[0] || {
        total_monthly_cost: 0,
        active_days: 0,
        items_used: 0
      };
      const bills = billData[0] || {
        total_billed: 0,
        total_paid: 0,
        bill_rows: 0
      };
      const dailyExpense = {
        total_daily_expense: dailyData[0]?.total_daily_expense ?? 0
      };
      const specialMeals = specialData[0] || {
        special_cost: 0,
        special_plates: 0,
        special_events: 0
      };
      const feedback = {
        avg_food: feedbackData[0]?.avg_food ?? null,
        avg_hygiene: feedbackData[0]?.avg_hygiene ?? null,
        feedback_count: feedbackData[0]?.feedback_count ?? 0
      };

      const html = monthlyReportTemplate({
        hostelName: hostel.hostel_name || `Hostel #${hostelId}`,
        location: hostel.location,
        periodLabel,
        consumptionSummary: summary,
        consumptionRows: consumptionData,
        bills,
        dailyExpense,
        specialMeals,
        feedback
      });

      const subject = `Mess monthly report — ${periodLabel} — ${hostel.hostel_name || hostelId}`;
      const result = await sendMonthlyReportEmail(recipients, subject, html);
      if (!result.success) {
        console.error(
          `[monthly-report] Email failed for hostel ${hostelId}:`,
          result.error?.message || result.error
        );
      } else {
        console.log(
          `[monthly-report] Sent ${periodLabel} for hostel ${hostelId} → ${recipients.join(", ")}`
        );
      }
    } catch (err) {
      console.error(`[monthly-report] Hostel ${hostelId} error:`, err);
    }
  }
}

/**
 * Schedules the job on the 15th of each month (default 09:00 server time).
 * @param {import("mysql2/promise").Pool} pool
 */
export function scheduleMonthlyReport(pool) {
  if (process.env.MONTHLY_REPORT_ENABLED === "false") {
    console.log("[monthly-report] Disabled via MONTHLY_REPORT_ENABLED=false");
    return;
  }

  const expr = process.env.MONTHLY_REPORT_CRON || "0 9 15 * *";
  const tz = process.env.MONTHLY_REPORT_TZ || process.env.TZ;
  const opts = {};
  if (tz) opts.timezone = tz;

  try {
    cron.schedule(
      expr,
      () => {
        runMonthlyReportJob(pool).catch((e) =>
          console.error("[monthly-report] Job failed:", e)
        );
      },
      opts
    );
    console.log(
      `[monthly-report] Cron registered: "${expr}"${tz ? ` (${tz})` : " (server local time)"}`
    );
  } catch (e) {
    console.error("[monthly-report] Invalid cron expression:", expr, e);
  }
}
