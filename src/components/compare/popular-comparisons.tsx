import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";

interface PopularComparison {
  agent1: string;
  agent2: string;
  slug1: string;
  slug2: string;
  badge?: string;
}

const popularComparisons: PopularComparison[] = [
  {
    agent1: "Cursor",
    agent2: "GitHub Copilot",
    slug1: "cursor",
    slug2: "github-copilot",
    badge: "Most Popular",
  },
  {
    agent1: "ChatGPT",
    agent2: "Claude",
    slug1: "chatgpt",
    slug2: "claude",
    badge: "AI Assistant Showdown",
  },
  {
    agent1: "Claude Code",
    agent2: "Cursor",
    slug1: "claude-code",
    slug2: "cursor",
    badge: "Coding Powerhouses",
  },
  {
    agent1: "n8n AI",
    agent2: "Flowise",
    slug1: "n8n-ai",
    slug2: "flowise",
    badge: "Open Source",
  },
  {
    agent1: "CrewAI",
    agent2: "AutoGen",
    slug1: "crewai",
    slug2: "autogen",
    badge: "Multi-Agent Frameworks",
  },
  {
    agent1: "Intercom Fin",
    agent2: "Zendesk AI",
    slug1: "intercom-fin",
    slug2: "zendesk-ai",
    badge: "Customer Support",
  },
];

export function PopularComparisons() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Popular Comparisons</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">Compare Top AI Agents</h2>
            <p className="text-muted-foreground">
              See how the most popular AI agent platforms stack up against each other
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularComparisons.map((comparison) => (
              <Link
                key={`${comparison.slug1}-${comparison.slug2}`}
                href={`/compare/${comparison.slug1}-vs-${comparison.slug2}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    {comparison.badge && (
                      <Badge className="mb-3 text-xs">{comparison.badge}</Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">
                          {comparison.agent1}
                        </div>
                        <div className="text-xs text-muted-foreground">vs</div>
                        <div className="font-bold text-lg mt-1">
                          {comparison.agent2}
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
