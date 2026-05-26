import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ─────────────────────────────────────────────────────────────────────────
 * Resend — 3 000 free emails / month (free, no credit card)
 *
 * Quick setup:
 *  1. resend.com → create account → API Keys → Create key
 *  2. Copy .env.local.example → .env.local, paste your key
 *  3. Restart the dev server
 *
 * "From" address options:
 *  • No domain verified  → "onboarding@resend.dev" (sandbox; emails
 *    only reach the address verified in your Resend account)
 *  • Domain verified     → set RESEND_FROM_EMAIL=noreply@yourdomain.com
 * ───────────────────────────────────────────────────────────────────────── */

interface ContactPayload {
  name: string;
  phone: string;
  from: string;
  to: string;
  type: string;
  info?: string;
}

export async function POST(request: Request) {
  /* ── Parse body ─────────────────────────────────────────────────── */
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, from, to, type, info } = body;

  /* ── Server-side validation ─────────────────────────────────────── */
  if (
    !name?.trim() ||
    !phone?.trim() ||
    !from?.trim() ||
    !to?.trim() ||
    !type?.trim()
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 422 }
    );
  }

  /* ── Guard: missing API key (build-time safe, runtime error) ────── */
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "[contact] RESEND_API_KEY is not set. Copy .env.local.example → .env.local"
    );
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  /* ── Instantiate inside handler so build succeeds without the key ── */
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "VVA-logistic <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_EMAIL ?? "vva-logistic@ukr.net";

  /* ── Send ───────────────────────────────────────────────────────── */
  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Нова заявка від ${name} | VVA-logistic`,
      html: buildEmailHtml({ name, phone, from, to, type, info }),
    });

    if (error) {
      console.error("[Resend] send error:", error);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Resend] unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ── HTML email template ─────────────────────────────────────────────── */

function buildEmailHtml(data: ContactPayload): string {
  const { name, phone, from, to, type, info } = data;

  const now = new Date().toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;font-weight:700;color:#666;width:38%;font-size:13px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#1a1a1a;font-size:14px;font-weight:500;">${value}</td>
    </tr>`;

  return /* html */ `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Нова заявка — ${name}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#eef2f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;" cellpadding="0" cellspacing="0">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#003366 0%,#0055aa 100%);
                     padding:32px 40px;text-align:center;border-radius:4px 4px 0 0;">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:900;
                       letter-spacing:4px;text-transform:uppercase;">VVA-logistic</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,.6);font-size:12px;letter-spacing:1px;">
              Нова заявка з сайту
            </p>
          </td>
        </tr>

        <!-- Timestamp banner -->
        <tr>
          <td style="background:#0066cc;padding:10px 40px;text-align:center;">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:700;
                      letter-spacing:2px;text-transform:uppercase;">
              📋 &nbsp;Отримано: ${now}
            </p>
          </td>
        </tr>

        <!-- Client -->
        <tr>
          <td style="background:#fff;padding:28px 40px 4px;">
            <p style="margin:0 0 14px;font-size:10px;font-weight:900;color:#0066cc;
                      letter-spacing:3px;text-transform:uppercase;">
              Дані клієнта
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border-top:2px solid #0066cc;">
              ${row("Ім'я:", name)}
              ${row("Телефон:", `<a href="tel:${phone}" style="color:#0066cc;text-decoration:none;font-weight:700;">${phone}</a>`)}
            </table>
          </td>
        </tr>

        <!-- Cargo -->
        <tr>
          <td style="background:#fff;padding:20px 40px 4px;">
            <p style="margin:0 0 14px;font-size:10px;font-weight:900;color:#0066cc;
                      letter-spacing:3px;text-transform:uppercase;">
              Деталі вантажу
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border-top:2px solid #0066cc;">
              ${row("Звідки:", from)}
              ${row("Куди:", to)}
              ${row("Тип вантажу:", type)}
              ${info ? row("Додатково:", info) : ""}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#fff;padding:24px 40px 36px;">
            <a href="tel:${phone.replace(/\s/g, "")}"
               style="display:inline-block;background:#003366;color:#fff;
                      font-size:12px;font-weight:900;letter-spacing:2px;
                      text-decoration:none;text-transform:uppercase;
                      padding:14px 28px;border-radius:2px;">
              📞 &nbsp;Зателефонувати клієнту
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#001a33;padding:18px 40px;text-align:center;
                     border-radius:0 0 4px 4px;">
            <p style="margin:0;color:rgba(255,255,255,.35);font-size:11px;letter-spacing:1px;">
              © ${new Date().getFullYear()} VVA-logistic &nbsp;·&nbsp; vva-logistic@ukr.net
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
