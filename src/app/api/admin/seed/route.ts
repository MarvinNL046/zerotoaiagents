import { NextResponse } from "next/server";
import { getDb, aiAgentProviders as aiAgentProvidersTable } from "@/lib/db";
import { aiAgentProviders } from "@/lib/ai-agent-data";
import { count } from "drizzle-orm";

// POST /api/admin/seed - Seed the database with AI agent data
export async function POST() {
  try {
    const db = getDb();

    // Check if we already have data
    const existingResult = await db
      .select({ count: count() })
      .from(aiAgentProvidersTable);
    const existingCount = existingResult[0]?.count ?? 0;

    if (existingCount > 0) {
      return NextResponse.json(
        {
          message: "Database already has AI agent data",
          count: existingCount,
          seeded: false,
        },
        { status: 200 }
      );
    }

    // Seed AI agent providers
    const results = [];
    for (const agent of aiAgentProviders) {
      const created = await db
        .insert(aiAgentProvidersTable)
        .values({
          id: agent.id,
          name: agent.name,
          slug: agent.slug,
          logo: agent.logo,
          website: agent.website,
          affiliateUrl: agent.affiliateUrl,
          monthlyPrice: String(agent.monthlyPrice),
          annualPrice: String(agent.annualPrice),
          hasFreeTier: agent.hasFreeTier,
          freeTierLimits: agent.freeTierLimits,
          category: agent.category,
          subcategory: agent.subcategory,
          modelsSupported: agent.modelsSupported,
          integrations: agent.integrations,
          maxUsers: agent.maxUsers,
          apiAccess: agent.apiAccess,
          overallRating: String(agent.overallRating),
          easeOfUse: String(agent.easeOfUse),
          performance: String(agent.performance),
          valueForMoney: String(agent.valueForMoney),
          shortDescription: agent.shortDescription,
          pros: agent.pros,
          cons: agent.cons,
          features: agent.features,
          bestFor: agent.bestFor,
          editorChoice: agent.editorChoice,
          featured: agent.featured,
          sortOrder: agent.sortOrder,
        })
        .returning();
      results.push(created[0].name);
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      count: results.length,
      seeded: true,
      agents: results,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/admin/seed - Check seed status
export async function GET() {
  try {
    const db = getDb();
    const result = await db
      .select({ count: count() })
      .from(aiAgentProvidersTable);
    const dbCount = result[0]?.count ?? 0;

    return NextResponse.json({
      count: dbCount,
      isEmpty: dbCount === 0,
      staticDataCount: aiAgentProviders.length,
      databaseAvailable: true,
    });
  } catch (error) {
    console.error("Error checking seed status:", error);
    return NextResponse.json({
      count: 0,
      isEmpty: true,
      staticDataCount: aiAgentProviders.length,
      databaseAvailable: false,
      error: String(error),
    });
  }
}
