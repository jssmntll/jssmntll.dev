interface Env {
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_CHAT_ID: string;
	ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/contact" && request.method === "POST") {
			try {
				const body = await request.json();

				if (!validate(body)) {
					return new Response(
						JSON.stringify({ error: "Invalid payload" }),
						{ status: 400, headers: { "Content-Type": "application/json" } },
					);
				}

				const { name, email, message } = body;

				if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
					return new Response(
						JSON.stringify({ error: "Server configuration error" }),
						{ status: 500, headers: { "Content-Type": "application/json" } },
					);
				}

				const text = [
					"<b>New Contact Message</b>",
					"",
					`<b>Name:</b> ${escapeHtml(name.trim())}`,
					`<b>Email:</b> ${escapeHtml(email.trim())}`,
					"<b>Message:</b>",
					escapeHtml(message.trim()),
				].join("\n");

				const tgResponse = await fetch(
					`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: env.TELEGRAM_CHAT_ID,
							text,
							parse_mode: "HTML",
						}),
					},
				);

				if (!tgResponse.ok) {
					console.error("Telegram API error:", await tgResponse.text());
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

		return env.ASSETS.fetch(request);
	},
};

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

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}
