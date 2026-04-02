import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ComparisonTable } from "@/components/agents/comparison-table";
import { AgentCard } from "@/components/agents/agent-card";
import {
  getFeaturedAgents,
  aiAgentProviders,
} from "@/lib/ai-agent-data";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Search,
  MousePointerClick,
  BarChart
} from "lucide-react";
import {
  OrganizationSchema,
  WebsiteSchema,
  ComparisonTableSchema,
  FaqSchema,
} from "@/components/structured-data";
import { FAQSchema } from "@/components/seo/faq-schema";
import { routing } from "@/i18n/routing";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { HeroIllustration } from "@/components/hero-illustration";
import { MetricBadge } from "@/components/ui/metric-badge";
import { PulseIndicator } from "@/components/ui/pulse-indicator";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": baseUrl };
  routing.locales.forEach((l) => {
    languages[l] = l === "en" ? baseUrl : `${baseUrl}/${l}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("hero");
  const tComparison = await getTranslations("comparison");
  const tHome = await getTranslations("home");

  const featuredAgents = await getFeaturedAgents();
  const top10Agents = aiAgentProviders.slice(0, 10);

  // Get FAQ data from translations
  const faqData = tHome.raw("faq") as Array<{ question: string; answer: string }>;


  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <ComparisonTableSchema agents={featuredAgents} />
      <FaqSchema faqs={faqData} />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background dark:from-primary/5" />
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/8 dark:bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 dark:bg-primary/2 rounded-full blur-3xl" />
          </div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <PulseIndicator variant="success" label={tHero("badge")} size="sm" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up">
                {tHero("title")}{" "}
                <HighlightedText variant="primary">
                  {tHero("titleHighlight")}
                </HighlightedText>{" "}
                <HighlightedText variant="cursive" className="text-3xl md:text-4xl lg:text-5xl">
                  {tHero("titleAccent")}
                </HighlightedText>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
                {tHero("subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
                <Button size="lg" asChild className="group">
                  <a href="#comparison">
                    {tHero("primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides/what-is-ai-agent">{tHero("secondaryCta")}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground animate-fade-in-up stagger-3">
                {tHero("trusted")}
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="mt-16 lg:mt-24">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Featured AI Agents */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tHome("featured.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tHome("featured.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.slice(0, 6).map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} rank={index + 1} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tComparison("title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tComparison("subtitle")}
              </p>
            </div>
            <ComparisonTable agents={top10Agents} />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tHome("howItWorks.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tHome("howItWorks.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Search, title: tHome("howItWorks.steps.browse.title"), description: tHome("howItWorks.steps.browse.description"), color: "text-blue-500 bg-blue-500/10" },
                { icon: BarChart, title: tHome("howItWorks.steps.compare.title"), description: tHome("howItWorks.steps.compare.description"), color: "text-purple-500 bg-purple-500/10" },
                { icon: MousePointerClick, title: tHome("howItWorks.steps.choose.title"), description: tHome("howItWorks.steps.choose.description"), color: "text-green-500 bg-green-500/10" },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-xl border bg-card card-hover animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mx-auto`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                faqs={faqData}
                title={tHome("faqSection.title")}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 animate-gradient" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm rounded-2xl border p-8 md:p-12 card-hover">
              <div className="inline-flex items-center gap-2 mb-2">
                <MetricBadge value="Free" label="to compare" variant="success" icon="trending-up" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {tHome("ctaSection.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {tHome("ctaSection.subtitle")}
              </p>
              <Button size="lg" asChild className="group">
                <a href="#comparison">
                  {tHome("ctaSection.button")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
