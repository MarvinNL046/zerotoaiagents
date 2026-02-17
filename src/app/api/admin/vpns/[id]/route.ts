import { NextRequest, NextResponse } from "next/server";
import { getAgentByIdFromDb, updateAgent, deleteAgent } from "@/lib/db/agent-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/admin/vpns/[id] - Get single AI agent
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const agent = await getAgentByIdFromDb(id);

    if (!agent) {
      return NextResponse.json({ error: "AI agent not found" }, { status: 404 });
    }

    return NextResponse.json({ agent });
  } catch (error) {
    console.error("Error fetching AI agent:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI agent" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/vpns/[id] - Update AI agent
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    // Check if agent exists
    const existing = await getAgentByIdFromDb(id);
    if (!existing) {
      return NextResponse.json({ error: "AI agent not found" }, { status: 404 });
    }

    const agent = await updateAgent(id, data);
    return NextResponse.json({ agent });
  } catch (error) {
    console.error("Error updating AI agent:", error);
    return NextResponse.json(
      { error: "Failed to update AI agent" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/vpns/[id] - Delete AI agent
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Check if agent exists
    const existing = await getAgentByIdFromDb(id);
    if (!existing) {
      return NextResponse.json({ error: "AI agent not found" }, { status: 404 });
    }

    await deleteAgent(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting AI agent:", error);
    return NextResponse.json(
      { error: "Failed to delete AI agent" },
      { status: 500 }
    );
  }
}
