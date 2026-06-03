import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  phone: string;
  from: string;
  to: string;
  type: string;
  info?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, from, to, type, info } = body;

  if (!name?.trim() || !phone?.trim() || !from?.trim() || !to?.trim() || !type?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[contact] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json({ error: "Notification service not configured" }, { status: 503 });
  }

  const text = [
    `📦 <b>Нова заявка з сайту VVA-logistic</b>`,
    ``,
    `👤 <b>Ім'я:</b> ${name}`,
    `📞 <b>Телефон:</b> ${phone}`,
    ``,
    `📍 <b>Звідки:</b> ${from}`,
    `📍 <b>Куди:</b> ${to}`,
    `🚚 <b>Тип вантажу:</b> ${type}`,
    info?.trim() ? `📝 <b>Додатково:</b> ${info}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, message_thread_id: 1735, text, parse_mode: "HTML" }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[Telegram] send error:", err);
      return NextResponse.json({ error: "Telegram delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Telegram] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
