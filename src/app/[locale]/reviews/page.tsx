import { setRequestLocale } from "next-intl/server";
import { aiAgentProviders } from "@/lib/ai-agent-data";
import { routing } from "@/i18n/routing";
import { BreadcrumbSchema, ComparisonTableSchema } from "@/components/structured-data";
import type { Metadata } from "next";
import { ReviewsPageClient } from "./reviews-client";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews`;
  });

  const titles: Record<string, string> = {
    en: "Best AI Coding Agents 2026 - Ranked Reviews & Top Picks",
    nl: "Beste AI Coding Agents 2026 - Reviews, Rankings & Top Picks",
    de: "Beste KI Coding Agents 2026 - Rankings, Tests & Top Picks",
    es: "Mejores Agentes de IA para Programar 2026 - Rankings y Reseñas",
    fr: "Meilleurs Agents IA pour le Code 2026 - Classement et Avis",
    zh: "最佳 AI 编码代理 2026 - 排名、评测与推荐",
    ja: "最高のAIコーディングエージェント 2026 - ランキングとレビュー",
    ko: "최고의 AI 코딩 에이전트 2026 - 순위, 리뷰 및 추천",
    th: "AI Coding Agents ที่ดีที่สุด 2026 - รีวิว อันดับ และตัวเลือกแนะนำ",
  };

  const descriptions: Record<string, string> = {
    en: "Discover the best AI coding agents in 2026. We ranked Claude Code, Cursor, GitHub Copilot, Windsurf, Devin and more based on hands-on testing, pricing, features, and value.",
    nl: "Ontdek de beste AI coding agents van 2026. We rangschikken Claude Code, Cursor, GitHub Copilot, Windsurf, Devin en meer op basis van hands-on tests, prijzen en functies.",
    de: "Entdecken Sie die besten KI Coding Agents 2026. Wir bewerten Claude Code, Cursor, GitHub Copilot, Windsurf, Devin und mehr anhand von Praxistests, Preisen und Funktionen.",
    es: "Descubre los mejores agentes de IA para programar en 2026. Clasificamos Claude Code, Cursor, GitHub Copilot, Windsurf, Devin y más según pruebas reales, precio y funciones.",
    fr: "Découvrez les meilleurs agents IA pour coder en 2026. Nous classons Claude Code, Cursor, GitHub Copilot, Windsurf, Devin et plus selon des tests réels, les prix et les fonctionnalités.",
    zh: "了解 2026 年最佳 AI 编码代理。我们基于实测、价格、功能和性价比对 Claude Code、Cursor、GitHub Copilot、Windsurf、Devin 等进行排名。",
    ja: "2026年の最高のAIコーディングエージェントを紹介します。Claude Code、Cursor、GitHub Copilot、Windsurf、Devin などを実機テスト、価格、機能、価値で評価しました。",
    ko: "2026년 최고의 AI 코딩 에이전트를 확인하세요. Claude Code, Cursor, GitHub Copilot, Windsurf, Devin 등을 실사용 테스트, 가격, 기능, 가성비 기준으로 평가했습니다.",
    th: "ค้นหา AI coding agents ที่ดีที่สุดในปี 2026 เราจัดอันดับ Claude Code, Cursor, GitHub Copilot, Windsurf, Devin และอื่นๆ จากการทดสอบจริง ราคา ฟีเจอร์ และความคุ้มค่า",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "best AI coding agents 2026",
      "best AI coding tools",
      "AI coding agent reviews",
      "AI coding agent comparison",
      "Claude Code review",
      "Cursor review",
      "GitHub Copilot review",
      "Windsurf review",
      "AI coding agent rankings",
    ],
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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const agents = aiAgentProviders;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ComparisonTableSchema agents={agents} />
      <ReviewsPageClient agents={agents} locale={locale} />
    </>
  );
}
