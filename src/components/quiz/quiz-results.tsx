"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { AiAgentProvider } from "@/lib/ai-agent-data";
import type { QuizAnswers } from "./quiz-wizard";
import { ArrowLeft, RefreshCw, ExternalLink, Star, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type QuizResultsProps = {
  answers: QuizAnswers;
  agents: AiAgentProvider[];
  onBack: () => void;
  onReset: () => void;
  locale?: string;
};

export function QuizResults({
  answers,
  agents,
  onBack,
  onReset,
}: QuizResultsProps) {
  const t = useTranslations("comparison");

  const scoredAgents = useMemo(() => {
    return agents
      .map((agent) => {
        let score = 0;
        let maxScore = 0;

        // Use case scoring (weight: 40)
        maxScore += 40;
        if (answers.useCase) {
          if (answers.useCase === "coding" && agent.category === "coding-agents") {
            score += 40;
          } else if (answers.useCase === "automation" && agent.category === "no-code-builders") {
            score += 40;
          } else if (answers.useCase === "support" && agent.category === "customer-support") {
            score += 40;
          } else if (answers.useCase === "research" && agent.category === "general-purpose") {
            score += 35;
          } else if (answers.useCase === "content" && agent.category === "general-purpose") {
            score += 35;
          } else if (answers.useCase === "general" && agent.category === "general-purpose") {
            score += 40;
          } else {
            score += 15; // Some credit for other categories
          }
        }

        // Budget scoring (weight: 25)
        maxScore += 25;
        if (answers.budget === "free" && agent.hasFreeTier) {
          score += 25;
        } else if (answers.budget === "low" && agent.monthlyPrice <= 20) {
          score += 25;
        } else if (answers.budget === "medium" && agent.monthlyPrice <= 50) {
          score += 25;
        } else if (answers.budget === "high" && agent.monthlyPrice <= 200) {
          score += 25;
        } else if (answers.budget === "unlimited") {
          score += 20; // Less price sensitive
        } else if (agent.hasFreeTier) {
          score += 10; // Partial credit for free tier
        } else {
          score += 5;
        }

        // Technical level scoring (weight: 20)
        maxScore += 20;
        if (answers.technicalLevel === "non-technical") {
          // Prefer high ease of use
          score += agent.easeOfUse * 4;
          if (agent.category === "no-code-builders") score += 5;
        } else if (answers.technicalLevel === "some") {
          score += agent.easeOfUse * 3.5;
        } else if (answers.technicalLevel === "developer") {
          score += 15;
          if (agent.category === "coding-agents" || agent.category === "frameworks") {
            score += 5;
          }
        } else if (answers.technicalLevel === "advanced") {
          score += 15;
          if (agent.category === "frameworks" || agent.category === "enterprise") {
            score += 5;
          }
        }

        // Free tier importance (weight: 10)
        maxScore += 10;
        if (answers.freeTier === "essential" && agent.hasFreeTier) {
          score += 10;
        } else if (answers.freeTier === "essential" && !agent.hasFreeTier) {
          score += 0; // No points
        } else if (answers.freeTier === "nice" && agent.hasFreeTier) {
          score += 7;
        } else if (answers.freeTier === "nice") {
          score += 4;
        } else {
          score += 5; // Not important
        }

        // Team size consideration (weight: 5)
        maxScore += 5;
        if (answers.teamSize === "solo") {
          score += 5;
        } else if (answers.teamSize === "small") {
          score += agent.maxUsers !== "1" ? 5 : 3;
        } else if (answers.teamSize === "medium" || answers.teamSize === "large") {
          if (agent.category === "enterprise" || agent.maxUsers === "Unlimited") {
            score += 5;
          } else {
            score += 2;
          }
        }

        // Calculate percentage match
        const matchPercentage = Math.round((score / maxScore) * 100);

        return {
          ...agent,
          matchScore: score,
          matchPercentage,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3); // Top 3 matches
  }, [answers, agents]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="px-4 py-1">
          Your Results
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold">Your Top AI Agent Matches</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your answers, we recommend these AI agents for your needs
        </p>
      </div>

      {/* Results Cards */}
      <div className="grid gap-6">
        {scoredAgents.map((agent, index) => {
          const priceDisplay = agent.monthlyPrice === 0
            ? "Free"
            : `$${agent.monthlyPrice.toFixed(2)}`;

          return (
            <Card key={agent.id} className="p-6 md:p-8 relative overflow-hidden">
              {/* Rank Badge */}
              {index === 0 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Best Match
                  </Badge>
                </div>
              )}

              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                {/* Agent Logo */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative w-48 h-24 bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                    <Image
                      src={agent.logo}
                      alt={`${agent.name} logo`}
                      width={160}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {agent.overallRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
                    {agent.editorChoice && (
                      <Badge variant="secondary" className="mb-2">
                        {t("editorChoice")}
                      </Badge>
                    )}
                  </div>

                  {/* Match Percentage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Match Score
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {agent.matchPercentage}%
                      </span>
                    </div>
                    <Progress value={agent.matchPercentage} className="h-2" />
                  </div>

                  {/* Short Description */}
                  <p className="text-muted-foreground">{agent.shortDescription}</p>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {agent.hasFreeTier && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Free tier available</span>
                      </div>
                    )}
                    {agent.apiAccess && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>API access</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{agent.modelsSupported.length} AI models</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{agent.integrations.length}+ integrations</span>
                    </div>
                  </div>

                  {/* Pricing and CTAs */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          {priceDisplay}
                        </span>
                        {agent.monthlyPrice > 0 && (
                          <span className="text-muted-foreground">/month</span>
                        )}
                      </div>
                      {agent.hasFreeTier && agent.monthlyPrice > 0 && (
                        <Badge variant="secondary" className="mt-1">
                          Free tier available
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button asChild size="lg" className="w-full sm:w-auto">
                        <a
                          href={agent.affiliateUrl}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                        >
                          {t("visitSite")}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <Link href={`/reviews/${agent.slug}`}>
                          {t("readReview")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Modify Answers
        </Button>
        <Button variant="outline" onClick={onReset} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
