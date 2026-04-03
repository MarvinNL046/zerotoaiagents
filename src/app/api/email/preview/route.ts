import { NextResponse } from "next/server";

// Email preview API — Resend has been removed.
// TODO: implement email templates once the email system is rebuilt on Convex.

export async function GET() {
  return NextResponse.json(
    { error: "Email preview not yet available — pending email system rebuild" },
    { status: 503 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Email preview not yet available — pending email system rebuild" },
    { status: 503 }
  );
}
