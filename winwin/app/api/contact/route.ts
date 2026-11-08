import { NextResponse } from "next/server";

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Winwin Club Website <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|net|org|ru|xyz|top|info|biz|io)\b/gi;

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_TIME_MS = 3_000;
const MIN_MESSAGE_LENGTH = 10;
const MAX_LINKS_IN_MESSAGE = 2;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_TRACKED = 5_000;

/**
 * Recent sends per visitor. This lives in one server instance, so it slows abuse
 * rather than guaranteeing an exact limit across all of them.
 */
const recentSends = new Map<string, number[]>();

type Body = Record<string, unknown>;

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function readText(body: Body, key: string, maxLength: number) {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/** Single-line values are used in the subject, so collapse any line breaks. */
function readLine(body: Body, key: string, maxLength: number) {
  return readText(body, key, maxLength).replace(/\s+/g, " ");
}

function countLinks(text: string) {
  return text.match(LINK_PATTERN)?.length ?? 0;
}

/** Browsers send an Origin header. Bots posting directly usually don't, or it won't match. */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getVisitorKey(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(visitor: string) {
  const now = Date.now();
  const recent = (recentSends.get(visitor) ?? []).filter(
    (sentAt) => now - sentAt < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    recentSends.set(visitor, recent);
    return true;
  }

  if (recentSends.size >= RATE_LIMIT_MAX_TRACKED) recentSends.clear();
  recentSends.set(visitor, [...recent, now]);
  return false;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorResponse("forbidden", 403);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return errorResponse("invalid", 413);

  let body: Body;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null) {
      return errorResponse("invalid", 400);
    }
    body = parsed as Body;
  } catch {
    return errorResponse("invalid", 400);
  }

  // Hidden field that only bots fill in. Pretend it worked and send nothing.
  if (readText(body, "website", 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = readLine(body, "name", 120);
  const email = readLine(body, "email", 200);
  const topic = readLine(body, "topic", 100);
  const message = readText(body, "message", 5000);

  if (
    !name ||
    !EMAIL_PATTERN.test(email) ||
    message.length < MIN_MESSAGE_LENGTH
  ) {
    return errorResponse("invalid", 400);
  }

  const elapsedMs = body.elapsedMs;
  if (typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_TIME_MS) {
    return errorResponse("too_fast", 400);
  }

  if (
    countLinks(name) > 0 ||
    countLinks(message) > MAX_LINKS_IN_MESSAGE
  ) {
    return errorResponse("too_many_links", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL."
    );
    return errorResponse("not_configured", 503);
  }

  if (isRateLimited(getVisitorKey(request))) {
    return errorResponse("rate_limited", 429);
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
      return errorResponse("send_failed", 502);
    }
  } catch (error) {
    console.error(
      "Contact form email failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return errorResponse("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
