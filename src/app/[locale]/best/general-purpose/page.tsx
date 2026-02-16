import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComparisonTable } from "@/components/agents/comparison-table";
import { AgentCard } from "@/components/agents/agent-card";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { RatingStars } from "@/components/agents/rating-stars";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getAgentsByCategory } from "@/lib/ai-agent-data";
import { Link } from "@/i18n/navigation";
import { MessageSquare, Clock, ArrowRight, Crown, TrendingUp, Zap } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "generalPurpose.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${locale === "en" ? "" : `/${locale}`}/best/general-purpose`,
    },
  };
}

export default async function GeneralPurposePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "generalPurpose" });
  const agents = getAgentsByCategory("general-purpose");

  const [bestOverall, bestValue, mostPopular] = [
    agents.find((a) => a.slug === "claude"),
    agents.find((a) => a.slug === "chatgpt"),
    agents.find((a) => a.slug === "gemini"),
  ];

  return (
    <>
      <div className="flex flex-col">
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative">
            <BreadcrumbSchema
              items={[{ name: "Best General Purpose AI Assistants", href: "/best/general-purpose" }]}
              className="mb-6"
            />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 container">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </section>

        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">Quick Picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bestOverall && (
                <Card className="relative border-2 border-yellow-500/50 bg-gradient-to-b from-yellow-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-yellow-950">
                      <Crown className="h-3 w-3 mr-1" />
                      Best Overall
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestOverall.name}</h3>
                    <RatingStars rating={bestOverall.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestOverall.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestOverall.monthlyPrice}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      agentId={bestOverall.id}
                      agentName={bestOverall.name}
                      affiliateUrl={bestOverall.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestOverall.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {bestValue && (
                <Card className="relative border-2 border-green-500/50 bg-gradient-to-b from-green-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-green-950">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{bestValue.name}</h3>
                    <RatingStars rating={bestValue.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{bestValue.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${bestValue.monthlyPrice}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      agentId={bestValue.id}
                      agentName={bestValue.name}
                      affiliateUrl={bestValue.affiliateUrl}
                      className="w-full"
                    >
                      Get {bestValue.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}

              {mostPopular && (
                <Card className="relative border-2 border-blue-500/50 bg-gradient-to-b from-blue-500/5 to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-blue-950">
                      <Zap className="h-3 w-3 mr-1" />
                      Best Integration
                    </Badge>
                  </div>
                  <CardContent className="pt-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">{mostPopular.name}</h3>
                    <RatingStars rating={mostPopular.overallRating} size="md" />
                    <p className="text-sm text-muted-foreground">{mostPopular.shortDescription}</p>
                    <div className="text-3xl font-bold text-primary">
                      ${mostPopular.monthlyPrice}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <AffiliateButton
                      agentId={mostPopular.id}
                      agentName={mostPopular.name}
                      affiliateUrl={mostPopular.affiliateUrl}
                      className="w-full"
                    >
                      Get {mostPopular.name}
                    </AffiliateButton>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("comparison.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("comparison.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} rank={index + 1} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.raw("features.items").map((item: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Full Comparison</h2>
            </div>
            <ComparisonTable agents={agents} />
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FAQSchema
                title={t("faq.title")}
                faqs={t.raw("faq.questions").map((item: any) => ({
                  question: item.question,
                  answer: item.answer,
                }))}
              />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Find Your Perfect AI Assistant</h2>
              <p className="text-lg text-muted-foreground">
                Still not sure? Read our detailed reviews or compare all features.
              </p>
              <Button size="lg" asChild>
                <Link href="/reviews">
                  View All Reviews
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
