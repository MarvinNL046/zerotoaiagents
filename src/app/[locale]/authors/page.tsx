import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Users,
  BookOpen,
  Shield,
  CheckCircle,
  Search,
  Mail,
  FileText,
  Award,
  Target,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Our Editorial Team",
    description:
      "Meet the editorial team behind ZeroToAIAgents. Learn about our commitment to providing honest, well-researched AI agent reviews and educational content.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/authors`,
    },
  };
}

export default async function AuthorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Editorial Team
            </h1>
            <p className="text-lg text-muted-foreground">
              The people behind ZeroToAIAgents&apos; AI agent reviews,
              comparisons, and educational content.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Who We Are */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Who We Are
                </h2>
                <p className="text-muted-foreground mb-4">
                  ZeroToAIAgents is run by a small, dedicated editorial team
                  passionate about AI technology and its practical applications.
                  We are technology enthusiasts and practitioners who use AI
                  agent platforms in our own work, giving us firsthand experience
                  with the tools we review.
                </p>
                <p className="text-muted-foreground">
                  We believe in transparency: we do not use fake team member
                  profiles or fabricated credentials. We are a lean team focused
                  on delivering quality, honest content rather than creating an
                  impression of being larger than we are.
                </p>
              </div>

              {/* What We Do */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  What We Do
                </h2>
                <p className="text-muted-foreground mb-4">
                  Our editorial team is responsible for:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Research & Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        Researching and testing AI agent platforms across
                        categories including coding assistants, customer support
                        bots, no-code builders, enterprise solutions, and AI
                        frameworks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Reviews & Comparisons</h4>
                      <p className="text-sm text-muted-foreground">
                        Writing in-depth reviews and comparison articles based on
                        our research, hands-on testing, and analysis of real user
                        feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Content Maintenance</h4>
                      <p className="text-sm text-muted-foreground">
                        Keeping our content up to date as AI agent platforms
                        change their features, pricing, and capabilities. The AI
                        industry moves fast, and we work to keep pace.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Educational Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Creating guides, tutorials, and use-case articles to help
                        readers understand and effectively use AI agent
                        platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Expertise */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Our Expertise
                </h2>
                <p className="text-muted-foreground mb-4">
                  Our team brings practical experience in the AI and technology
                  industry. This includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    Hands-on experience using AI agent platforms for coding,
                    content creation, automation, and business operations
                  </li>
                  <li>
                    Understanding of different AI models, architectures, and
                    their practical strengths and limitations
                  </li>
                  <li>
                    Knowledge of the tools, APIs, and frameworks that developers
                    and businesses use to integrate AI agents
                  </li>
                  <li>
                    Ongoing research into industry trends, new platforms,
                    emerging capabilities, and changing market conditions
                  </li>
                </ul>
              </div>

              {/* Editorial Standards */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Our Editorial Standards
                </h2>
                <p className="text-muted-foreground mb-4">
                  Every piece of content on ZeroToAIAgents goes through a review
                  process to ensure accuracy, fairness, and usefulness:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    We fact-check claims and verify pricing, feature
                    availability, and performance data before publishing
                  </li>
                  <li>
                    We present both advantages and disadvantages of every
                    platform, regardless of affiliate relationships
                  </li>
                  <li>
                    We update content when platforms make significant changes to
                    their offerings
                  </li>
                  <li>
                    We clearly disclose when content contains affiliate links
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  For more details on how we maintain quality and integrity in
                  our content, see our{" "}
                  <Link
                    href="/editorial-policy"
                    className="text-primary hover:underline"
                  >
                    Editorial Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you would like to reach our editorial team with questions,
                  corrections, or content suggestions, please contact us:
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
                    href="/editorial-policy"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Editorial Policy
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
