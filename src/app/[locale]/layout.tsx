import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
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

  const title = "ZeroToAIAgents - Best AI Coding Agent Reviews & Comparisons 2026";
  const description =
    "Find the perfect AI coding agent for your needs. Expert reviews, honest comparisons, and in-depth guides for tools like Cursor, GitHub Copilot, Claude Code, and more.";

  const baseUrl = "https://zerotoaiagents.com";
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: {
      default: title,
      template: "%s | ZeroToAIAgents",
    },
    description,
    keywords: [
      "AI coding agents",
      "AI coding agent review",
      "best AI coding agent",
      "AI coding agent comparison",
      "Cursor review",
      "GitHub Copilot review",
      "Claude Code review",
      "Windsurf review",
      "AI pair programming",
      "coding agent",
      "AI developer tools",
      "AI code assistant",
    ],
    authors: [{ name: "ZeroToAIAgents" }],
    creator: "ZeroToAIAgents",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "ZeroToAIAgents",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
            {/* JSON-LD Structured Data - placed in body to avoid hydration issues */}
            <OrganizationJsonLd />
            <WebsiteJsonLd />
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
  );
}
