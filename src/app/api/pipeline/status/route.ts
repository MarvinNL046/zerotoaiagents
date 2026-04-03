import { NextResponse } from "next/server";

// Pipeline status API — not yet available on Convex backend.
// TODO: implement using Convex once the blog pipeline is migrated.

export async function GET() {
  return NextResponse.json(
    { error: "Pipeline not yet available — pending Convex migration" },
    { status: 503 }
  );
}
