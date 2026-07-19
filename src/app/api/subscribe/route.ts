import { NextRequest, NextResponse } from "next/server";

// Shared wetry-sites-leads backend (Convex HTTP API); override via env if needed
const CONVEX_SITE_URL =
  process.env.CONVEX_SITE_URL || "https://beaming-ermine-172.convex.site";

export async function POST(req: NextRequest) {
  const { email, site, locale } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    if (CONVEX_SITE_URL) {
      await fetch(`${CONVEX_SITE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          site: site || "zerotoaiagents",
          locale: locale || "en",
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
