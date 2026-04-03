import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Cookie,
  Shield,
  Settings,
  Eye,
  Globe,
  Mail,
  FileText,
  Info,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Cookie Policy - ZeroToAIAgents",
    description:
      "Learn how ZeroToAIAgents uses cookies and similar tracking technologies. This policy explains what cookies we use, why, and how you can manage your preferences.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/cookie-policy`,
    },
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lastUpdated = "April 3, 2026";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              This policy explains how ZeroToAIAgents uses cookies and similar
              technologies to recognize you when you visit our website.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* What Are Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="h-6 w-6 text-primary" />
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or smartphone) when you visit a website.
                  They are widely used to make websites work more efficiently,
                  provide a better user experience, and give information to the
                  site owners.
                </p>
                <p className="text-muted-foreground">
                  This Cookie Policy explains how ZeroToAIAgents
                  (zerotoaiagents.com) uses cookies and similar tracking
                  technologies when you visit our website.
                </p>
              </div>

              {/* Types of Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  Types of Cookies We Use
                </h2>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies are necessary for the website to function
                      properly. They enable basic features like page navigation,
                      language preferences, and access to secure areas. The
                      website cannot function properly without these cookies, and
                      they cannot be disabled.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      We use analytics cookies (such as Google Analytics) to
                      understand how visitors interact with our website. These
                      cookies collect information anonymously, including the
                      number of visitors, the pages they visit, and the source
                      of traffic. This helps us improve our website and content.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Advertising Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      We display advertisements through Google AdSense, which
                      uses cookies to serve ads based on your visits to our site
                      and other websites. These cookies track your browsing
                      activity to deliver ads that are relevant to your
                      interests. You can opt out of personalized advertising by
                      visiting{" "}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Ads Settings
                      </a>
                      .
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These cookies remember your settings and preferences, such
                      as your chosen language, dark/light mode, and cookie
                      consent choices. They help provide a more personalized
                      experience on return visits.
                    </p>
                  </div>

                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  Third-Party Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies on our website are set by third-party services
                  that appear on our pages. We do not control these cookies. The
                  main third-party services we use include:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to analyze website traffic and usage patterns. Data
                      is collected anonymously. Learn more at{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Google AdSense</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to display advertisements. These cookies track
                      browsing activity for ad personalization. You can opt out
                      via{" "}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Ads Settings
                      </a>
                      .
                    </p>
                  </div>

                </div>
              </div>

              {/* Managing Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  How to Manage Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to decide whether to accept or reject
                  cookies. You can manage your cookie preferences in the
                  following ways:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>
                    <strong>Browser settings:</strong> Most web browsers allow
                    you to control cookies through their settings. You can set
                    your browser to refuse cookies or to alert you when cookies
                    are being sent.
                  </li>
                  <li>
                    <strong>Google Analytics opt-out:</strong> You can install
                    the{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Analytics opt-out browser add-on
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Ad personalization:</strong> You can opt out of
                    personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Ads Settings
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://optout.aboutads.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      aboutads.info
                    </a>
                    .
                  </li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Disabling certain cookies may affect
                    the functionality of our website. Essential cookies cannot be
                    disabled as they are required for the site to function
                    properly.
                  </p>
                </div>
              </div>

              {/* GDPR Rights */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Your Rights Under GDPR
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you are located in the European Economic Area (EEA), you
                  have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Be informed about how we use cookies</li>
                  <li>Accept or reject non-essential cookies</li>
                  <li>
                    Withdraw your consent for cookies at any time by clearing
                    your browser cookies and revisiting our site
                  </li>
                  <li>
                    Request information about the cookies we use and the data
                    they collect
                  </li>
                </ul>
              </div>

              {/* Changes */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for legal, regulatory, or
                  operational reasons. Any changes will be posted on this page
                  with an updated revision date. We encourage you to review this
                  policy periodically.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies, please
                  contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">ZeroToAIAgents</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:hello@zerotoaiagents.com"
                      className="text-primary hover:underline"
                    >
                      hello@zerotoaiagents.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Related Pages</h2>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Shield className="h-4 w-4" />
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Terms of Service
                  </Link>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
