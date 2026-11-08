import { NextResponse } from "next/server";

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Winwin Club Website <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = Record<string, unknown>;

function readText(body: Body, key: string, maxLength: number) {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/** Single-line values are used in the subject, so collapse any line breaks. */
function readLine(body: Body, key: string, maxLength: number) {
  return readText(body, key, maxLength).replace(/\s+/g, " ");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    body = parsed as Body;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Hidden field that only bots fill in. Pretend it worked and send nothing.
  if (readText(body, "website", 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = readLine(body, "name", 120);
  const email = readLine(body, "email", 200);
  const topic = readLine(body, "topic", 100);
  const message = readText(body, "message", 5000);

  if (!name || !EMAIL_PATTERN.test(email) || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL."
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: email,
        subject: `Website message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Topic: ${topic || "Not specified"}`,
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Contact form email failed: Resend ${response.status}`);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error(
      "Contact form email failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
