import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/agents/rating-stars";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { UserReviewsList } from "@/components/reviews/user-reviews-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { aiAgentProviders, getAgentBySlug, type AiAgentProvider, getCategoryDisplayName } from "@/lib/ai-agent-data";
import { getReviewsByVpnSlug, getAverageUserRating } from "@/lib/user-reviews";
import { Link } from "@/i18n/navigation";
import {
  Check,
  X,
  ArrowLeft,
  MessageSquare,
  Cpu,
  Zap,
  DollarSign,
  Users,
  Code,
  Sparkles,
} from "lucide-react";
import {
  BreadcrumbSchema,
} from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
export const revalidate = 86400;

export async function generateStaticParams() {
  return aiAgentProviders.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return { title: "AI Agent Not Found" };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews/${agent.slug}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/reviews/${agent.slug}` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews/${agent.slug}`;
  });

  // Generate locale-specific descriptions
  const descriptions: Record<string, string> = {
    en: `Complete ${agent.name} review 2026. ${agent.shortDescription} Rating: ${agent.overallRating}/5. From $${agent.monthlyPrice}/mo.`,
    nl: `Volledige ${agent.name} review 2026. ${agent.shortDescription} Beoordeling: ${agent.overallRating}/5. Vanaf $${agent.monthlyPrice}/maand.`,
    de: `Vollständiger ${agent.name} Test 2026. ${agent.shortDescription} Bewertung: ${agent.overallRating}/5. Ab $${agent.monthlyPrice}/Monat.`,
    es: `Reseña completa de ${agent.name} 2026. ${agent.shortDescription} Calificación: ${agent.overallRating}/5. Desde $${agent.monthlyPrice}/mes.`,
    fr: `Avis complet sur ${agent.name} 2026. ${agent.shortDescription} Note: ${agent.overallRating}/5. À partir de $${agent.monthlyPrice}/mois.`,
    zh: `${agent.name} 2026完整评测。${agent.shortDescription} 评分：${agent.overallRating}/5。每月$${agent.monthlyPrice}起。`,
    ja: `${agent.name} 2026年完全レビュー。${agent.shortDescription} 評価：${agent.overallRating}/5。月額$${agent.monthlyPrice}から。`,
    ko: `${agent.name} 2026 완전 리뷰. ${agent.shortDescription} 평가: ${agent.overallRating}/5. 월 $${agent.monthlyPrice}부터.`,
    th: `รีวิว ${agent.name} 2026 ฉบับสมบูรณ์ ${agent.shortDescription} คะแนน: ${agent.overallRating}/5 เริ่มต้น $${agent.monthlyPrice}/เดือน`,
  };

  const titles: Record<string, string> = {
    en: `${agent.name} Review 2026 - Honest Test & Rating`,
    nl: `${agent.name} Review 2026 - Eerlijke Test & Beoordeling`,
    de: `${agent.name} Test 2026 - Ehrlicher Test & Bewertung`,
    es: `${agent.name} Reseña 2026 - Prueba Honesta y Calificación`,
    fr: `${agent.name} Avis 2026 - Test Honnête et Note`,
    zh: `${agent.name} 评测 2026 - 诚实测试与评分`,
    ja: `${agent.name} レビュー 2026 - 正直なテストと評価`,
    ko: `${agent.name} 리뷰 2026 - 정직한 테스트 및 평가`,
    th: `รีวิว ${agent.name} 2026 - ทดสอบและให้คะแนนอย่างตรงไปตรงมา`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      agent.name,
      `${agent.name} review`,
      `${agent.name} test`,
      `${agent.name} 2026`,
      "AI agent review",
      "AI agent test",
      "best AI agent",
      `${agent.name} price`,
      `${agent.name} features`,
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      locale: locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { locale: _locale, slug } = await params;
  setRequestLocale(_locale);
  const t = await getTranslations("agentReview");

  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const prefix = _locale === "en" ? "" : `/${_locale}`;
  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
    { name: `${agent.name} Review`, url: `${baseUrl}${prefix}/reviews/${agent.slug}` },
  ];

  // Get related agents from same category
  const relatedAgents = aiAgentProviders
    .filter((a) => a.category === agent.category && a.id !== agent.id)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="py-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/reviews"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToReviews")}
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {agent.editorChoice && (
                  <Badge className="bg-yellow-500 text-yellow-950">
                    {t("editorChoice")}
                  </Badge>
                )}
                {agent.hasFreeTier && <Badge variant="secondary">{t("freeTierAvailable")}</Badge>}
                <Badge variant="outline">{getCategoryDisplayName(agent.category)}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{t("reviewTitle", { name: agent.name })}</h1>
              <div className="flex items-center gap-4 mb-4">
                <RatingStars rating={agent.overallRating} size="lg" />
                <span className="text-muted-foreground">
                  {t("basedOnTesting")}
                </span>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {agent.shortDescription}
              </p>
              <p className="text-sm font-semibold text-primary mb-4">
                {t("bestFor")}: {agent.bestFor}
              </p>
              <div className="flex flex-wrap gap-4">
                <AffiliateButton
                  agentId={agent.id}
                  agentName={agent.name}
                  affiliateUrl={agent.affiliateUrl}
                  size="lg"
                >
                  {agent.monthlyPrice === 0
                    ? t("tryFree", { name: agent.name })
                    : t("getAgentPrice", { name: agent.name, price: String(agent.monthlyPrice) })}
                </AffiliateButton>
              </div>
            </div>

            {/* Quick Stats Card */}
            <Card className="lg:w-80">
              <CardHeader>
                <CardTitle className="text-lg">{t("quickStats.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.monthlyPrice")}</span>
                  <span className="font-semibold">
                    {agent.monthlyPrice === 0 ? "Free" : `$${agent.monthlyPrice}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.freeTier")}</span>
                  <span className="font-semibold">{agent.hasFreeTier ? t("quickStats.yes") : t("quickStats.no")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.modelsSupported")}</span>
                  <span className="font-semibold">{agent.modelsSupported.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.integrations")}</span>
                  <span className="font-semibold">{agent.integrations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.apiAccess")}</span>
                  <span className="font-semibold">{agent.apiAccess ? t("quickStats.yes") : t("quickStats.no")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("quickStats.maxUsers")}</span>
                  <span className="font-semibold">{agent.maxUsers}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("quickStats.overallRating")}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      {agent.overallRating}
                    </span>
                    <span className="text-muted-foreground">/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ratings Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">{t("ratings.overall")}</span>
                  </div>
                  <span className="text-2xl font-bold">{agent.overallRating}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(agent.overallRating / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">{t("ratings.easeOfUse")}</span>
                  </div>
                  <span className="text-2xl font-bold">{agent.easeOfUse}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(agent.easeOfUse / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">{t("ratings.performance")}</span>
                  </div>
                  <span className="text-2xl font-bold">{agent.performance}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(agent.performance / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{t("ratings.valueForMoney")}</span>
                  </div>
                  <span className="text-2xl font-bold">{agent.valueForMoney}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(agent.valueForMoney / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t("description.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{agent.shortDescription}</p>
            </CardContent>
          </Card>

          {/* Models Supported */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                {t("modelsSupported.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.modelsSupported.map((model) => (
                  <Badge key={model} variant="outline" className="text-sm">
                    {model}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {t("integrations.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.integrations.map((integration) => (
                  <Badge key={integration} variant="secondary" className="text-sm">
                    {integration}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t("features.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {agent.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  {t("prosAndCons.pros")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {agent.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  {t("prosAndCons.cons")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {agent.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t("pricing.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {t("pricing.monthlyPrice")}
                  </div>
                  <div className="text-3xl font-bold">
                    {agent.monthlyPrice === 0 ? "Free" : `$${agent.monthlyPrice}`}
                  </div>
                  <div className="text-sm text-muted-foreground">{t("pricing.perMonth")}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {t("pricing.annualPrice")}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {agent.annualPrice === 0 ? "Free" : `$${agent.annualPrice}`}
                  </div>
                  <div className="text-sm text-muted-foreground">{t("pricing.perMonth")}</div>
                  {agent.annualPrice < agent.monthlyPrice && (
                    <Badge className="mt-2">{t("pricing.bestValue")}</Badge>
                  )}
                </div>
              </div>
              {agent.hasFreeTier && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">{t("pricing.freeTierAvailable")}</span>
                  </div>
                  {agent.freeTierLimits && (
                    <p className="text-sm text-muted-foreground">{agent.freeTierLimits}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verdict */}
          <Card className="mb-12 border-primary">
            <CardHeader>
              <CardTitle>{t("verdict.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">
                {t("verdict.description", {
                  name: agent.name,
                  rating: agent.overallRating,
                })}
                {agent.editorChoice && ` ${t("verdict.editorChoiceNote")}`}
              </p>
              <AffiliateButton
                agentId={agent.id}
                agentName={agent.name}
                affiliateUrl={agent.affiliateUrl}
                size="lg"
              >
                {agent.monthlyPrice === 0
                  ? t("verdict.tryFree", { name: agent.name })
                  : t("verdict.getAgentNow", { name: agent.name, price: String(agent.monthlyPrice) })}
              </AffiliateButton>
            </CardContent>
          </Card>

          {/* Related Agents */}
          {relatedAgents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t("relatedAgents.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedAgents.map((relatedAgent) => (
                  <Card key={relatedAgent.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedAgent.name}</CardTitle>
                      <RatingStars rating={relatedAgent.overallRating} size="sm" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedAgent.shortDescription}
                      </p>
                      <Link
                        href={`/reviews/${relatedAgent.slug}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {t("relatedAgents.readReview")}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* User Reviews Section */}
          <UserReviewsSection agent={agent} locale={_locale} title={t("userReviews.title")} />
        </div>
      </div>
    </>
  );
}

// User Reviews Section Component
function UserReviewsSection({ agent, locale, title }: { agent: AiAgentProvider; locale: string; title: string }) {
  const userReviews = getReviewsByVpnSlug(agent.slug, locale);
  const { average, count } = getAverageUserRating(agent.slug);

  return (
    <section id="user-reviews" className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Review Form */}
      <ReviewForm agentSlug={agent.slug} vpnName={agent.name} locale={locale} />

      {/* Reviews List */}
      <UserReviewsList
        reviews={userReviews}
        locale={locale}
        averageRating={average}
        totalReviews={count}
      />
    </section>
  );
}
