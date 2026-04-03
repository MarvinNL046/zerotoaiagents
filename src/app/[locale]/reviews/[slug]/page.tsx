import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/agents/rating-stars";
import { aiAgentProviders, getAgentBySlug, getCategoryDisplayName } from "@/lib/ai-agent-data";
import { Link } from "@/i18n/navigation";
import {
  Check,
  X,
  ArrowLeft,
  Cpu,
  Zap,
  DollarSign,
  Code,
  Sparkles,
  ExternalLink,
  BookOpen,
  GitCompare,
  ChevronDown,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { getReviewContent } from "@/lib/review-content";
import { AuthorBio } from "@/components/author-bio";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://zerotoaiagents.com";
export const revalidate = 86400;

// Comparison links for internal linking
const COMPARISON_LINKS: Record<string, Array<{ title: string; href: string; description: string }>> = {
  "cursor": [
    { title: "Cursor vs GitHub Copilot", href: "/compare/cursor-vs-github-copilot", description: "See how Cursor stacks up against Microsoft's AI coding tool" },
    { title: "Cursor vs Windsurf", href: "/compare/cursor-vs-windsurf", description: "Two AI-first code editors compared" },
    { title: "Cursor vs Windsurf vs Copilot", href: "/compare/cursor-vs-windsurf-vs-github-copilot", description: "Three-way comparison of the top AI editors" },
  ],
  "github-copilot": [
    { title: "Copilot vs Cursor", href: "/compare/cursor-vs-github-copilot", description: "GitHub Copilot vs the AI-first editor" },
    { title: "Copilot vs Claude Code", href: "/compare/github-copilot-vs-claude-code", description: "IDE extension vs CLI agent approach" },
  ],
  "windsurf": [
    { title: "Windsurf vs Cursor", href: "/compare/cursor-vs-windsurf", description: "Two AI-first editors head-to-head" },
    { title: "Windsurf vs Cursor vs Copilot", href: "/compare/cursor-vs-windsurf-vs-github-copilot", description: "How does Windsurf hold up in a three-way comparison?" },
  ],
  "claude-code": [
    { title: "Claude Code vs Copilot", href: "/compare/github-copilot-vs-claude-code", description: "CLI agent vs IDE extension — two approaches compared" },
    { title: "Claude Code vs Devin", href: "/compare/devin-vs-claude-code", description: "Two autonomous AI agents head-to-head" },
  ],
  "devin": [
    { title: "Devin vs Claude Code", href: "/compare/devin-vs-claude-code", description: "First AI engineer vs Anthropic's coding agent" },
  ],
};

// Related guides for internal linking
const RELATED_GUIDES = [
  { title: "What Are AI Coding Agents?", href: "/guides/what-are-ai-coding-agents", description: "Complete beginner's guide" },
  { title: "How to Choose the Right Agent", href: "/guides/how-to-choose-ai-coding-agent", description: "Decision framework for developers" },
  { title: "Free vs Paid Agents", href: "/guides/free-vs-paid-ai-coding-agents", description: "What you actually get on each tier" },
];

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

  const languages: Record<string, string> = { "x-default": `${baseUrl}/reviews/${agent.slug}` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews/${agent.slug}`;
  });

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
    authors: [{ name: "Marvin Smit" }],
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

  const reviewContent = getReviewContent(slug);

  const prefix = _locale === "en" ? "" : `/${_locale}`;
  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
    { name: `${agent.name} Review`, url: `${baseUrl}${prefix}/reviews/${agent.slug}` },
  ];

  const relatedAgents = aiAgentProviders
    .filter((a) => a.category === agent.category && a.id !== agent.id)
    .slice(0, 3);

  const comparisonLinks = COMPARISON_LINKS[agent.slug] ?? [];

  const tocSections = reviewContent
    ? [
        { id: "key-takeaways", label: "Key Takeaways" },
        { id: "full-review", label: "Full Review" },
        { id: "pros-cons", label: "Pros & Cons" },
        { id: "ratings", label: "Our Ratings" },
        ...(comparisonLinks.length > 0 ? [{ id: "comparisons", label: "How It Compares" }] : []),
        { id: "verdict", label: "Verdict" },
        { id: "faq", label: "FAQ" },
        { id: "related-guides", label: "Related Guides" },
        { id: "sources", label: "Sources & References" },
      ]
    : [
        { id: "what-is", label: `What is ${agent.name}?` },
        { id: "key-features", label: "Key Features" },
        { id: "models-integrations", label: "Models & Integrations" },
        { id: "pricing", label: "Pricing & Plans" },
        { id: "pros-cons", label: "Pros & Cons" },
        { id: "ratings", label: "Our Ratings" },
        ...(comparisonLinks.length > 0 ? [{ id: "comparisons", label: "How It Compares" }] : []),
        { id: "verdict", label: "Verdict" },
        { id: "related-guides", label: "Related Guides" },
        { id: "sources", label: "Sources & References" },
      ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 lg:py-16">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/reviews"
              className="text-sm text-slate-400 hover:text-orange-400 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToReviews")}
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {agent.editorChoice && (
              <span className="inline-flex items-center gap-1 bg-yellow-500 text-yellow-950 text-xs font-bold px-3 py-1 rounded-full">
                Editor&apos;s Choice
              </span>
            )}
            {agent.hasFreeTier && (
              <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Free Tier Available
              </span>
            )}
            <span className="inline-flex items-center bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">
              {getCategoryDisplayName(agent.category)}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
            {agent.name} Review 2026
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <RatingStars rating={agent.overallRating} size="lg" showValue={false} />
            <span className="text-3xl font-bold text-orange-400">{agent.overallRating}</span>
            <span className="text-slate-400 text-sm">/ 5.0</span>
            <span className="text-slate-400 text-sm hidden sm:inline">— Based on hands-on testing</span>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            {agent.shortDescription}
          </p>

          <p className="text-sm text-orange-400 font-semibold mb-6">
            Best for: {agent.bestFor}
          </p>

          {/* Key Takeaways Box */}
          <div className="border-l-4 border-orange-500 bg-orange-950/30 rounded-r-xl p-5 max-w-2xl">
            <h2 className="text-base font-bold text-orange-400 mb-3 uppercase tracking-wide">
              Key Takeaways
            </h2>
            <ul className="space-y-2">
              {(reviewContent?.keyTakeaways ?? agent.pros.slice(0, 4)).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-200 text-sm">
                  <Check className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
            <span>
              By <strong className="text-slate-300">Marvin Smit</strong>
            </span>
            <span>•</span>
            <span>
              Last updated:{" "}
              {reviewContent
                ? new Date(reviewContent.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "April 3, 2026"}
            </span>
            {reviewContent && (
              <span className="flex items-center gap-1">
                <span>•</span>
                <BookOpen className="h-3 w-3" />
                {reviewContent.readTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="container py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Table of Contents — Sticky Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                  Table of Contents
                </h3>
                <nav>
                  <ol className="space-y-2">
                    {tocSections.map((section, i) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-0.5"
                        >
                          <span className="text-orange-400 font-bold text-xs w-4 flex-shrink-0">
                            {i + 1}.
                          </span>
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="flex-1 max-w-3xl min-w-0">

            {reviewContent ? (
              <>
                {/* Rich Review: Key Takeaways anchor */}
                <div id="key-takeaways" className="scroll-mt-24" />

                {/* Rich Review: Full Article Content */}
                <section id="full-review" className="mb-14 scroll-mt-24">
                  <div
                    className="review-content"
                    dangerouslySetInnerHTML={{ __html: reviewContent.content }}
                  />
                </section>

                {/* Section: Pros & Cons */}
                <section id="pros-cons" className="mb-14 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                    Pros &amp; Cons
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-green-200 dark:border-green-800 rounded-xl p-5 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </span>
                        <h3 className="font-bold text-green-700 dark:text-green-400">Pros</h3>
                      </div>
                      <ul className="space-y-3">
                        {agent.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-red-200 dark:border-red-900 rounded-xl p-5 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                          <X className="h-4 w-4 text-red-600" />
                        </span>
                        <h3 className="font-bold text-red-700 dark:text-red-400">Cons</h3>
                      </div>
                      <ul className="space-y-3">
                        {agent.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section: Our Ratings */}
                <section id="ratings" className="mb-14 scroll-mt-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-600">
                    Our Ratings
                  </h2>
                  <div className="space-y-5">
                    <RatingBar
                      label="Overall"
                      value={agent.overallRating}
                      icon={<Sparkles className="h-4 w-4 text-orange-500" />}
                    />
                    <RatingBar
                      label="Ease of Use"
                      value={agent.easeOfUse}
                      icon={<Zap className="h-4 w-4 text-orange-500" />}
                    />
                    <RatingBar
                      label="Performance"
                      value={agent.performance}
                      icon={<Cpu className="h-4 w-4 text-orange-500" />}
                    />
                    <RatingBar
                      label="Value for Money"
                      value={agent.valueForMoney}
                      icon={<DollarSign className="h-4 w-4 text-orange-500" />}
                    />
                  </div>
                </section>

                {/* Section: Comparisons */}
                {comparisonLinks.length > 0 && (
                  <section id="comparisons" className="mb-14 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      How {agent.name} Compares
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                      Not sure {agent.name} is right for you? See how it stacks up against alternatives.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {comparisonLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-3 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
                        >
                          <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60 transition-colors">
                            <GitCompare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </span>
                          <div>
                            <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {link.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Section: Verdict */}
                <section id="verdict" className="mb-14 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                    Verdict
                  </h2>
                  <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded-r-xl p-6 mb-6">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      {agent.name} earns a strong <strong>{agent.overallRating}/5</strong> in our testing.{" "}
                      {agent.editorChoice
                        ? `It is our Editor's Choice in the ${getCategoryDisplayName(agent.category)} category — a well-rounded tool that delivers real value for the right team.`
                        : `It is a solid choice for ${agent.bestFor.toLowerCase()}, offering a good balance of features and accessibility.`}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {agent.hasFreeTier
                        ? `With a free tier available, there is very little risk in trying it out. `
                        : `Starting at $${agent.monthlyPrice}/month, it is priced ${agent.valueForMoney >= 4 ? "competitively for what it offers" : "at a premium, but justifies the cost for power users"}. `}
                      If you are evaluating AI {getCategoryDisplayName(agent.category).toLowerCase()}, {agent.name} deserves serious consideration.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RatingStars rating={agent.overallRating} size="md" showValue={false} />
                      <span className="font-bold text-slate-900 dark:text-white">{agent.overallRating}/5</span>
                    </div>
                    <Link
                      href="/guides/how-to-choose-ai-coding-agent"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold text-sm transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read our guide on choosing the right AI agent
                    </Link>
                  </div>
                </section>

                {/* Section: FAQ */}
                <section id="faq" className="mb-14 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {reviewContent.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div
                          className="px-5 pb-5 pt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </details>
                    ))}
                  </div>
                </section>

                {/* Section: Related Guides */}
                <section id="related-guides" className="mb-14 scroll-mt-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-600">
                    Related Guides
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    Deepen your understanding with these in-depth guides.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {RELATED_GUIDES.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="flex flex-col gap-2 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
                      >
                        <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60 transition-colors">
                          <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </span>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {guide.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {guide.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Section: Sources */}
                <section id="sources" className="mb-14 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                    Sources &amp; References
                  </h2>
                  <ul className="space-y-3">
                    {reviewContent.sources.map((source, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline font-medium"
                          >
                            {source.name}
                          </a>
                          <span className="text-slate-400 ml-2">· {source.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Author Bio */}
                <AuthorBio />
              </>
            ) : (
              <>
            {/* Section: What is {Agent}? */}
            <section id="what-is" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                What is {agent.name}?
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {agent.shortDescription} Designed for {agent.bestFor.toLowerCase()}, it stands out among {getCategoryDisplayName(agent.category).toLowerCase()} for its combination of powerful features and developer-first experience.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  In our hands-on testing, {agent.name} earned an overall score of{" "}
                  <strong>{agent.overallRating}/5</strong>, with particular strengths in{" "}
                  {agent.easeOfUse >= 4.5 ? "ease of use" : agent.performance >= 4.5 ? "performance" : "value for money"}.
                  {agent.hasFreeTier
                    ? ` A free tier is available, making it accessible for developers who want to try before committing.`
                    : ` It starts at $${agent.monthlyPrice}/month, which positions it as a ${agent.valueForMoney >= 4 ? "strong value" : "premium option"} in its category.`}
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  It supports {agent.modelsSupported.length} AI model{agent.modelsSupported.length !== 1 ? "s" : ""} and integrates with {agent.integrations.length} platform{agent.integrations.length !== 1 ? "s" : ""}, giving teams flexibility in how they incorporate it into their workflow.
                </p>
              </div>
            </section>

            {/* Section: Key Features */}
            <section id="key-features" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agent.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900 hover:shadow-lg transition-all"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center">
                      <Check className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Models & Integrations */}
            <section id="models-integrations" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                Models &amp; Integrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Supported Models
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.modelsSupported.map((model) => (
                      <Badge
                        key={model}
                        variant="outline"
                        className="text-xs border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-400"
                      >
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Integrations
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.integrations.map((integration) => (
                      <Badge
                        key={integration}
                        variant="secondary"
                        className="text-xs"
                      >
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Pricing & Plans */}
            <section id="pricing" className="mb-14 scroll-mt-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-600">
                Pricing &amp; Plans
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Monthly */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Monthly plan
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {agent.monthlyPrice === 0 ? "Free" : `$${agent.monthlyPrice}`}
                  </div>
                  {agent.monthlyPrice > 0 && (
                    <div className="text-sm text-slate-500 mt-1">per month</div>
                  )}
                </div>
                {/* Annual */}
                <div className="border border-orange-200 dark:border-orange-800 rounded-xl p-5 bg-orange-50 dark:bg-orange-950/20 relative">
                  {agent.annualPrice < agent.monthlyPrice && (
                    <span className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
                      Annual plan
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                    {agent.annualPrice === 0 ? "Free" : `$${agent.annualPrice}`}
                  </div>
                  {agent.annualPrice > 0 && (
                    <div className="text-sm text-orange-600/70 dark:text-orange-500 mt-1">per month, billed annually</div>
                  )}
                </div>
              </div>

              {agent.hasFreeTier && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800 dark:text-green-400">
                      Free Tier Available
                    </span>
                  </div>
                  {agent.freeTierLimits && (
                    <p className="text-sm text-green-700 dark:text-green-500 ml-7">
                      {agent.freeTierLimits}
                    </p>
                  )}
                </div>
              )}

              <p className="text-sm text-slate-500 dark:text-slate-400">
                For the most current pricing, visit{" "}
                <a
                  href={agent.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
                >
                  {agent.name}&apos;s official website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </section>

            {/* Section: Pros & Cons */}
            <section id="pros-cons" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                Pros &amp; Cons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 dark:border-green-800 rounded-xl p-5 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                    <h3 className="font-bold text-green-700 dark:text-green-400">Pros</h3>
                  </div>
                  <ul className="space-y-3">
                    {agent.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-red-200 dark:border-red-900 rounded-xl p-5 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                    <h3 className="font-bold text-red-700 dark:text-red-400">Cons</h3>
                  </div>
                  <ul className="space-y-3">
                    {agent.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section: Our Ratings */}
            <section id="ratings" className="mb-14 scroll-mt-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-600">
                Our Ratings
              </h2>
              <div className="space-y-5">
                <RatingBar
                  label="Overall"
                  value={agent.overallRating}
                  icon={<Sparkles className="h-4 w-4 text-orange-500" />}
                />
                <RatingBar
                  label="Ease of Use"
                  value={agent.easeOfUse}
                  icon={<Zap className="h-4 w-4 text-orange-500" />}
                />
                <RatingBar
                  label="Performance"
                  value={agent.performance}
                  icon={<Cpu className="h-4 w-4 text-orange-500" />}
                />
                <RatingBar
                  label="Value for Money"
                  value={agent.valueForMoney}
                  icon={<DollarSign className="h-4 w-4 text-orange-500" />}
                />
              </div>
            </section>

            {/* Section: Comparisons (only if links exist) */}
            {comparisonLinks.length > 0 && (
              <section id="comparisons" className="mb-14 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  How {agent.name} Compares
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                  Not sure {agent.name} is right for you? See how it stacks up against alternatives.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {comparisonLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-start gap-3 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
                    >
                      <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60 transition-colors">
                        <GitCompare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {link.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {link.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Verdict */}
            <section id="verdict" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                Verdict
              </h2>
              <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded-r-xl p-6 mb-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  {agent.name} earns a strong <strong>{agent.overallRating}/5</strong> in our testing.{" "}
                  {agent.editorChoice
                    ? `It is our Editor's Choice in the ${getCategoryDisplayName(agent.category)} category — a well-rounded tool that delivers real value for the right team.`
                    : `It is a solid choice for ${agent.bestFor.toLowerCase()}, offering a good balance of features and accessibility.`}
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {agent.hasFreeTier
                    ? `With a free tier available, there is very little risk in trying it out. `
                    : `Starting at $${agent.monthlyPrice}/month, it is priced ${agent.valueForMoney >= 4 ? "competitively for what it offers" : "at a premium, but justifies the cost for power users"}. `}
                  If you are evaluating AI {getCategoryDisplayName(agent.category).toLowerCase()}, {agent.name} deserves serious consideration.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <RatingStars rating={agent.overallRating} size="md" showValue={false} />
                  <span className="font-bold text-slate-900 dark:text-white">{agent.overallRating}/5</span>
                </div>
                <Link
                  href="/guides/how-to-choose-ai-coding-agent"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold text-sm transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Read our guide on choosing the right AI agent
                </Link>
              </div>
            </section>

            {/* Section: Related Guides */}
            <section id="related-guides" className="mb-14 scroll-mt-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-600">
                Related Guides
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Deepen your understanding with these in-depth guides.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RELATED_GUIDES.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="flex flex-col gap-2 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
                  >
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60 transition-colors">
                      <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </span>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {guide.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {guide.description}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section: Sources & References */}
            <section id="sources" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
                Sources &amp; References
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <a
                    href={agent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline"
                  >
                    {agent.name} — Official Website
                  </a>
                  <span className="text-slate-400">· Primary source</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  Additional documentation and pricing pages reviewed April 2026
                </li>
              </ul>
            </section>

            {/* Author Bio */}
            <AuthorBio />
            </>
            )}

          </main>
        </div>

        {/* Related Agents Section */}
        {relatedAgents.length > 0 && (
          <div className="mt-4 pt-10 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {t("relatedAgents.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAgents.map((relatedAgent) => (
                <div
                  key={relatedAgent.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-900 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    {relatedAgent.name}
                  </h3>
                  <RatingStars rating={relatedAgent.overallRating} size="sm" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 mb-4 line-clamp-2">
                    {relatedAgent.shortDescription}
                  </p>
                  <Link
                    href={`/reviews/${relatedAgent.slug}`}
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:underline transition-colors"
                  >
                    {t("relatedAgents.readReview")} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Rating bar sub-component
function RatingBar({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  const pct = Math.round((value / 5) * 100);
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 w-36 flex-shrink-0">
        {icon}
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
          {label}
        </span>
      </div>
      <div className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right flex-shrink-0">
        {value}
      </span>
    </div>
  );
}
