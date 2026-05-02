import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { otpTemplate, otpEmailSubject } from "./templates/otpTemplate.js";
import { billTemplate } from "./templates/billTemplate.js";

dotenv.config();

// Unified Transporter Configuration
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, 
  },
});

/**
 * Sends HTML OTP email (role-aware subject & layout).
 * @param {string} email
 * @param {string} otp
 * @param {string} [role]
 */
export async function sendOTP(email, otp, role) {
  try {
    await transporter.sendMail({
      from: `"Mess Management" <${process.env.MAIL_USER}>`,
      to: email,
      subject: otpEmailSubject(role),
      html: otpTemplate(otp, role)
    });
    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error };
  }
}

/**
 * Sends a professional HTML Bill statement
 */
export async function sendBillEmail(email, data) {
  try {
    await transporter.sendMail({
      from: `"Mess Billing" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Mess Bill for ${data.month} ${data.year}`,
      html: billTemplate(data), // Calling external HTML template
    });
    return { success: true };
  } catch (error) {
    console.error("Billing Email Error:", error);
    return { success: false, error };
  }
}

/**
 * @param {string[]} recipients
 * @param {string} subject
 * @param {string} html
 */
export async function sendMonthlyReportEmail(recipients, subject, html) {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.warn("Monthly report: MAIL_USER / MAIL_PASS not configured");
    return { success: false, error: new Error("Mail not configured") };
  }
  if (!recipients?.length) {
    return { success: false, error: new Error("No recipients") };
  }
  try {
    await transporter.sendMail({
      from: `"Mess Management" <${process.env.MAIL_USER}>`,
      to: recipients.join(", "),
      subject,
      html
    });
    return { success: true };
  } catch (error) {
    console.error("Monthly report email error:", error);
    return { success: false, error };
  }
}
