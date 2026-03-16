import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Shield,
  Scale,
  CheckCircle,
  Search,
  RefreshCw,
  Mail,
  FileText,
  BadgeCheck,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Editorial Policy - ZeroToAIAgents",
    description:
      "Learn about ZeroToAIAgents' editorial standards, content creation process, and commitment to providing accurate, unbiased AI agent reviews and comparisons.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/editorial-policy`,
    },
  };
}

export default async function EditorialPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lastUpdated = "March 16, 2026";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Editorial Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Our commitment to honest, accurate, and transparent AI agent
              reviews and educational content.
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
              {/* Our Mission */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-4">
                  ZeroToAIAgents is an independent AI agent comparison and
                  educational website. Our mission is to help individuals and
                  businesses navigate the rapidly evolving AI agent landscape by
                  providing honest, well-researched reviews, comparisons, and
                  educational content.
                </p>
                <p className="text-muted-foreground">
                  We are committed to editorial integrity and transparency in
                  everything we publish. Our readers rely on us to give them
                  accurate information to make informed decisions about AI agent
                  platforms and tools.
                </p>
              </div>

              {/* Content Standards */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Content Standards
                </h2>
                <p className="text-muted-foreground mb-4">
                  All content published on ZeroToAIAgents adheres to the
                  following standards:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Accuracy</h4>
                    <p className="text-sm text-muted-foreground">
                      We verify facts, pricing, and feature information before
                      publishing. When AI agent platforms update their offerings,
                      we update our content accordingly.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Honesty</h4>
                    <p className="text-sm text-muted-foreground">
                      We present both the strengths and weaknesses of every AI
                      agent platform we review. We do not hide flaws to benefit
                      affiliate partners or for any other reason.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Transparency</h4>
                    <p className="text-sm text-muted-foreground">
                      We clearly disclose our affiliate relationships and how we
                      earn revenue. See our{" "}
                      <Link
                        href="/affiliate-disclosure"
                        className="text-primary hover:underline"
                      >
                        Affiliate Disclosure
                      </Link>{" "}
                      for full details.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Originality</h4>
                    <p className="text-sm text-muted-foreground">
                      Our content is based on our own research, testing, and
                      analysis. We do not copy or plagiarize from other sources.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Relevance</h4>
                    <p className="text-sm text-muted-foreground">
                      We focus on information that is useful and actionable for
                      our audience, covering the AI agent platforms and tools
                      that matter most.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Create Content */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Search className="h-6 w-6 text-primary" />
                  How We Create Content
                </h2>
                <p className="text-muted-foreground mb-4">
                  Our editorial team researches AI agent platforms by evaluating
                  their features, pricing, performance, integration capabilities,
                  and user feedback. We draw on:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>
                    Hands-on testing of AI agent platforms and their features
                  </li>
                  <li>Official platform documentation and announcements</li>
                  <li>Publicly available performance benchmarks and reviews</li>
                  <li>Real user experiences and community feedback</li>
                  <li>
                    Industry research and reports from reputable sources
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  We regularly revisit and update our content to ensure it
                  remains accurate as AI agent platforms evolve and change their
                  offerings.
                </p>
              </div>

              {/* Editorial Independence */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  Independence from Advertisers
                </h2>
                <p className="text-muted-foreground mb-4">
                  While ZeroToAIAgents earns revenue through affiliate
                  partnerships and Google AdSense advertising, our editorial
                  decisions are made independently.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    Affiliate commissions and ad revenue do not determine which
                    platforms we review, how we rate them, or what we recommend
                  </li>
                  <li>
                    A platform with a higher affiliate commission will never
                    receive a better rating solely because of that commission
                  </li>
                  <li>
                    We include AI agent platforms in our reviews even if they do
                    not have affiliate programs
                  </li>
                  <li>
                    Our ratings reflect the actual quality and value of each
                    platform based on our research and testing
                  </li>
                </ul>
              </div>

              {/* Corrections and Updates */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  Corrections and Updates
                </h2>
                <p className="text-muted-foreground mb-4">
                  We take accuracy seriously. If we discover an error in our
                  content, we correct it promptly and note the correction where
                  appropriate.
                </p>
                <p className="text-muted-foreground">
                  If you notice any inaccuracies in our content, we encourage
                  you to contact us so we can investigate and make corrections.
                  The AI agent industry evolves rapidly, and reader feedback
                  helps us maintain the most current and accurate information
                  possible.
                </p>
              </div>

              {/* E-E-A-T */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                  E-E-A-T Commitment
                </h2>
                <p className="text-muted-foreground mb-4">
                  We strive to demonstrate Experience, Expertise,
                  Authoritativeness, and Trustworthiness (E-E-A-T) in all our
                  content:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Our editorial team has practical experience using AI agent
                      platforms and tools in real-world scenarios.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Expertise</h4>
                    <p className="text-sm text-muted-foreground">
                      We continuously deepen our knowledge of AI agent
                      technologies, frameworks, and industry trends.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Authoritativeness</h4>
                    <p className="text-sm text-muted-foreground">
                      We build authority through thorough research, accurate
                      reporting, and consistent quality in our content.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Trustworthiness</h4>
                    <p className="text-sm text-muted-foreground">
                      We are transparent about who we are, how we operate, and
                      how we earn revenue. We do not use fake team member
                      profiles or fabricated credentials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Our Editorial Team
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our editorial process, want to
                  suggest a correction, or have feedback about our content,
                  please contact us:
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
                    href="/about"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    About Us
                  </Link>
                  <Link
                    href="/affiliate-disclosure"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Affiliate Disclosure
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Shield className="h-4 w-4" />
                    Privacy Policy
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
