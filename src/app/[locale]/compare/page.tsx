import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getAllAgents } from "@/lib/agent-data-layer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/agents/rating-stars";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { AgentComparisonTool } from "@/components/conversion/agent-comparison-tool";
import { PopularComparisons } from "@/components/compare/popular-comparisons";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import type { AiAgentData } from "@/lib/db/agent-service";
import {
  Check,
  X,
  Shield,
  Zap,
  Globe,
  Server,
  Monitor,
  DollarSign,
  Clock,
  Lock,
  Tv,
  Download,
  Scale,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/compare`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/compare` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/compare`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "Compare AI Agents Side by Side - ZeroToAIAgents",
    description:
      "Compare the best AI agent platforms side by side. See detailed comparisons of features, pricing, models, integrations, and more to find the perfect AI agent for your needs.",
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
// Structured Data for AI Agent Comparison List
function ItemListSchema({ vpns }: { vpns: AiAgentData[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Agent Comparison List",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((vpn, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vpn.name,
      url: `https://zerotoaiagents.com/reviews/${vpn.slug}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("comparePage");
  const vpns = await getAllAgents();

  return (
    <>
      <ItemListSchema vpns={vpns} />

      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <BreadcrumbSchema items={[{ name: t("breadcrumb"), href: "/compare" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="px-4 py-1">
              {t("badge")}
            </Badge>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Tool */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <AgentComparisonTool agents={vpns} maxCompare={4} />
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("fullComparisonTable")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 bg-muted/50 font-semibold sticky left-0 min-w-[200px]">
                    {t("vpnProvider")}
                  </th>
                  {vpns.map((vpn) => (
                    <th
                      key={vpn.id}
                      className="p-4 bg-muted/50 text-center min-w-[180px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-lg">{vpn.name}</span>
                        <RatingStars rating={vpn.overallRating} size="sm" />
                        {vpn.editorChoice && (
                          <Badge className="bg-yellow-500 text-yellow-950 text-xs">
                            {t("editorsChoice")}
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Overall Rating */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("overallRating")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-primary">
                        {vpn.overallRating}
                      </span>
                      <span className="text-muted-foreground">/5</span>
                    </td>
                  ))}
                </tr>

                {/* Monthly Price */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {t("monthlyPrice")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="font-semibold">${vpn.monthlyPrice}</span>
                      <span className="text-muted-foreground">{t("perMonth")}</span>
                    </td>
                  ))}
                </tr>

                {/* Best Price */}
                <tr className="border-b hover:bg-muted/30 bg-green-50/50 dark:bg-green-900/10">
                  <td className="p-4 font-medium sticky left-0 bg-green-50/50 dark:bg-green-900/10">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      {t("bestPrice")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <span className="text-xl font-bold text-green-600">
                        ${vpn.annualPrice}
                      </span>
                      <span className="text-muted-foreground">{t("perMonth")}</span>
                    </td>
                  ))}
                </tr>

                {/* Free Tier */}
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-background">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {t("freeTier")}
                    </div>
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      {vpn.hasFreeTier ? (
                        <Check className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* TODO: Add AI agent-specific comparison rows */}
                {/* Additional AI agent-specific comparison rows can be added here */}

                {/* CTA Row */}
                <tr className="bg-muted/30">
                  <td className="p-4 font-medium sticky left-0 bg-muted/30">
                    {t("getStarted")}
                  </td>
                  {vpns.map((vpn) => (
                    <td key={vpn.id} className="p-4 text-center">
                      <div className="flex flex-col gap-2">
                        <AffiliateButton
                          agentId={vpn.id}
                          agentName={vpn.name}
                          affiliateUrl={vpn.affiliateUrl}
                          className="w-full"
                        >
                          {t("visit")} {vpn.name}
                        </AffiliateButton>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reviews/${vpn.slug}`}>{t("readReview")}</Link>
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

      {/* Quick Comparison Cards */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">{t("quickComparison")}</h2>
            <p className="text-muted-foreground">
              {t("quickComparisonSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Best Overall - Claude Code */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold">{t("quickCards.bestOverall")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">Claude Code</span>
                <Badge className="bg-yellow-500 text-yellow-950">{t("editorsChoice")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.claudeCodeDesc")}
              </p>
              <AffiliateButton
                agentId="claude-code"
                agentName="Claude Code"
                affiliateUrl="https://go.zerotoaiagents.com/claude-code"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "Claude Code" })}
              </AffiliateButton>
            </div>

            {/* Best Value - GitHub Copilot */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-bold">{t("quickCards.bestValue")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">GitHub Copilot</span>
                <Badge variant="secondary">$10{t("perMonth")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.copilotDesc")}
              </p>
              <AffiliateButton
                agentId="github-copilot"
                agentName="GitHub Copilot"
                affiliateUrl="https://go.zerotoaiagents.com/github-copilot"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "GitHub Copilot" })}
              </AffiliateButton>
            </div>

            {/* Best Performance - ChatGPT */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold">{t("quickCards.bestPerformance")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">ChatGPT</span>
                <Badge variant="secondary">4.8/5</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.chatgptDesc")}
              </p>
              <AffiliateButton
                agentId="chatgpt"
                agentName="ChatGPT"
                affiliateUrl="https://go.zerotoaiagents.com/chatgpt"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "ChatGPT" })}
              </AffiliateButton>
            </div>

            {/* Best for Enterprise - Microsoft Copilot Studio */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold">{t("quickCards.bestEnterprise")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">Copilot Studio</span>
                <Badge variant="secondary">{t("quickCards.enterpriseBadge")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.copilotStudioDesc")}
              </p>
              <AffiliateButton
                agentId="microsoft-copilot-studio"
                agentName="Microsoft Copilot Studio"
                affiliateUrl="https://go.zerotoaiagents.com/microsoft-copilot-studio"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "Copilot Studio" })}
              </AffiliateButton>
            </div>

            {/* Best Free - Flowise */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-purple-500" />
                <h3 className="font-bold">{t("quickCards.bestFree")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">Flowise</span>
                <Badge className="bg-green-500 text-white">{t("quickCards.openSource")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.flowiseDesc")}
              </p>
              <AffiliateButton
                agentId="flowise"
                agentName="Flowise"
                affiliateUrl="https://go.zerotoaiagents.com/flowise"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "Flowise" })}
              </AffiliateButton>
            </div>

            {/* Best No-Code - n8n AI */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-bold">{t("quickCards.bestNoCode")}</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">n8n AI</span>
                <Badge variant="secondary">{t("quickCards.integrationsCount")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("quickCards.n8nDesc")}
              </p>
              <AffiliateButton
                agentId="n8n-ai"
                agentName="n8n AI"
                affiliateUrl="https://go.zerotoaiagents.com/n8n-ai"
                className="w-full"
              >
                {t("quickCards.getCta", { name: "n8n AI" })}
              </AffiliateButton>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <PopularComparisons
        translations={{
          badge: t("popularComparisons.badge"),
          title: t("popularComparisons.title"),
          subtitle: t("popularComparisons.subtitle"),
        }}
      />

      {/* How We Compare */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("howWeCompare")}
            </h2>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {t("methodology.performance")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("methodology.performanceDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("methodology.privacy")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("methodology.privacyDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" />
                  {t("methodology.integration")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("methodology.integrationDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  {t("methodology.value")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("methodology.valueDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema
              faqs={(t.raw("faq.items") as Array<{ question: string; answer: string }>)}
              title={t("faq.title")}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("needHelpDeciding")}</h2>
            <p className="text-muted-foreground">
              {t("needHelpDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/best/coding-agents">{t("ctaButtonPrimary")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guides/what-is-ai-agent">{t("ctaButtonSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
