import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCases } from "@/lib/use-case-data";
import { ArrowRight, CheckCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: "AI Agent Use Cases | ZeroToAIAgents",
    description: "Discover how AI agents can transform your workflow. Explore use cases for coding, marketing, customer support, and more.",
  };
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Badge className="mb-4" variant="secondary">
          Use Cases
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Discover AI Agent Use Cases
        </h1>
        <p className="text-xl text-muted-foreground">
          From software development to customer support, AI agents are transforming how we work.
          Explore use cases and find the perfect AI agents for your needs.
        </p>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {useCases.map((useCase) => (
          <Card key={useCase.slug} className="hover:shadow-lg transition-shadow card-hover">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{useCase.icon}</div>
                <Badge variant="outline">{useCase.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{useCase.name}</CardTitle>
              <CardDescription className="text-base">
                {useCase.description.split('.')[0]}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick highlights */}
              <div className="space-y-2">
                {useCase.whyAiAgents.slice(0, 2).map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>

              {/* Recommended agents count */}
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>{useCase.recommendedAgentSlugs.length}</strong> recommended AI agents
                </p>
              </div>

              {/* CTA */}
              <Button asChild className="w-full" variant="default">
                <Link href={`/use-cases/${useCase.slug}`}>
                  Explore {useCase.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Not Sure Which AI Agent You Need?
        </h2>
        <p className="text-muted-foreground mb-6">
          Take our quick quiz to get personalized AI agent recommendations based on your specific needs.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/quiz">Take the Quiz</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/reviews">View All AI Agents</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
