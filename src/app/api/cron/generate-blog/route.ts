import { NextRequest, NextResponse } from "next/server";

// Blog generation cron — not yet available on Convex backend.
// TODO: implement using Convex once the blog pipeline is migrated.

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    { error: "Blog pipeline not yet available — pending Convex migration" },
    { status: 503 }
  );
}
