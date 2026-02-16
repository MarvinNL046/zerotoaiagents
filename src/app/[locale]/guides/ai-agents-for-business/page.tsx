import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { routing } from "@/i18n/routing";
import {
  Building,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  DollarSign,
  ArrowRight,
  Clock,
  BookOpen,
  BarChart,
  ShoppingCart,
  Headphones,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/ai-agents-for-business`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/ai-agents-for-business` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/ai-agents-for-business`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "AI Agents for Business: Use Cases & ROI Guide 2026 - ZeroToAIAgents",
    description:
      "Discover how businesses use AI agents to automate operations, reduce costs, and scale efficiently. Real use cases, ROI calculations, and implementation strategies.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "AI Agents for Business: Use Cases & ROI Guide 2026",
      description: "How businesses use AI agents to automate operations and scale efficiently.",
      type: "article",
    },
  };
}

export default async function AiAgentsForBusinessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/ai-agents-for-business` : `${baseUrl}/${locale}/guides/ai-agents-for-business`;

  return (
    <>
      <ArticleJsonLd
        title="AI Agents for Business: Use Cases & ROI Guide 2026"
        description="How businesses use AI agents to automate operations and scale efficiently."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "AI Agents for Business", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "AI Agents for Business", href: "/guides/ai-agents-for-business" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Business Guide</Badge>
                <Badge variant="outline">8 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI Agents for Business: Use Cases & ROI
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Learn how businesses across industries leverage AI agents to automate operations, reduce costs, and unlock new growth opportunities.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated Feb 16, 2026
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Business Focus
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-12">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Building className="h-6 w-6 text-primary" />
                  Why Businesses Need AI Agents
                </h2>
                <p className="text-muted-foreground mb-4">
                  Traditional automation handles predictable, rule-based tasks. AI agents go further—they understand context, make decisions, and adapt to new situations. This enables businesses to automate complex workflows that previously required human judgment.
                </p>
                <p className="text-muted-foreground mb-4">
                  Companies deploying AI agents report 40-70% reduction in operational costs for automated tasks, 24/7 availability without overtime costs, and the ability to scale operations without proportional headcount increases.
                </p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Top Business Use Cases
                </h2>
                <div className="grid gap-4">
                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Customer Support Automation</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          AI agents handle 60-80% of support tickets automatically, answer FAQs, troubleshoot issues, and escalate complex cases to human agents with full context.
                        </p>
                        <p className="text-xs text-muted-foreground font-semibold">ROI: 50-70% cost reduction, 90% faster response times</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Sales & Lead Qualification</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Agents engage with inbound leads 24/7, qualify prospects, answer product questions, schedule demos, and update CRM records automatically.
                        </p>
                        <p className="text-xs text-muted-foreground font-semibold">ROI: 3x faster lead response, 25-40% increase in qualified meetings</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">E-commerce Personalization</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Product recommendations, order tracking, return processing, and upsell opportunities—all handled conversationally without human intervention.
                        </p>
                        <p className="text-xs text-muted-foreground font-semibold">ROI: 15-30% increase in average order value, 40% reduction in cart abandonment</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <BarChart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Data Analysis & Reporting</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Agents query databases, generate reports, visualize trends, and alert teams to anomalies—turning data into actionable insights automatically.
                        </p>
                        <p className="text-xs text-muted-foreground font-semibold">ROI: 80% faster reporting, insights available 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Internal Operations</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          IT helpdesk, HR onboarding, expense approvals, meeting scheduling, and document management—streamline internal workflows company-wide.
                        </p>
                        <p className="text-xs text-muted-foreground font-semibold">ROI: 30-50% reduction in administrative time per employee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                  Calculating ROI
                </h2>
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-bold mb-3">Simple ROI Formula</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">1. Calculate Current Costs</p>
                      <p className="text-muted-foreground">Average hourly wage × hours spent on task × number of employees × 12 months</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">2. Estimate Automation Rate</p>
                      <p className="text-muted-foreground">What percentage of the task can be automated? (Conservative: 50-60%)</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">3. Subtract Platform Costs</p>
                      <p className="text-muted-foreground">Annual subscription + implementation + maintenance costs</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="font-bold">Example: Customer Support</p>
                      <p className="text-muted-foreground">$25/hr × 2000 hrs × 5 agents × 12 months = $3M/year</p>
                      <p className="text-muted-foreground">60% automation = $1.8M savings</p>
                      <p className="text-muted-foreground">Platform cost: $50K/year</p>
                      <p className="text-green-600 font-semibold mt-1">Net ROI: $1.75M (3,500% return)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Implementation Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <div className="font-bold text-green-600">1.</div>
                    <div>
                      <p className="font-medium">Start with a High-Impact Pilot</p>
                      <p className="text-sm text-muted-foreground">Choose one use case with clear metrics, quick wins, and manageable scope.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <div className="font-bold text-green-600">2.</div>
                    <div>
                      <p className="font-medium">Measure Everything</p>
                      <p className="text-sm text-muted-foreground">Track task completion rate, accuracy, customer satisfaction, and cost savings from day one.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <div className="font-bold text-green-600">3.</div>
                    <div>
                      <p className="font-medium">Keep Humans in the Loop</p>
                      <p className="text-sm text-muted-foreground">Use agents to augment teams, not replace them. Human oversight ensures quality and trust.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <div className="font-bold text-green-600">4.</div>
                    <div>
                      <p className="font-medium">Scale Gradually</p>
                      <p className="text-sm text-muted-foreground">After proving value, expand to additional use cases and departments systematically.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Find the Right AI Agent for Your Business</h2>
              <p className="text-muted-foreground">
                Compare platforms tailored to your industry and use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/compare">
                    Compare Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/best/best-ai-agent">View Top Picks</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={[
                  {
                    question: "What size business benefits most from AI agents?",
                    answer: "AI agents scale to any size. Small businesses benefit from automating customer support with limited staff. Mid-size companies use agents for sales, operations, and data analysis. Enterprises deploy multi-agent systems across departments. The key is matching use case to platform capabilities."
                  },
                  {
                    question: "How long until we see ROI from AI agents?",
                    answer: "Most businesses see positive ROI within 3-6 months. Simple use cases (FAQs, appointment scheduling) can show returns in weeks. Complex implementations (multi-department workflows) may take 6-12 months. Start with quick wins to fund larger initiatives."
                  },
                  {
                    question: "Will AI agents eliminate jobs in my company?",
                    answer: "AI agents typically augment rather than replace employees. Teams shift from repetitive tasks to higher-value work like complex problem-solving, relationship building, and strategy. Some companies redeploy staff to growth initiatives rather than replacing them."
                  },
                  {
                    question: "What industries benefit most from AI agents?",
                    answer: "E-commerce, SaaS, financial services, healthcare, real estate, and professional services see strong results. Any industry with repetitive customer interactions, data analysis needs, or administrative workflows can benefit significantly from AI agents."
                  }
                ]}
              />
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <RelatedPages
                title="Related Guides"
                pages={[
                  { title: "Choosing an AI Agent", description: "Selection criteria for businesses", href: "/guides/choosing-ai-agent", icon: "shield" },
                  { title: "AI Agent Pricing", description: "Cost models and budgeting", href: "/guides/ai-agent-pricing", icon: "zap" },
                  { title: "AI Agent Integrations", description: "Connect to business systems", href: "/guides/ai-agent-integrations", icon: "lock" },
                  { title: "Best AI Agents 2026", description: "Top business platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
