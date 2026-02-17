import { NextRequest, NextResponse } from "next/server";
import { getAllAgentsFromDb, createAgent, getAgentCount } from "@/lib/db/agent-service";

// GET /api/admin/vpns - List all AI agents
export async function GET() {
  try {
    const agents = await getAllAgentsFromDb();
    const count = await getAgentCount();
    return NextResponse.json({ vpns: agents, count });
  } catch (error) {
    console.error("Error fetching AI agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI agents" },
      { status: 500 }
    );
  }
}

// POST /api/admin/vpns - Create a new AI agent
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.slug || !data.website || !data.affiliateUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, website, affiliateUrl" },
        { status: 400 }
      );
    }

    const agent = await createAgent({
      name: data.name,
      slug: data.slug,
      logo: data.logo || null,
      screenshot: data.screenshot || null,
      thumbnailImage: data.thumbnailImage || null,
      cardImage: data.cardImage || null,
      ogImage: data.ogImage || null,
      website: data.website,
      affiliateUrl: data.affiliateUrl,
      monthlyPrice: Number(data.monthlyPrice || 0),
      annualPrice: Number(data.annualPrice || 0),
      hasFreeTier: data.hasFreeTier ?? false,
      freeTierLimits: data.freeTierLimits || null,
      category: data.category || "general-purpose",
      subcategory: data.subcategory || null,
      modelsSupported: data.modelsSupported || [],
      integrations: data.integrations || [],
      maxUsers: data.maxUsers || "Unlimited",
      apiAccess: data.apiAccess ?? false,
      overallRating: Number(data.overallRating || 3.0),
      easeOfUse: Number(data.easeOfUse || 3.0),
      performance: Number(data.performance || 3.0),
      valueForMoney: Number(data.valueForMoney || 3.0),
      features: data.features || [],
      bestFor: data.bestFor || null,
      editorChoice: data.editorChoice || false,
      shortDescription: data.shortDescription || null,
      pros: data.pros || [],
      cons: data.cons || [],
      featured: data.featured || false,
      sortOrder: data.sortOrder || 999,
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error("Error creating AI agent:", error);
    return NextResponse.json(
      { error: "Failed to create AI agent" },
      { status: 500 }
    );
  }
}
