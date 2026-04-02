import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { NewsletterPopup } from "@/components/newsletter/newsletter-popup";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "ZeroToAIAgents - Best AI Agent Reviews & Comparisons 2026",
    nl: "ZeroToAIAgents - Beste AI Agent Reviews & Vergelijkingen 2026",
    de: "ZeroToAIAgents - Beste AI Agent Tests & Vergleiche 2026",
    es: "ZeroToAIAgents - Mejores Reseñas y Comparaciones de AI Agent 2026",
    fr: "ZeroToAIAgents - Meilleurs Avis et Comparaisons AI Agent 2026",
    zh: "ZeroToAIAgents - 2026年最佳AI Agent评测与比较",
    ja: "ZeroToAIAgents - 2026年ベストAI Agentレビュー＆比較",
    ko: "ZeroToAIAgents - 2026년 최고의 AI Agent 리뷰 및 비교",
    th: "ZeroToAIAgents - รีวิวและเปรียบเทียบ AI Agent ที่ดีที่สุด 2026",
  };

  const descriptions: Record<string, string> = {
    en: "Find the perfect AI agent for your needs. Expert reviews, honest comparisons, and exclusive deals on top AI agent platforms.",
    nl: "Vind de perfecte AI agent voor jouw behoeften. Expert reviews, eerlijke vergelijkingen en exclusieve deals.",
    de: "Finden Sie den perfekten AI Agent für Ihre Bedürfnisse. Expertenbewertungen, ehrliche Vergleiche und exklusive Angebote.",
    es: "Encuentra el AI agent perfecto para tus necesidades. Reseñas de expertos, comparaciones honestas y ofertas exclusivas.",
    fr: "Trouvez l'AI agent parfait pour vos besoins. Avis d'experts, comparaisons honnêtes et offres exclusives.",
    zh: "找到适合您需求的完美AI agent。专家评测、诚实比较和独家优惠。",
    ja: "あなたのニーズに最適なAI agentを見つけましょう。専門家レビュー、正直な比較、限定特典。",
    ko: "당신의 필요에 맞는 완벽한 AI agent를 찾아보세요. 전문가 리뷰, 솔직한 비교, 독점 혜택.",
    th: "ค้นหา AI agent ที่สมบูรณ์แบบสำหรับความต้องการของคุณ รีวิวจากผู้เชี่ยวชาญ เปรียบเทียบอย่างตรงไปตรงมา",
  };

  const baseUrl = "https://zerotoaiagents.com";
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": baseUrl };
  routing.locales.forEach((l) => {
    languages[l] = l === "en" ? baseUrl : `${baseUrl}/${l}`;
  });

  return {
    title: {
      default: titles[locale] || titles.en,
      template: "%s | ZeroToAIAgents",
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "AI agent",
      "AI agent review",
      "best AI agent",
      "AI agent comparison",
      "ChatGPT",
      "Claude",
      "Cursor",
      "GitHub Copilot",
      "AI automation",
      "coding agent",
      "customer support AI",
      "no-code AI",
      "enterprise AI",
      "AI frameworks",
    ],
    authors: [{ name: "ZeroToAIAgents" }],
    creator: "ZeroToAIAgents",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col" lang={locale}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* Newsletter signup component */}
            <NewsletterPopup />
            {/* JSON-LD Structured Data - placed in body to avoid hydration issues */}
            <OrganizationJsonLd />
            <WebsiteJsonLd />
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
  );
}
