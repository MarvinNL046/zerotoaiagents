import { NextResponse } from "next/server";

// Pipeline generate API — not yet available on Convex backend.
// TODO: implement using Convex once the blog pipeline is migrated.

export const maxDuration = 300;

export async function POST() {
  return NextResponse.json(
    { error: "Pipeline not yet available — pending Convex migration" },
    { status: 503 }
  );
}
