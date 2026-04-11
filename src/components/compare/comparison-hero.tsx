import { Badge } from "@/components/ui/badge";
import { Trophy, Shield } from "lucide-react";
import type { AiAgentData } from "@/lib/agent-data-layer";

interface ComparisonHeroProps {
  agent1: AiAgentData;
  agent2: AiAgentData;
  overallWinner: "agent1" | "agent2" | "tie";
}

function renderQuickStat(label: string, value: string) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

function getPricingLabel(agent: AiAgentData) {
  return agent.annualPrice === 0 ? "Free" : `$${agent.annualPrice}/mo`;
}

function getBestForLabel(agent: AiAgentData) {
  if (agent.bestFor) {
    return agent.bestFor;
  }

  if (agent.subcategory) {
    return agent.subcategory;
  }

  return agent.category;
}

export function ComparisonHero({ agent1, agent2, overallWinner }: ComparisonHeroProps) {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              AI Agent Comparison 2026
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
            {agent1.name} vs {agent2.name}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Comprehensive comparison of features, pricing, performance, and capabilities to help you choose the best AI agent for your needs.
          </p>

          {/* Quick Stats Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Agent 1 Card */}
            <div className={`bg-card border-2 rounded-xl p-6 ${overallWinner === "agent1" ? "border-green-500" : "border-border"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{agent1.name}</h2>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Rating: {agent1.overallRating}/5
                    </span>
                  </div>
                </div>
                {overallWinner === "agent1" && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    Winner
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                {renderQuickStat("Best Price", getPricingLabel(agent1))}
                {renderQuickStat("Free Tier", agent1.hasFreeTier ? "Yes" : "No")}
                {renderQuickStat("Ease of Use", `${agent1.easeOfUse}/5`)}
                {renderQuickStat("Best For", getBestForLabel(agent1))}
              </div>
            </div>

            {/* Agent 2 Card */}
            <div className={`bg-card border-2 rounded-xl p-6 ${overallWinner === "agent2" ? "border-green-500" : "border-border"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{agent2.name}</h2>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Rating: {agent2.overallRating}/5
                    </span>
                  </div>
                </div>
                {overallWinner === "agent2" && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    Winner
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                {renderQuickStat("Best Price", getPricingLabel(agent2))}
                {renderQuickStat("Free Tier", agent2.hasFreeTier ? "Yes" : "No")}
                {renderQuickStat("Ease of Use", `${agent2.easeOfUse}/5`)}
                {renderQuickStat("Best For", getBestForLabel(agent2))}
              </div>
            </div>
          </div>

          {/* Overall Winner Message */}
          {overallWinner !== "tie" && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Based on our comprehensive testing, <span className="font-semibold text-foreground">{overallWinner === "agent1" ? agent1.name : agent2.name}</span> comes out ahead overall.
              </p>
            </div>
          )}
          {overallWinner === "tie" && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Both platforms are excellent choices with similar overall ratings. Your choice depends on your specific needs.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
