import { setRequestLocale, getTranslations } from "next-intl/server";
import { aiAgentProviders, type AgentCategory } from "@/lib/ai-agent-data";
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
    en: "AI Agent Reviews 2026 - Expert Analysis & Ratings",
    nl: "AI Agent Reviews 2026 - Expert Analyse & Beoordelingen",
    de: "AI Agent Tests 2026 - Expertenanalyse & Bewertungen",
    es: "Reseñas de Agentes de IA 2026 - Análisis de Expertos",
    fr: "Avis sur les Agents IA 2026 - Analyse d'Experts",
    zh: "AI 代理评测 2026 - 专家分析与评分",
    ja: "AI エージェントレビュー 2026 - 専門家分析",
    ko: "AI 에이전트 리뷰 2026 - 전문가 분석 및 평가",
    th: "รีวิว AI Agent 2026 - วิเคราะห์โดยผู้เชี่ยวชาญ",
  };

  const descriptions: Record<string, string> = {
    en: "Read our in-depth AI agent reviews 2026. We test Claude Code, Cursor, ChatGPT, n8n & more for coding, automation, and productivity. Find your perfect AI agent.",
    nl: "Lees onze uitgebreide AI agent reviews 2026. We testen Claude Code, Cursor, ChatGPT, n8n en meer op codering, automatisering en productiviteit.",
    de: "Lesen Sie unsere ausführlichen KI-Agenten-Tests 2026. Wir testen Claude Code, Cursor, ChatGPT, n8n und mehr auf Codierung, Automatisierung und Produktivität.",
    es: "Lee nuestras reseñas detalladas de agentes de IA 2026. Probamos Claude Code, Cursor, ChatGPT, n8n y más para codificación, automatización y productividad.",
    fr: "Lisez nos avis approfondis sur les agents IA 2026. Nous testons Claude Code, Cursor, ChatGPT, n8n et plus pour le codage, l'automatisation et la productivité.",
    zh: "阅读我们的深度AI代理评测2026。我们测试Claude Code、Cursor、ChatGPT、n8n等的编码、自动化和生产力功能。",
    ja: "2026年の详細なAIエージェントレビューをご覧ください。Claude Code、Cursor、ChatGPT、n8nなどのコーディング、自動化、生産性をテスト。",
    ko: "2026년 심층 AI 에이전트 리뷰를 읽어보세요. Claude Code, Cursor, ChatGPT, n8n 등의 코딩, 자동화, 생산성을 테스트합니다.",
    th: "อ่านรีวิว AI agent เชิงลึกของเรา 2026 เราทดสอบ Claude Code, Cursor, ChatGPT, n8n และอื่นๆ สำหรับการเขียนโค้ด ระบบอัตโนมัติ และประสิทธิภาพ",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "AI agent reviews",
      "AI agent comparison",
      "best AI agents 2026",
      "Claude Code review",
      "Cursor review",
      "ChatGPT review",
      "AI agent test",
      "AI agent ratings",
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
