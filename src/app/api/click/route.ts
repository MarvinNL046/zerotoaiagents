import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, page, referrer } = body;

    // Get geo information from headers (Netlify/Vercel provide these)
    const country = request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-country") ||
      request.headers.get("x-nf-client-connection-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check if AI agent exists in database
    const agent = await sql`
      SELECT id FROM "AiAgentProvider" WHERE slug = ${agentId} OR id = ${agentId}
    `;

    if (agent.length > 0) {
      // Insert click record
      await sql`
        INSERT INTO "Click" (id, "agentId", page, country, referrer, user_agent, created_at)
        VALUES (gen_random_uuid()::text, ${agent[0].id}, ${page}, ${country}, ${referrer}, ${userAgent}, NOW())
      `;
    } else {
      // Log click even if agent not in DB yet
      console.log("Affiliate click (agent not in DB):", {
        agentId,
        country,
        referrer,
        page,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track click:", error);
    // Still return success - don't block user experience for tracking failures
    return NextResponse.json({ success: true });
  }
}
