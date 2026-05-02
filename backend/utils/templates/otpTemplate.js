/** @typedef {{ label: string; accent: string; subtitle: string }} RoleMeta */

/** Refined labels + accent stripe color per portal */
const ROLE_META = {
  STUDENT: {
    label: "Student",
    subtitle: "Mess card, bills & feedback",
    accent: "#2563eb"
  },
  WARDEN: {
    label: "Warden",
    subtitle: "Hostel & staff administration",
    accent: "#1e3a5f"
  },
  MESS_SECRETARY: {
    label: "Mess Secretary",
    subtitle: "Ration, specials & weekly expenses",
    accent: "#7c3aed"
  },
  CARE_TAKER: {
    label: "Care Taker",
    subtitle: "Student records & daily expenses",
    accent: "#0d9488"
  },
  MESS_SUPERVISOR: {
    label: "Mess Supervisor",
    subtitle: "Ration items & consumption",
    accent: "#c2410c"
  }
};

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fallbackRoleMeta(role) {
  const raw = String(role || "USER").trim();
  const label = raw
    .split(/[_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return {
    label: label || "User",
    subtitle: "Secure sign-in to Hostel Mess Management",
    accent: "#475569"
  };
}

/**
 * @param {string} role
 */
export function otpEmailSubject(role) {
  const meta = ROLE_META[role] || fallbackRoleMeta(role);
  return `Your sign-in code — ${meta.label}`;
}

/**
 * @param {string} otp
 * @param {string} [role]
 */
export const otpTemplate = (otp, role = "STUDENT") => {
  const meta = ROLE_META[role] || fallbackRoleMeta(role);
  const digits = String(otp)
    .replace(/\D/g, "")
    .padStart(6, "0")
    .slice(0, 6)
    .split("");

  const digitCells = digits
    .map(
      (d) => `
      <td style="padding:4px;">
        <div style="min-width:40px;height:52px;line-height:52px;text-align:center;font-family:'Segoe UI',Consolas,monospace;font-size:24px;font-weight:700;color:#0f172a;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;box-shadow:inset 0 1px 0 #fff;">
          ${esc(d)}
        </div>
      </td>`
    )
    .join("");

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f1f5f9;padding:32px 16px;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:440px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
        <tr>
          <td style="height:4px;background:${meta.accent};"></td>
        </tr>
        <tr>
          <td style="padding:28px 28px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Verification</p>
                  <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.25;">Sign in to your account</h1>
                </td>
                <td align="right" valign="top" style="white-space:nowrap;">
                  <span style="display:inline-block;padding:6px 12px;font-size:12px;font-weight:600;color:#0f172a;background:#f1f5f9;border-radius:999px;border:1px solid #e2e8f0;">${esc(meta.label)}</span>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-size:14px;line-height:1.55;color:#475569;">${esc(meta.subtitle)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 28px 24px;">
            <p style="margin:0 0 16px;font-size:14px;color:#334155;">Enter this one-time code to finish logging in. It expires in <strong style="color:#0f172a;">5 minutes</strong>.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
              <tr>${digitCells}</tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
              <tr>
                <td style="padding:14px 16px;">
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#64748b;">
                    <strong style="color:#475569;">Security tip:</strong> Hostel Mess Management will never ask for this code by phone. If you didn’t try to sign in, you can ignore this email—your password stays unchanged.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">Hostel Mess Management · University of Hyderabad</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
};
