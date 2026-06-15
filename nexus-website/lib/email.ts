import nodemailer, { type Transporter } from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  interest?: string;
  message: string;
  ip?: string | null;
  userAgent?: string | null;
}

let _transporter: Transporter | null = null;

/**
 * Build the SMTP transport from env vars. Returns null if SMTP isn't configured
 * — callers should treat that as "skip email, continue silently".
 *
 * Required env vars (set them in Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST            e.g. smtp.gmail.com / smtp.zoho.com / smtp.sendgrid.net
 *   SMTP_PORT            e.g. 465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER            SMTP username (usually the full email)
 *   SMTP_PASSWORD        SMTP password / app password / API key
 *   SMTP_FROM            "From" address — e.g. "Nexus Realty <noreply@nexusrealtymarketing.pk>"
 *   CONTACT_TO_EMAIL     Inbox that receives form notifications
 *
 * Optional:
 *   SMTP_SECURE          "true" forces SSL (default: true if port is 465)
 */
function getTransporter(): Transporter | null {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) return null;

  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return _transporter;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export interface SendResult {
  sent: boolean;
  reason?: string;
}

export async function sendContactNotification(payload: ContactPayload): Promise<SendResult> {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER!;

  const subject = `New website enquiry — ${payload.name}${payload.interest ? ` (${payload.interest})` : ""}`;

  const text = [
    `New contact form submission from nexusrealtymarketing.pk`,
    ``,
    `Name:     ${payload.name}`,
    `Email:    ${payload.email}`,
    `Phone:    ${payload.phone}`,
    `Interest: ${payload.interest ?? "—"}`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `—`,
    `IP:       ${payload.ip ?? "unknown"}`,
    `Browser:  ${payload.userAgent ?? "unknown"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
      <h2 style="margin:0 0 16px;color:#2D3A4A;font-weight:300">New website enquiry</h2>
      <p style="margin:0 0 24px;color:#6B7D8D;font-size:14px">From <strong>${escape(payload.name)}</strong>${payload.interest ? ` — interested in <strong>${escape(payload.interest)}</strong>` : ""}.</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#6B7D8D;width:90px">Email</td><td><a href="mailto:${escape(payload.email)}" style="color:#D4AF37">${escape(payload.email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6B7D8D">Phone</td><td><a href="tel:${escape(payload.phone)}" style="color:#D4AF37">${escape(payload.phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6B7D8D;vertical-align:top">Message</td><td style="white-space:pre-wrap">${escape(payload.message)}</td></tr>
      </table>

      <hr style="border:none;border-top:1px solid #E0E4E8;margin:24px 0">
      <p style="margin:0;color:#8FA3B3;font-size:12px">
        IP: ${escape(payload.ip ?? "unknown")}<br>
        Browser: ${escape(payload.userAgent ?? "unknown")}
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "Unknown SMTP error",
    };
  }
}
