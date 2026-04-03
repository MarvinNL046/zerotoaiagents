import { NextRequest, NextResponse } from "next/server";

// Click tracking — database backend (Convex) not yet connected.
// TODO: persist to Convex once wired in.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, page, referrer } = body;

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-country") ||
      "unknown";

    console.log("Affiliate click received (not yet persisted):", {
      agentId,
      country,
      referrer,
      page,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track click:", error);
    // Still return success — don't block user experience for tracking failures
    return NextResponse.json({ success: true });
  }
}
