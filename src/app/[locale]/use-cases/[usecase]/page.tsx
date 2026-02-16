import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AgentCard } from "@/components/agents/agent-card";
import { useCases, STATIC_USE_CASE_SLUGS, type UseCaseData } from "@/lib/use-case-data";
import { getAgentBySlug } from "@/lib/ai-agent-data";
import {
  CheckCircle,
  Sparkles,
  Target,
  Lightbulb,
  ArrowRight,
  Home,
  ChevronRight
} from "lucide-react";

export async function generateStaticParams() {
  return useCases.map((uc) => ({
    usecase: uc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; usecase: string }>;
}) {
  const { usecase } = await params;
  const useCaseData = useCases.find((uc) => uc.slug === usecase);

  if (!useCaseData) {
    return {
      title: "Use Case Not Found",
    };
  }

  return {
    title: useCaseData.metaTitle,
    description: useCaseData.metaDescription,
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; usecase: string }>;
}) {
  const { locale, usecase } = await params;
  const t = await getTranslations({ locale });

  // Find the use case data
  const useCaseData = useCases.find((uc) => uc.slug === usecase);

  if (!useCaseData) {
    notFound();
  }

  // Get recommended agents
  const recommendedAgents = useCaseData.recommendedAgentSlugs
    .map((slug) => getAgentBySlug(slug))
    .filter((agent) => agent !== undefined);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/use-cases" className="hover:text-foreground transition-colors">
          Use Cases
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{useCaseData.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl">{useCaseData.icon}</span>
          <Badge variant="secondary" className="text-sm">
            {useCaseData.category}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {useCaseData.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          {useCaseData.heroSubtitle}
        </p>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-lg leading-relaxed text-muted-foreground">
          {useCaseData.description}
        </p>
      </div>

      {/* Why Use AI Agents Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Why Use AI Agents for {useCaseData.name}?</h2>
        </div>
        <div className="grid gap-4">
          {useCaseData.whyAiAgents.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
              <p className="text-lg">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended AI Agents Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6 max-w-4xl mx-auto">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Recommended AI Agents</h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-4xl mx-auto">
          These AI agents excel at {useCaseData.name.toLowerCase()} tasks based on our testing and reviews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {recommendedAgents.map((agent, idx) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              rank={idx + 1}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Key Features to Look For</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {useCaseData.keyFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Tips for Getting Started</h2>
        </div>
        <div className="space-y-4">
          {useCaseData.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                {idx + 1}
              </div>
              <p className="text-lg">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {useCaseData.faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Compare the best AI agents for {useCaseData.name.toLowerCase()} and find the perfect fit for your needs.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/reviews">
              Compare All AI Agents
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/use-cases">
              Explore Other Use Cases
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
