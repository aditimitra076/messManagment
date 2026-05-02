function money(n) {
  const v = Number(n);
  if (Number.isNaN(v)) return "—";
  return `₹${v.toFixed(2)}`;
}

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * @param {object} data
 * @param {string} data.hostelName
 * @param {string} [data.location]
 * @param {string} data.periodLabel
 * @param {object} data.consumptionSummary
 * @param {Array} data.consumptionRows
 * @param {object} data.bills
 * @param {object} data.dailyExpense
 * @param {object} data.specialMeals
 * @param {object} data.feedback
 */
export function monthlyReportTemplate(data) {
  const rows = (data.consumptionRows || [])
    .slice(0, 25)
    .map(
      (r) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${esc(r.item_name)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${esc(r.unit)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${esc(String(r.total_quantity ?? ""))}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${money(r.total_cost)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${esc(String(r.days_used ?? ""))}</td>
      </tr>`
    )
    .join("");

  const cs = data.consumptionSummary || {};
  const bills = data.bills || {};
  const de = data.dailyExpense || {};
  const sm = data.specialMeals || {};
  const fb = data.feedback || {};

  return `
  <div style="font-family:'Segoe UI',sans-serif;background:#f4f7f6;padding:20px;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.06);border:1px solid #e0e0e0;">
      <tr>
        <td style="padding:28px;background:#1e3a5f;color:#fff;">
          <h2 style="margin:0;font-size:20px;">Hostel mess — monthly report</h2>
          <p style="margin:8px 0 0;opacity:0.9;font-size:15px;">${esc(data.periodLabel)}</p>
          <p style="margin:6px 0 0;font-size:14px;"><strong>${esc(data.hostelName)}</strong>${data.location ? ` · ${esc(data.location)}` : ""}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;color:#334155;font-size:14px;line-height:1.5;">
            This is the automated summary for the <strong>previous calendar month</strong>, sent on the 15th as scheduled.
          </p>

          <h3 style="margin:20px 0 10px;font-size:15px;color:#0f172a;">Ration &amp; consumption</h3>
          <table width="100%" style="background:#f8fafc;padding:14px;border-radius:10px;margin-bottom:8px;font-size:14px;">
            <tr><td>Total ration cost (month)</td><td align="right"><strong>${money(cs.total_monthly_cost)}</strong></td></tr>
            <tr><td>Days with consumption records</td><td align="right">${esc(String(cs.active_days ?? 0))}</td></tr>
            <tr><td>Distinct items used</td><td align="right">${esc(String(cs.items_used ?? 0))}</td></tr>
          </table>

          <table width="100%" style="border-collapse:collapse;font-size:13px;margin-top:12px;">
            <thead>
              <tr style="background:#e2e8f0;color:#0f172a;">
                <th align="left" style="padding:8px;">Item</th>
                <th align="left" style="padding:8px;">Unit</th>
                <th align="right" style="padding:8px;">Qty</th>
                <th align="right" style="padding:8px;">Cost</th>
                <th align="right" style="padding:8px;">Days</th>
              </tr>
            </thead>
            <tbody>${rows || `<tr><td colspan="5" style="padding:12px;color:#64748b;">No ration consumption recorded for this month.</td></tr>`}</tbody>
          </table>
          ${(data.consumptionRows || []).length > 25 ? `<p style="font-size:12px;color:#64748b;margin-top:8px;">Showing top 25 lines by cost.</p>` : ""}

          <h3 style="margin:24px 0 10px;font-size:15px;color:#0f172a;">Billing &amp; expenses</h3>
          <table width="100%" style="background:#f8fafc;padding:14px;border-radius:10px;font-size:14px;">
            <tr><td>Total billed (all students)</td><td align="right"><strong>${money(bills.total_billed)}</strong></td></tr>
            <tr><td>Recorded as paid</td><td align="right">${money(bills.total_paid)}</td></tr>
            <tr><td>Bill rows</td><td align="right">${esc(String(bills.bill_rows ?? 0))}</td></tr>
            <tr><td>Sum of daily normal expenses</td><td align="right">${money(de.total_daily_expense)}</td></tr>
            <tr><td>Special meals — total cost</td><td align="right">${money(sm.special_cost)}</td></tr>
            <tr><td>Special meals — plates / events</td><td align="right">${esc(String(sm.special_plates ?? 0))} / ${esc(String(sm.special_events ?? 0))}</td></tr>
          </table>

          <h3 style="margin:24px 0 10px;font-size:15px;color:#0f172a;">Feedback</h3>
          <table width="100%" style="background:#f8fafc;padding:14px;border-radius:10px;font-size:14px;">
            <tr><td>Average food rating</td><td align="right">${fb.avg_food != null ? Number(fb.avg_food).toFixed(2) : "—"}</td></tr>
            <tr><td>Average hygiene rating</td><td align="right">${fb.avg_hygiene != null ? Number(fb.avg_hygiene).toFixed(2) : "—"}</td></tr>
            <tr><td>Responses</td><td align="right">${esc(String(fb.feedback_count ?? 0))}</td></tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 28px 24px;font-size:12px;color:#94a3b8;">
          Mess Management System · automated message
        </td>
      </tr>
    </table>
  </div>`;
}
