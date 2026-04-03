import { NextRequest, NextResponse } from "next/server";

// Subscribers API — database backend (Convex) not yet connected.
// TODO: persist to Convex once wired in.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, language = "en", source = "homepage" } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    console.log("Subscriber signup received (not yet persisted):", {
      email: email.toLowerCase(),
      language,
      source,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
