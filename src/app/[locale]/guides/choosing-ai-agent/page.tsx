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
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  DollarSign,
  Plug,
  Zap,
  Shield,
  Users,
  BarChart,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/choosing-ai-agent`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/choosing-ai-agent` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/choosing-ai-agent`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "How to Choose the Right AI Agent Platform 2026 - ZeroToAIAgents",
    description:
      "Complete guide to selecting the perfect AI agent platform for your business. Compare features, pricing, integrations, and use cases.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "How to Choose the Right AI Agent Platform 2026",
      description: "Complete guide to selecting the perfect AI agent platform for your business.",
      type: "article",
    },
  };
}

export default async function ChoosingAiAgentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/choosing-ai-agent` : `${baseUrl}/${locale}/guides/choosing-ai-agent`;

  return (
    <>
      <ArticleJsonLd
        title="How to Choose the Right AI Agent Platform 2026"
        description="Complete guide to selecting the perfect AI agent platform for your business."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "Choosing an AI Agent", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "Choosing an AI Agent", href: "/guides/choosing-ai-agent" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Selection Guide</Badge>
                <Badge variant="outline">9 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                How to Choose the Right AI Agent Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Navigate the crowded AI agent market with confidence using our comprehensive selection framework.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated Feb 16, 2026
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  All Levels
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
                  <Target className="h-6 w-6 text-primary" />
                  Define Your Use Case First
                </h2>
                <p className="text-muted-foreground mb-4">
                  Before comparing platforms, clearly define what you want your AI agent to do. Different platforms excel at different tasks.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Customer Support</p>
                      <p className="text-sm text-muted-foreground">Need multi-channel support, ticket integration, and escalation workflows? Look for specialized customer service platforms.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Sales & Lead Generation</p>
                      <p className="text-sm text-muted-foreground">Prioritize CRM integrations, lead qualification, and scheduling capabilities.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Analysis</p>
                      <p className="text-sm text-muted-foreground">Focus on platforms with strong database connectors, SQL generation, and visualization tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Workflow Automation</p>
                      <p className="text-sm text-muted-foreground">Look for extensive integration libraries and visual workflow builders.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  Key Selection Criteria
                </h2>
                <div className="grid gap-4">
                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Plug className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Integrations</h3>
                        <p className="text-sm text-muted-foreground">
                          Does it connect to your existing tools? Check for native integrations with your CRM, email, calendar, database, and other critical systems.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Pricing Model</h3>
                        <p className="text-sm text-muted-foreground">
                          Flat monthly fee, per-conversation, per-user, or consumption-based? Understand how costs scale with usage and ensure it fits your budget.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Ease of Use</h3>
                        <p className="text-sm text-muted-foreground">
                          No-code, low-code, or developer-focused? Consider your team's technical skills and how quickly you need to deploy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Security & Compliance</h3>
                        <p className="text-sm text-muted-foreground">
                          Essential for handling customer data. Verify SOC 2, GDPR compliance, encryption standards, and access controls.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <BarChart className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Analytics & Monitoring</h3>
                        <p className="text-sm text-muted-foreground">
                          Track performance, conversation quality, user satisfaction, and ROI. Look for dashboards, reports, and alert systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Evaluation Checklist
                </h2>
                <div className="bg-card border rounded-xl p-6">
                  <p className="text-sm text-muted-foreground mb-4">Use this checklist when comparing platforms:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Does it integrate with my existing tech stack?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Can I start with a free trial or proof-of-concept?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>What's the total cost at my expected usage volume?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Does it meet my industry's compliance requirements?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>How quickly can I deploy a working agent?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>What level of support and documentation is available?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Can I customize the agent's behavior and branding?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>What happens to my data if I switch providers?</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  Red Flags to Avoid
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-semibold mb-1">No Security Documentation</p>
                    <p className="text-sm text-muted-foreground">If a platform can't provide clear security and compliance information, look elsewhere.</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-semibold mb-1">Unclear Pricing</p>
                    <p className="text-sm text-muted-foreground">Hidden fees, vague "contact sales" pricing, or confusing billing models are warning signs.</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-semibold mb-1">Vendor Lock-In</p>
                    <p className="text-sm text-muted-foreground">Difficulty exporting your data, proprietary formats, or long-term contracts without escape clauses.</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-semibold mb-1">Limited Integration Options</p>
                    <p className="text-sm text-muted-foreground">If it doesn't connect to your critical systems and has no API, it won't work for your workflow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Ready to Compare AI Agent Platforms?</h2>
              <p className="text-muted-foreground">
                Use our interactive comparison tool to evaluate platforms side-by-side.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/compare">
                    Compare Platforms
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
                    question: "Should I choose a specialized or general-purpose AI agent platform?",
                    answer: "Specialized platforms (e.g., for customer support or sales) offer deeper features for specific use cases but less flexibility. General-purpose platforms are more versatile but may require more configuration. Choose based on whether you have a single clear use case (specialized) or diverse needs (general-purpose)."
                  },
                  {
                    question: "Do I need technical skills to build an AI agent?",
                    answer: "It depends on the platform. No-code platforms like Zapier Central or Ada require zero programming. Low-code platforms need basic technical understanding. Developer platforms like LangChain require Python/JavaScript knowledge. Match the platform's complexity to your team's skills."
                  },
                  {
                    question: "How long does it take to deploy an AI agent?",
                    answer: "Simple agents on no-code platforms can be deployed in hours or days. Complex multi-agent systems with custom integrations may take weeks or months. Start with a proof-of-concept to test quickly, then expand based on results."
                  },
                  {
                    question: "Can I switch AI agent platforms later?",
                    answer: "Yes, but it can be time-consuming. Ensure your platform allows data export and has well-documented APIs. Avoid platforms with proprietary formats or aggressive lock-in tactics. Test migration paths during evaluation."
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
                  { title: "What is an AI Agent?", description: "Beginner's guide to AI agents", href: "/guides/what-is-ai-agent", icon: "shield" },
                  { title: "AI Agent Pricing", description: "Understand pricing models", href: "/guides/ai-agent-pricing", icon: "zap" },
                  { title: "AI Agent Integrations", description: "Connect to your tech stack", href: "/guides/ai-agent-integrations", icon: "lock" },
                  { title: "Best AI Agents 2026", description: "Top-rated platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
