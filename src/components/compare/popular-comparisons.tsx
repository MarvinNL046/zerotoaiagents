import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";

interface PopularComparison {
  title: string;
  href: string;
  badge?: string;
}

interface PopularComparisonsProps {
  translations: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

const popularComparisons: PopularComparison[] = [
  {
    title: "Cursor vs GitHub Copilot",
    href: "/compare/cursor-vs-github-copilot",
    badge: "Most Popular",
  },
  {
    title: "Claude Code vs Cursor",
    href: "/compare/claude-code-vs-cursor",
    badge: "Editor vs Terminal",
  },
  {
    title: "GitHub Copilot vs Windsurf",
    href: "/compare/github-copilot-vs-windsurf",
    badge: "IDE Showdown",
  },
  {
    title: "Cursor vs Devin",
    href: "/compare/cursor-vs-devin",
    badge: "Hands-on vs Autonomous",
  },
  {
    title: "CrewAI vs AutoGen vs LangGraph",
    href: "/compare/crewai-vs-autogen-vs-langgraph",
    badge: "Multi-Agent Frameworks",
  },
  {
    title: "Cursor vs Windsurf vs Copilot",
    href: "/compare/cursor-vs-windsurf-vs-github-copilot",
    badge: "3-Way Comparison",
  },
];

export function PopularComparisons({ translations }: PopularComparisonsProps) {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Badge variant="secondary">{translations.badge}</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">{translations.title}</h2>
            <p className="text-muted-foreground">
              {translations.subtitle}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularComparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    {comparison.badge && (
                      <Badge className="mb-3 text-xs">{comparison.badge}</Badge>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                        <div className="font-bold text-lg leading-snug">
                          {comparison.title}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
