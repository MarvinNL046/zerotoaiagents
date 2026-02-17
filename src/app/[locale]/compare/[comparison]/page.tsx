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
import { Check, X } from "lucide-react";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import type { AiAgentData } from "@/lib/db/agent-service";

type Props = {
  params: Promise<{ locale: string; comparison: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
export const revalidate = 86400;

// Parse comparison slug (e.g., "cursor-vs-windsurf") into two agent slugs
function parseComparisonSlug(comparison: string): { slug1: string; slug2: string } | null {
  const parts = comparison.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }
  return { slug1: parts[0], slug2: parts[1] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, comparison } = await params;

  const slugs = parseComparisonSlug(comparison);
  if (!slugs) {
    return { title: "Comparison Not Found" };
  }

  const { slug1, slug2 } = slugs;
  const agent1 = await getAgentBySlug(slug1);
  const agent2 = await getAgentBySlug(slug2);

  if (!agent1 || !agent2) {
    return {
      title: "Comparison Not Found",
    };
  }

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
    title: `${agent1.name} vs ${agent2.name}: Which is Better in 2026? - ZeroToAIAgents`,
    description: `Compare ${agent1.name} and ${agent2.name} side by side. See the differences in speed, security, pricing, features, and more to choose the best AI agent for your needs.`,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${agent1.name} vs ${agent2.name}: AI Agent Comparison 2026`,
      description: `Detailed comparison of ${agent1.name} and ${agent2.name}. Find out which AI agent performs better, offers more features, and offers better value.`,
      url: canonicalUrl,
      type: "article",
    },
  };
}

// Comparison Schema for SEO
function ComparisonSchema({ agent1, agent2 }: { agent1: AiAgentData; agent2: AiAgentData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    name: `${agent1.name} vs ${agent2.name} Comparison`,
    description: `Detailed comparison of ${agent1.name} and ${agent2.name} AI agent platforms`,
    itemReviewed: [
      {
        "@type": "SoftwareApplication",
        name: agent1.name,
        applicationCategory: "SecurityApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: agent1.overallRating,
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          price: agent1.monthlyPrice,
          priceCurrency: "USD",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: agent2.name,
        applicationCategory: "SecurityApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: agent2.overallRating,
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          price: agent2.monthlyPrice,
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, comparison } = await params;
  setRequestLocale(locale);

  // Parse the comparison slug
  const slugs = parseComparisonSlug(comparison);
  if (!slugs) {
    notFound();
  }

  const { slug1, slug2 } = slugs;

  // Fetch both agents
  const agent1 = await getAgentBySlug(slug1);
  const agent2 = await getAgentBySlug(slug2);

  // If either agent doesn't exist, show 404
  if (!agent1 || !agent2) {
    notFound();
  }

  // Determine overall winner based on rating
  const overallWinner =
    agent1.overallRating > agent2.overallRating
      ? "agent1"
      : agent1.overallRating < agent2.overallRating
      ? "agent2"
      : "tie";

  return (
    <>
      <ComparisonSchema agent1={agent1} agent2={agent2} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Compare AI Agents", href: "/compare" },
              {
                name: `${agent1.name} vs ${agent2.name}`,
                href: `/compare/${comparison}`,
              },
            ]}
          />
        </div>

        {/* Hero Section */}
        <ComparisonHero agent1={agent1} agent2={agent2} overallWinner={overallWinner} />

        {/* Detailed Comparison Table */}
        <ComparisonTable agent1={agent1} agent2={agent2} />

        {/* Pros and Cons Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pros and Cons
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Agent 1 Pros/Cons */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">{agent1.name}</h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-lg">Pros</h4>
                  </div>
                  <ul className="space-y-2">
                    {agent1.pros.map((pro, index) => (
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
                    {agent1.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Agent 2 Pros/Cons */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">{agent2.name}</h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-lg">Pros</h4>
                  </div>
                  <ul className="space-y-2">
                    {agent2.pros.map((pro, index) => (
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
                    {agent2.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-xl">{agent1.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {agent1.overallRating}/5 Rating
                        </Badge>
                        <Badge variant="outline">
                          ${agent1.annualPrice || agent1.annualPrice}/mo
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <AffiliateButton
                      agentId={agent1.id}
                      agentName={agent1.name}
                      affiliateUrl={agent1.affiliateUrl}
                      className="w-full"
                    >
                      Get {agent1.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/reviews/${agent1.slug}`}>Read Full Review</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-xl">{agent2.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {agent2.overallRating}/5 Rating
                        </Badge>
                        <Badge variant="outline">
                          ${agent2.annualPrice || agent2.annualPrice}/mo
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <AffiliateButton
                      agentId={agent2.id}
                      agentName={agent2.name}
                      affiliateUrl={agent2.affiliateUrl}
                      className="w-full"
                    >
                      Get {agent2.name}
                    </AffiliateButton>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/reviews/${agent2.slug}`}>Read Full Review</Link>
                    </Button>
                  </div>
                </div>
              </div>
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
                  <Link href="/best/coding-agents">See Best AI Agents 2026</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
