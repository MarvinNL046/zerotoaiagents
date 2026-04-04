import { NextResponse } from "next/server";

// TEMPORARY - will be deleted immediately after reading the value
export async function GET() {
  return NextResponse.json({
    ps: process.env.PIPELINE_SECRET,
  });
}
