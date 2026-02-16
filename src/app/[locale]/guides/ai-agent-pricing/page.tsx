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
  DollarSign,
  TrendingUp,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Calculator,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/guides/ai-agent-pricing`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/guides/ai-agent-pricing` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/guides/ai-agent-pricing`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "AI Agent Pricing Guide 2026: Models, Costs & Budgeting - ZeroToAIAgents",
    description:
      "Understand AI agent pricing models: per-conversation, per-user, consumption-based, and enterprise. Learn how to budget and avoid hidden costs.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "AI Agent Pricing Guide 2026: Models, Costs & Budgeting",
      description: "Complete guide to AI agent pricing models and cost structures.",
      type: "article",
    },
  };
}

export default async function AiAgentPricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageUrl = locale === "en" ? `${baseUrl}/guides/ai-agent-pricing` : `${baseUrl}/${locale}/guides/ai-agent-pricing`;

  return (
    <>
      <ArticleJsonLd
        title="AI Agent Pricing Guide 2026: Models, Costs & Budgeting"
        description="Complete guide to AI agent pricing models and cost structures."
        url={pageUrl}
        datePublished="2026-02-01"
        dateModified="2026-02-16"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "AI Agent Pricing", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "AI Agent Pricing", href: "/guides/ai-agent-pricing" }]} className="mb-6" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Pricing Guide</Badge>
                <Badge variant="outline">6 min read</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Understanding AI Agent Pricing Models
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Navigate the complex world of AI agent pricing with our comprehensive guide to cost models, hidden fees, and budgeting strategies.
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
                  <DollarSign className="h-6 w-6 text-primary" />
                  Common Pricing Models
                </h2>
                <div className="grid gap-4">
                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Per-Conversation Pricing
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Charge per interaction or conversation thread. Typically $0.05-$2.00 per conversation depending on complexity.
                    </p>
                    <p className="text-xs font-semibold text-green-600">Best for: Businesses with predictable conversation volumes</p>
                    <p className="text-xs text-muted-foreground mt-1">Watch for: How "conversation" is defined—one message or entire thread?</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Per-User/Seat Pricing
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Fixed monthly fee per team member using the platform. Ranges from $20-$200/user/month.
                    </p>
                    <p className="text-xs font-semibold text-green-600">Best for: Internal tools and team collaboration</p>
                    <p className="text-xs text-muted-foreground mt-1">Watch for: Whether end-users (customers) count as seats</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Consumption-Based (API Calls)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Pay per API request, token usage, or compute time. Varies widely: $0.001-$0.10 per request.
                    </p>
                    <p className="text-xs font-semibold text-green-600">Best for: Developers and variable usage patterns</p>
                    <p className="text-xs text-muted-foreground mt-1">Watch for: Costs can spike unexpectedly with high traffic</p>
                  </div>

                  <div className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-orange-600" />
                      Tiered/Fixed Monthly Plans
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Flat fee with usage limits (e.g., 1000 conversations/month). Plans range from $50-$5,000+/month.
                    </p>
                    <p className="text-xs font-semibold text-green-600">Best for: Predictable budgeting and startups</p>
                    <p className="text-xs text-muted-foreground mt-1">Watch for: Overage charges when you exceed limits</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  Hidden Costs to Watch For
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Integration & Setup Fees</p>
                    <p className="text-sm text-muted-foreground">Some platforms charge $500-$5,000+ for professional services, custom integrations, or onboarding.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Training Data Charges</p>
                    <p className="text-sm text-muted-foreground">Uploading large knowledge bases, documents, or fine-tuning models may incur additional costs.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Premium Support Costs</p>
                    <p className="text-sm text-muted-foreground">24/7 support, dedicated account managers, and SLAs often require premium tiers (+$500-$2,000/month).</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="font-semibold mb-1">Enterprise Features</p>
                    <p className="text-sm text-muted-foreground">SSO, advanced analytics, white-labeling, and custom SLAs may only be available on "contact sales" enterprise plans.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                  How to Budget for AI Agents
                </h2>
                <div className="bg-card border rounded-xl p-6">
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Step 1: Estimate Monthly Volume</p>
                      <p className="text-muted-foreground">How many conversations, API calls, or users will you have? Be conservative but realistic.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Step 2: Add 30% Buffer</p>
                      <p className="text-muted-foreground">Usage often exceeds initial estimates. Build in room for growth and unexpected spikes.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Step 3: Factor in One-Time Costs</p>
                      <p className="text-muted-foreground">Setup, training, integration development, and initial testing typically cost 2-3x the first month's subscription.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Step 4: Consider Total Cost of Ownership</p>
                      <p className="text-muted-foreground">Include platform fees, LLM API costs (if separate), maintenance, and team time for monitoring and optimization.</p>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="font-bold mb-2">Example Budget: Customer Support Agent</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p>• Platform: $500/month (5,000 conversations included)</p>
                        <p>• Overages: ~$100/month (1,000 extra conversations @ $0.10)</p>
                        <p>• LLM API costs: $200/month (GPT-4 usage)</p>
                        <p>• Integrations: $1,500 one-time (Zendesk, Slack)</p>
                        <p className="font-semibold text-foreground pt-2">Total Year 1: ~$11,100 ($1,500 setup + $9,600 ongoing)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Pricing Negotiation Tips
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Start with Annual Contracts</p>
                      <p className="text-sm text-muted-foreground">Most vendors offer 10-20% discounts for annual pre-payment vs. monthly billing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Ask About Startup Programs</p>
                      <p className="text-sm text-muted-foreground">Many platforms offer 50-90% discounts for early-stage companies under $1M revenue.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Bundle Services</p>
                      <p className="text-sm text-muted-foreground">Negotiating setup, training, and premium support together can yield better rates than buying separately.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Request Pilot Programs</p>
                      <p className="text-sm text-muted-foreground">Many vendors provide free or discounted proof-of-concept periods to prove value before commitment.</p>
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
              <h2 className="text-2xl font-bold">Compare AI Agent Pricing</h2>
              <p className="text-muted-foreground">
                See transparent pricing from top platforms side-by-side.
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
                    question: "What's the average cost of an AI agent?",
                    answer: "Small businesses typically spend $50-$500/month on basic AI agents. Mid-size companies spend $500-$5,000/month. Enterprise deployments with custom integrations and high volume can cost $10,000-$100,000+/month. Costs vary widely based on features, volume, and vendor."
                  },
                  {
                    question: "Are free AI agent platforms worth it?",
                    answer: "Free tiers are excellent for testing and small-scale use (e.g., 100-500 conversations/month). However, they often lack critical features like integrations, analytics, custom branding, and SLAs. Most businesses outgrow free tiers within 3-6 months."
                  },
                  {
                    question: "Should I pay per conversation or flat monthly fee?",
                    answer: "Per-conversation works well for unpredictable volumes and seasonal businesses. Flat monthly fees are better for consistent usage and easier budgeting. If you can estimate monthly conversations within 20%, go flat fee for savings."
                  },
                  {
                    question: "What pricing model offers the best value?",
                    answer: "Annual contracts with tiered monthly plans typically offer the best value—you get volume discounts plus predictable costs. Avoid pure consumption-based pricing unless you have very sophisticated usage monitoring to prevent surprise bills."
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
                  { title: "Choosing an AI Agent", description: "Selection criteria beyond price", href: "/guides/choosing-ai-agent", icon: "shield" },
                  { title: "AI Agents for Business", description: "ROI and use cases", href: "/guides/ai-agents-for-business", icon: "zap" },
                  { title: "What is an AI Agent?", description: "Beginner's guide", href: "/guides/what-is-ai-agent", icon: "lock" },
                  { title: "Best AI Agents 2026", description: "Top value platforms", href: "/best/best-ai-agent", icon: "trophy" }
                ]}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
