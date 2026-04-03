import { NextRequest, NextResponse } from "next/server";

// Rate limiting map (in-memory; fine for low traffic until Redis/Convex is set up)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0] : "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const requests = (rateLimitMap.get(key) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  rateLimitMap.set(key, requests);
  if (requests.length >= MAX_REQUESTS_PER_WINDOW) return true;
  requests.push(now);
  rateLimitMap.set(key, requests);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validLanguages = ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"];

// Newsletter subscribe — database backend (Convex) not yet connected.
// TODO: persist to Convex and send welcome email once wired in.

export async function POST(request: NextRequest) {
  try {
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, language = "en", source = "website" } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalizedLanguage = validLanguages.includes(language) ? language : "en";

    console.log("Newsletter subscription received (not yet persisted):", {
      email: normalizedEmail,
      language: normalizedLanguage,
      source,
    });

    return NextResponse.json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
