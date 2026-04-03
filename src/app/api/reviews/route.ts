import { NextRequest, NextResponse } from "next/server";

// Reviews API — database backend (Convex) not yet connected.
// POST: accepts submissions but does not persist them yet.
// GET: returns empty list until Convex is wired in.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      agentSlug,
      rating,
      title,
      content,
      authorName,
      authorEmail,
    } = body;

    // Validation
    if (!agentSlug || !rating || !title || !content || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: persist to Convex once the mutation is wired in
    console.log("Review submission received (not yet persisted):", {
      agentSlug,
      rating,
      authorName,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully. It will be visible after moderation.",
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const agentSlug = searchParams.get("agentSlug");

  if (!agentSlug) {
    return NextResponse.json(
      { error: "agentSlug parameter is required" },
      { status: 400 }
    );
  }

  // TODO: fetch from Convex once wired in
  return NextResponse.json({
    reviews: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
}
