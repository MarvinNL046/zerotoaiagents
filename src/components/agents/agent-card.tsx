"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { Link } from "@/i18n/navigation";
import {
  Cpu,
  Zap,
  Check,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { AiAgentProvider } from "@/lib/ai-agent-data";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: AiAgentProvider;
  rank?: number;
  locale: string;
}

export function AgentCard({ agent, rank }: AgentCardProps) {
  const t = useTranslations("agentCard");
  const isTopRanked = rank === 1;

  // Calculate price display
  const priceDisplay = agent.hasFreeTier && agent.monthlyPrice === 0
    ? "Free"
    : `$${agent.monthlyPrice}`;

  return (
    <Card className={cn(
      "relative overflow-hidden card-hover",
      isTopRanked && "gradient-border"
    )}>
      {/* Category Badge over card */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
          <Cpu className="h-16 w-16 text-primary/30" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Badges - positioned over image */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {rank && (
            <Badge variant="secondary" className="font-bold shadow-md">
              #{rank}
            </Badge>
          )}
          {agent.editorChoice && (
            <Badge className="bg-yellow-500 text-yellow-950 shadow-md">
              {t("editorChoice")}
            </Badge>
          )}
        </div>

        {/* Category badge in top right */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="outline" className="bg-background/90 shadow-md">
            {agent.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{agent.name}</h3>
            <RatingStars rating={agent.overallRating} size="md" />
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t("from")}</div>
            <div className="text-3xl font-bold text-primary">
              {priceDisplay}
            </div>
            {agent.monthlyPrice > 0 && (
              <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm">{agent.shortDescription}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Cpu className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{agent.modelsSupported.length}</div>
            <div className="text-xs text-muted-foreground">{t("models")}</div>
          </div>
          <div>
            <Zap className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{agent.integrations.length}</div>
            <div className="text-xs text-muted-foreground">{t("integrations")}</div>
          </div>
          <div>
            <Sparkles className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">
              {agent.hasFreeTier ? t("free") : priceDisplay}
            </div>
            <div className="text-xs text-muted-foreground">{t("tier")}</div>
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> {t("easeOfUse")}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(agent.easeOfUse / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{Math.round((agent.easeOfUse / 5) * 100)}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4" /> {t("performance")}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(agent.performance / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{Math.round((agent.performance / 5) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {agent.hasFreeTier && (
            <Badge variant="outline" className="text-xs bg-green-50">
              <Check className="h-3 w-3 mr-1" /> {t("freeTier")}
            </Badge>
          )}
          {agent.apiAccess && (
            <Badge variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> {t("apiAccess")}
            </Badge>
          )}
          {agent.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <AffiliateButton
          agentId={agent.id}
          agentName={agent.name}
          affiliateUrl={agent.affiliateUrl}
          className="flex-1"
        >
          {t("tryAgent", { name: agent.name })}
        </AffiliateButton>
        <Button variant="outline" asChild>
          <Link href={`/reviews/${agent.slug}`}>{t("review")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
