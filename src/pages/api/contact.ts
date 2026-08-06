export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function validate(payload: unknown): payload is ContactPayload {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    p.name.trim().length >= 2 &&
    typeof p.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) &&
    typeof p.message === "string" &&
    p.message.trim().length >= 10
  );
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();

    if (!validate(body)) {
      return new Response(
        JSON.stringify({ error: "Invalid payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { name, email, message } = body;

    const telegramToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!telegramToken || !telegramChatId) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const text = [
      `<b>New Contact Message</b>`,
      ``,
      `<b>Name:</b> ${escapeHtml(name.trim())}`,
      `<b>Email:</b> ${escapeHtml(email.trim())}`,
      `<b>Message:</b>`,
      `${escapeHtml(message.trim())}`,
    ].join("\n");

    const telegramUrl =
      `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!tgResponse.ok) {
      const err = await tgResponse.text();
      console.error("Telegram API error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to send message" }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Contact endpoint error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
