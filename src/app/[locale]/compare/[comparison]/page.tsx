import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agent-data-layer";
import { ComparisonHero } from "@/components/compare/comparison-hero";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trophy } from "lucide-react";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import type { AiAgentData } from "@/lib/agent-data-layer";

type Props = {
  params: Promise<{ locale: string; comparison: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
export const revalidate = 86400;

// Parse comparison slug (e.g., "cursor-vs-windsurf" or "cursor-vs-windsurf-vs-github-copilot") into agent slugs
function parseComparisonSlug(comparison: string): { slugs: string[] } | null {
  const parts = comparison.split("-vs-");
  if (parts.length < 2 || parts.length > 3 || parts.some((p) => !p)) {
    return null;
  }
  return { slugs: parts };
}

function buildComparisonFaqs(agents: AiAgentData[]) {
  const namesJoined = agents.map((agent) => agent.name).join(" vs ");
  const highestRated = [...agents].sort((a, b) => b.overallRating - a.overallRating)[0];
  const cheapest = [...agents].sort((a, b) => a.annualPrice - b.annualPrice)[0];
  const easiest = [...agents].sort((a, b) => b.easeOfUse - a.easeOfUse)[0];

  return [
    {
      question: `Which is better: ${namesJoined}?`,
      answer:
        agents.length === 2
          ? `${highestRated.name} currently has the higher overall rating in our testing, but the better choice still depends on your workflow, budget, and preferred style of AI-assisted coding.`
          : `${highestRated.name} currently leads this comparison on overall rating, but the right choice depends on whether you prioritize price, ease of use, or raw performance.`,
    },
    {
      question: "Which option is best for beginners?",
      answer: `${easiest.name} is the easiest to start with in this comparison based on our ease-of-use rating and onboarding experience.`,
    },
    {
      question: "Which option offers the best value?",
      answer: `${cheapest.name} is the lowest-priced option in this comparison at about $${cheapest.annualPrice}/month on annual pricing, making it the strongest value pick for budget-conscious users.`,
    },
    {
      question: "Should I read the full reviews before choosing?",
      answer: "Yes. Comparison pages are best for narrowing the field, but the full reviews explain pricing tradeoffs, workflow fit, strengths, and limitations in much more detail.",
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, comparison } = await params;

  const parsed = parseComparisonSlug(comparison);
  if (!parsed) {
    return { title: "Comparison Not Found" };
  }

  const { slugs } = parsed;
  const agents = await Promise.all(slugs.map((s) => getAgentBySlug(s)));

  if (agents.some((a) => !a)) {
    return { title: "Comparison Not Found" };
  }

  const resolvedAgents = agents as AiAgentData[];
  const namesJoined = resolvedAgents.map((a) => a.name).join(" vs ");

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/compare/${comparison}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/compare/${comparison}`,
  };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/compare/${comparison}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: `${namesJoined}: Which is Better in 2026? - ZeroToAIAgents`,
    description: `Compare ${namesJoined} side by side. See the differences in speed, security, pricing, features, and more to choose the best AI agent for your needs.`,
    keywords: [
      `${namesJoined} comparison`,
      ...resolvedAgents.map((agent) => `${agent.name} review`),
      "AI agent comparison",
      "best AI coding agents 2026",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${namesJoined}: AI Agent Comparison 2026`,
      description: `Detailed comparison of ${namesJoined}. Find out which AI agent performs better, offers more features, and offers better value.`,
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${namesJoined}: AI Agent Comparison 2026`,
      description: `Detailed comparison of ${namesJoined}. Find out which tool is the better fit for your workflow.`,
    },
  };
}

// Comparison Schema for SEO
function ComparisonSchema({ agents }: { agents: AiAgentData[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    name: `${agents.map((a) => a.name).join(" vs ")} Comparison`,
    description: `Detailed comparison of ${agents.map((a) => a.name).join(", ")} AI agent platforms`,
    itemReviewed: agents.map((agent) => ({
      "@type": "SoftwareApplication",
      name: agent.name,
      applicationCategory: "AI Agent Platform",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: agent.overallRating,
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        price: agent.monthlyPrice,
        priceCurrency: "USD",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Three-agent comparison table rendered inline
function ThreeWayComparisonTable({ agents }: { agents: AiAgentData[] }) {
  const rows: Array<{
    label: string;
    getValue: (a: AiAgentData) => string | number | boolean | string[];
    format?: (v: string | number | boolean | string[]) => React.ReactNode;
  }> = [
    {
      label: "Overall Rating",
      getValue: (a) => a.overallRating,
      format: (v) => <span className="font-bold text-primary">{v}/5</span>,
    },
    {
      label: "Monthly Price",
      getValue: (a) => a.monthlyPrice,
      format: (v) => <span className="font-semibold">${v}/mo</span>,
    },
    {
      label: "Annual Price",
      getValue: (a) => a.annualPrice,
      format: (v) => <span className="font-bold text-green-600">${v}/mo</span>,
    },
    {
      label: "Free Tier",
      getValue: (a) => a.hasFreeTier,
      format: (v) =>
        v ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
    {
      label: "Category",
      getValue: (a) => a.category,
      format: (v) => <Badge variant="secondary">{v}</Badge>,
    },
    {
      label: "Max Users",
      getValue: (a) => a.maxUsers,
      format: (v) => <span className="font-semibold">{v}</span>,
    },
    {
      label: "API Access",
      getValue: (a) => a.apiAccess,
      format: (v) =>
        v ? (
          <Check className="h-6 w-6 text-green-500 mx-auto" />
        ) : (
          <X className="h-6 w-6 text-red-400 mx-auto" />
        ),
    },
    {
      label: "Ease of Use",
      getValue: (a) => a.easeOfUse,
      format: (v) => <span className="font-semibold">{v}/5</span>,
    },
    {
      label: "Performance",
      getValue: (a) => a.performance,
      format: (v) => <span className="font-semibold">{v}/5</span>,
    },
    {
      label: "Value for Money",
      getValue: (a) => a.valueForMoney,
      format: (v) => <span className="font-semibold">{v}/5</span>,
    },
  ];

  // Determine winner index (highest overall rating)
  const ratings = agents.map((a) => a.overallRating);
  const maxRating = Math.max(...ratings);
  const winnerIndex = ratings.filter((r) => r === maxRating).length === 1
    ? ratings.indexOf(maxRating)
    : -1; // -1 means tie

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Detailed Feature Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-4 bg-muted/50 font-semibold w-1/4">
                  Feature
                </th>
                {agents.map((agent, i) => (
                  <th key={agent.id} className="p-4 bg-muted/50 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-lg">{agent.name}</span>
                      {winnerIndex === i && (
                        <Trophy className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.label}
                  className={`border-b hover:bg-muted/30 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                >
                  <td className="p-4 font-medium">{row.label}</td>
                  {agents.map((agent) => {
                    const val = row.getValue(agent);
                    return (
                      <td key={agent.id} className="p-4 text-center">
                        {row.format ? row.format(val) : String(val)}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA Row */}
              <tr className="bg-muted/50">
                <td className="p-4 font-semibold">Get Started</td>
                {agents.map((agent) => (
                  <td key={agent.id} className="p-4">
                    <div className="flex flex-col gap-2">
                      <AffiliateButton
                        agentId={agent.id}
                        agentName={agent.name}
                        affiliateUrl={agent.affiliateUrl}
                        className="w-full"
                      >
                        Visit {agent.name}
                      </AffiliateButton>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/reviews/${agent.slug}`}>Read Review</Link>
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, comparison } = await params;
  setRequestLocale(locale);

  // Parse the comparison slug
  const parsed = parseComparisonSlug(comparison);
  if (!parsed) {
    notFound();
  }

  const { slugs } = parsed;

  // Fetch all agents
  const agentResults = await Promise.all(slugs.map((s) => getAgentBySlug(s)));

  // If any agent doesn't exist, show 404
  if (agentResults.some((a) => !a)) {
    notFound();
  }

  const agents = agentResults as AiAgentData[];
  const isThreeWay = agents.length === 3;

  // For two-agent comparisons, keep existing variables for backwards-compat with components
  const agent1 = agents[0];
  const agent2 = agents[1];

  // Determine overall winner based on rating (for 2-agent comparisons)
  const overallWinner =
    agent1.overallRating > agent2.overallRating
      ? "agent1"
      : agent1.overallRating < agent2.overallRating
      ? "agent2"
      : "tie";

  // For 3-agent: find the best agent by overall rating
  const bestAgent = agents.reduce((best, agent) =>
    agent.overallRating > best.overallRating ? agent : best
  );
  const topRating = Math.max(...agents.map((a) => a.overallRating));
  const isTie = agents.filter((a) => a.overallRating === topRating).length > 1;

  const namesJoined = agents.map((a) => a.name).join(" vs ");
  const comparisonFaqs = buildComparisonFaqs(agents);

  return (
    <>
      <ComparisonSchema agents={agents} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Compare AI Agents", href: "/compare" },
              {
                name: namesJoined,
                href: `/compare/${comparison}`,
              },
            ]}
          />
        </div>

        {/* Hero Section */}
        {isThreeWay ? (
          <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-6">
                  <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                    AI Agent Comparison 2026
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
                  {namesJoined}
                </h1>
                <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Comprehensive three-way comparison of features, pricing, performance, and capabilities to help you choose the best AI agent.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {agents.map((agent) => {
                    const isWinner = !isTie && agent.overallRating === topRating;
                    return (
                      <div
                        key={agent.id}
                        className={`bg-card border-2 rounded-xl p-6 ${
                          isWinner ? "border-green-500" : "border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-bold mb-1">{agent.name}</h2>
                            <span className="text-sm text-muted-foreground">
                              Rating: {agent.overallRating}/5
                            </span>
                          </div>
                          {isWinner && (
                            <Badge className="bg-green-500 text-white flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Best Price:</span>
                            <span className="font-semibold">${agent.annualPrice}/mo</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ease of Use:</span>
                            <span className="font-semibold">{agent.easeOfUse}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Performance:</span>
                            <span className="font-semibold">{agent.performance}/5</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">
                    {isTie
                      ? "Multiple platforms tie for the top spot. Your choice depends on your specific needs."
                      : <>Based on our comprehensive testing, <span className="font-semibold text-foreground">{bestAgent.name}</span> comes out ahead overall.</>}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <ComparisonHero agent1={agent1} agent2={agent2} overallWinner={overallWinner} />
        )}

        {/* Detailed Comparison Table */}
        {isThreeWay ? (
          <ThreeWayComparisonTable agents={agents} />
        ) : (
          <ComparisonTable agent1={agent1} agent2={agent2} />
        )}

        {/* Pros and Cons Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pros and Cons
            </h2>

            <div className={`grid gap-8 max-w-6xl mx-auto ${isThreeWay ? "md:grid-cols-3" : "md:grid-cols-2 max-w-5xl"}`}>
              {agents.map((agent) => (
                <div key={agent.id} className="bg-card border rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-6">{agent.name}</h3>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold text-lg">Pros</h4>
                    </div>
                    <ul className="space-y-2">
                      {agent.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <X className="h-5 w-5 text-red-400" />
                      <h4 className="font-semibold text-lg">Cons</h4>
                    </div>
                    <ul className="space-y-2">
                      {agent.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Final Verdict
              </h2>

              <div className="bg-card border rounded-xl p-8 mb-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {isThreeWay ? (
                    <>
                      {isTie ? (
                        <p>
                          All three platforms — <strong>{agents.map((a) => a.name).join(", ")}</strong> — are tied with similar overall ratings. Your choice should depend on your specific workflow and budget.
                        </p>
                      ) : (
                        <p>
                          <strong>{bestAgent.name}</strong> comes out ahead in this three-way comparison with a higher overall rating of {bestAgent.overallRating}/5. {bestAgent.shortDescription}
                        </p>
                      )}
                      {agents.map((agent) => (
                        <div key={agent.id}>
                          <h3 className="text-xl font-bold mt-6 mb-3">
                            Choose {agent.name} if:
                          </h3>
                          <ul className="space-y-2">
                            {agent.overallRating === topRating && (
                              <li>You want the highest-rated option ({agent.overallRating}/5 rating)</li>
                            )}
                            {agent.annualPrice === Math.min(...agents.map((a) => a.annualPrice)) && (
                              <li>You are looking for the best value (${agent.annualPrice}/mo)</li>
                            )}
                            {agent.performance === Math.max(...agents.map((a) => a.performance)) && (
                              <li>You prioritize top performance ({agent.performance}/5)</li>
                            )}
                            {agent.easeOfUse === Math.max(...agents.map((a) => a.easeOfUse)) && (
                              <li>You want the easiest setup and use ({agent.easeOfUse}/5)</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {overallWinner === "agent1" && (
                        <p>
                          <strong>{agent1.name}</strong> comes out ahead in this
                          comparison with a higher overall rating of{" "}
                          {agent1.overallRating}/5 compared to {agent2.name}&apos;s{" "}
                          {agent2.overallRating}/5. {agent1.shortDescription}
                        </p>
                      )}
                      {overallWinner === "agent2" && (
                        <p>
                          <strong>{agent2.name}</strong> comes out ahead in this
                          comparison with a higher overall rating of{" "}
                          {agent2.overallRating}/5 compared to {agent1.name}&apos;s{" "}
                          {agent1.overallRating}/5. {agent2.shortDescription}
                        </p>
                      )}
                      {overallWinner === "tie" && (
                        <p>
                          Both <strong>{agent1.name}</strong> and{" "}
                          <strong>{agent2.name}</strong> are excellent platforms with
                          identical overall ratings of {agent1.overallRating}/5. Your
                          choice should depend on your specific needs and
                          priorities.
                        </p>
                      )}

                      <h3 className="text-xl font-bold mt-6 mb-3">
                        Choose {agent1.name} if:
                      </h3>
                      <ul className="space-y-2">
                        {agent1.performance > agent2.performance && (
                          <li>You prioritize better performance ({agent1.performance}/5)</li>
                        )}
                        {agent1.easeOfUse > agent2.easeOfUse && (
                          <li>
                            You want easier setup and use ({agent1.easeOfUse}/5)
                          </li>
                        )}
                        {agent1.overallRating > agent2.overallRating && (
                          <li>
                            You want the higher-rated option ({agent1.overallRating}/5 rating)
                          </li>
                        )}
                        {agent1.annualPrice < agent2.annualPrice && (
                          <li>
                            You&apos;re looking for better value ($
                            {agent1.annualPrice}/mo)
                          </li>
                        )}
                      </ul>

                      <h3 className="text-xl font-bold mt-6 mb-3">
                        Choose {agent2.name} if:
                      </h3>
                      <ul className="space-y-2">
                        {agent2.performance > agent1.performance && (
                          <li>You prioritize better performance ({agent2.performance}/5)</li>
                        )}
                        {agent2.easeOfUse > agent1.easeOfUse && (
                          <li>
                            You want easier setup and use ({agent2.easeOfUse}/5)
                          </li>
                        )}
                        {agent2.overallRating > agent1.overallRating && (
                          <li>
                            You want the higher-rated option ({agent2.overallRating}/5 rating)
                          </li>
                        )}
                        {agent2.annualPrice < agent1.annualPrice && (
                          <li>
                            You&apos;re looking for better value ($
                            {agent2.annualPrice}/mo)
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`grid gap-4 ${isThreeWay ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-card border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-xl">{agent.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">
                            {agent.overallRating}/5 Rating
                          </Badge>
                          <Badge variant="outline">
                            ${agent.annualPrice}/mo
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <AffiliateButton
                        agentId={agent.id}
                        agentName={agent.name}
                        affiliateUrl={agent.affiliateUrl}
                        className="w-full"
                      >
                        Get {agent.name}
                      </AffiliateButton>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={`/reviews/${agent.slug}`}>Read Full Review</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={comparisonFaqs}
                title={`${namesJoined} FAQ`}
              />
            </div>
          </div>
        </section>

        {/* Related Comparisons CTA */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Compare More AI Agents</h2>
              <p className="text-muted-foreground">
                Not sure yet? Check out our full AI agent comparison tool or read
                detailed reviews of each service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/compare">View All Comparisons</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/reviews">See Best AI Agents 2026</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
