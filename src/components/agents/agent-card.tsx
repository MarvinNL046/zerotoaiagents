"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./rating-stars";
import { Link } from "@/i18n/navigation";
import {
  Cpu,
  Zap,
  Sparkles,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { AiAgentProvider } from "@/lib/ai-agent-data";

interface AgentCardProps {
  agent: AiAgentProvider;
  rank?: number;
  locale: string;
}

export function AgentCard({ agent, rank }: AgentCardProps) {
  const t = useTranslations("agentCard");

  // Calculate price display
  const priceDisplay = agent.hasFreeTier && agent.monthlyPrice === 0
    ? "Free"
    : `$${agent.monthlyPrice}`;

  return (
    <div className="group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-slate-800">
      {/* Logo section */}
      <div className="relative h-24 w-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center p-4">
        <img
          src={`/screenshots/${agent.slug}-logo.webp`}
          alt={`${agent.name} logo`}
          className="max-h-14 max-w-[200px] object-contain"
          loading="lazy"
        />

        {/* Badges on top */}
        <div className="absolute top-3 left-3 flex gap-2">
          {rank && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              #{rank}
            </span>
          )}
          {agent.editorChoice && (
            <span className="bg-yellow-500 text-yellow-950 text-xs font-bold px-2 py-1 rounded-full">
              Editor&apos;s Choice
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 dark:bg-slate-800/90 text-xs px-2 py-1 rounded-full">
            {agent.category.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      {/* Card header */}
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">
              {agent.name}
            </h3>
            <RatingStars rating={agent.overallRating} size="md" />
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t("from")}</div>
            <div className="text-2xl font-bold text-orange-500">{priceDisplay}</div>
            {agent.monthlyPrice > 0 && (
              <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
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
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${(agent.easeOfUse / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">
                {Math.round((agent.easeOfUse / 5) * 100)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4" /> {t("performance")}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${(agent.performance / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">
                {Math.round((agent.performance / 5) * 100)}%
              </span>
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

      {/* Footer */}
      <div className="px-5 pb-5">
        <Link
          href={`/reviews/${agent.slug}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full transition-colors"
        >
          Read Review →
        </Link>
      </div>
    </div>
  );
}
