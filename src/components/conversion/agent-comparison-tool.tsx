"use client";

import { useState, useMemo } from "react";
import { X, Plus, Check, Minus, Crown, Shield, Zap, Code, Star, Users } from "lucide-react";
import { AgentLogo } from "@/components/ui/agent-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { RatingStars } from "@/components/agents/rating-stars";
import { useTranslations } from "next-intl";
import type { AiAgentData } from "@/lib/agent-data-layer";

interface AgentComparisonToolProps {
  agents: AiAgentData[];
  maxCompare?: number;
}

interface ComparisonRowProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  valueKey: keyof AiAgentData;
  format?: "number" | "boolean" | "price" | "array" | "percentage" | "rating";
  betterIs?: "highest" | "lowest";
  selectedAgents: AiAgentData[];
  maxCompare: number;
  isWinner: (agent: AiAgentData, key: keyof AiAgentData, type: "highest" | "lowest") => boolean;
}

function ComparisonRow({
  label,
  icon: Icon,
  valueKey,
  format = "number",
  betterIs = "highest",
  selectedAgents,
  maxCompare,
  isWinner,
}: ComparisonRowProps) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-3 px-4 font-medium text-sm flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label}
      </td>
      {selectedAgents.map(agent => {
        const value = agent[valueKey];
        const winner = isWinner(agent, valueKey, betterIs);

        let displayValue: React.ReactNode;
        if (format === "boolean") {
          displayValue = value ? (
            <Check className="h-5 w-5 text-green-500 mx-auto" />
          ) : (
            <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
          );
        } else if (format === "price") {
          displayValue = `$${typeof value === "number" ? value.toFixed(2) : value}`;
        } else if (format === "array") {
          const arr = Array.isArray(value) ? value : [];
          displayValue = arr.length > 3 ? `${arr.slice(0, 3).join(", ")}... (+${arr.length - 3})` : arr.join(", ");
        } else if (format === "rating") {
          displayValue = (
            <div className="flex items-center gap-2 justify-center">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${winner ? "bg-primary" : "bg-muted-foreground/50"}`}
                  style={{ width: `${typeof value === "number" ? (value / 5) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm">{typeof value === "number" ? value : 0}/5</span>
            </div>
          );
        } else {
          displayValue = typeof value === "number" ? value.toLocaleString() : String(value ?? "");
        }

        return (
          <td
            key={agent.id}
            className={`py-3 px-4 text-center ${winner && selectedAgents.length > 1 ? "bg-primary/5 font-semibold" : ""}`}
          >
            {displayValue}
            {winner && selectedAgents.length > 1 && format !== "boolean" && (
              <Crown className="h-3 w-3 text-yellow-500 inline ml-1" />
            )}
          </td>
        );
      })}
      {selectedAgents.length < maxCompare && <td className="py-3 px-4" />}
    </tr>
  );
}

export function AgentComparisonTool({ agents, maxCompare = 4 }: AgentComparisonToolProps) {
  const t = useTranslations("comparisonTool");
  const [selectedAgents, setSelectedAgents] = useState<AiAgentData[]>([]);
  const [isSelectingAgent, setIsSelectingAgent] = useState(false);

  const availableAgents = useMemo(() => {
    return agents.filter(agent => !selectedAgents.some(s => s.id === agent.id));
  }, [agents, selectedAgents]);

  const addAgent = (agent: AiAgentData) => {
    if (selectedAgents.length < maxCompare) {
      setSelectedAgents([...selectedAgents, agent]);
      setIsSelectingAgent(false);
    }
  };

  const removeAgent = (agentId: string) => {
    setSelectedAgents(selectedAgents.filter(a => a.id !== agentId));
  };

  const getBestValue = (key: keyof AiAgentData, type: "highest" | "lowest" = "highest"): number | null => {
    if (selectedAgents.length < 2) return null;
    const values = selectedAgents
      .map(agent => {
        const value = agent[key];
        return typeof value === 'number' ? value : null;
      })
      .filter((v): v is number => v !== null);

    if (values.length === 0) return null;
    return type === "highest" ? Math.max(...values) : Math.min(...values);
  };

  const isWinner = (agent: AiAgentData, key: keyof AiAgentData, type: "highest" | "lowest" = "highest"): boolean => {
    const best = getBestValue(key, type);
    const value = agent[key];
    return best !== null && typeof value === 'number' && value === best;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("title")}</h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          {selectedAgents.length > 0 && (
            <Badge variant="secondary">
              {selectedAgents.length}/{maxCompare} {t("selected")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Agent selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b bg-muted/30">
          {selectedAgents.map(agent => (
            <div
              key={agent.id}
              className="relative bg-background rounded-lg border p-4 text-center"
            >
              <button
                onClick={() => removeAgent(agent.id)}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
                aria-label={t("remove")}
              >
                <X className="h-4 w-4" />
              </button>
              <AgentLogo name={agent.name} size="md" className="mx-auto" />
              <p className="mt-2 font-semibold text-sm">{agent.name}</p>
              <RatingStars rating={agent.overallRating} size="sm" />
            </div>
          ))}

          {selectedAgents.length < maxCompare && (
            <div className="relative">
              {isSelectingAgent ? (
                <div className="bg-background rounded-lg border p-2 max-h-48 overflow-y-auto">
                  <div className="space-y-1">
                    {availableAgents.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => addAgent(agent)}
                        className="w-full text-left p-2 rounded hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <AgentLogo name={agent.name} size="sm" />
                        <span className="text-sm">{agent.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSelectingAgent(true)}
                  className="w-full h-full min-h-24 bg-background rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Plus className="h-8 w-8" />
                  <span className="text-sm font-medium">{t("addVpn")}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Comparison table */}
        {selectedAgents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">{t("feature")}</th>
                  {selectedAgents.map(agent => (
                    <th key={agent.id} className="py-3 px-4 text-center font-semibold">
                      {agent.name}
                    </th>
                  ))}
                  {selectedAgents.length < maxCompare && <th className="py-3 px-4" />}
                </tr>
              </thead>
              <tbody>
                {/* Pricing */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedAgents.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("pricing")}
                  </td>
                </tr>
                <ComparisonRow label={t("monthlyPrice")} valueKey="monthlyPrice" format="price" betterIs="lowest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("yearlyPrice")} valueKey="annualPrice" format="price" betterIs="lowest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("freeTier")} valueKey="hasFreeTier" format="boolean" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />

                {/* Ratings */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedAgents.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("performance")}
                  </td>
                </tr>
                <ComparisonRow label={t("overallRating")} icon={Star} valueKey="overallRating" format="rating" betterIs="highest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("easeOfUse")} icon={Users} valueKey="easeOfUse" format="rating" betterIs="highest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("performanceLabel")} icon={Zap} valueKey="performance" format="rating" betterIs="highest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("valueForMoney")} icon={Shield} valueKey="valueForMoney" format="rating" betterIs="highest" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />

                {/* Features */}
                <tr className="bg-muted/30">
                  <td colSpan={selectedAgents.length + 2} className="py-2 px-4 font-bold text-sm text-muted-foreground">
                    {t("features")}
                  </td>
                </tr>
                <ComparisonRow label={t("category")} valueKey="category" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("maxUsers")} icon={Users} valueKey="maxUsers" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("apiAccess")} icon={Code} valueKey="apiAccess" format="boolean" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("modelsSupported")} valueKey="modelsSupported" format="array" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />
                <ComparisonRow label={t("integrationsLabel")} valueKey="integrations" format="array" selectedAgents={selectedAgents} maxCompare={maxCompare} isWinner={isWinner} />

                {/* CTA Row */}
                <tr className="border-t-2">
                  <td className="py-4 px-4 font-semibold">{t("getStarted")}</td>
                  {selectedAgents.map(agent => (
                    <td key={agent.id} className="py-4 px-4 text-center">
                      <AffiliateButton
                        agentId={agent.id}
                        agentName={agent.name}
                        affiliateUrl={agent.affiliateUrl}
                        size="sm"
                        className="w-full"
                      >
                        {t("visitSite")}
                      </AffiliateButton>
                    </td>
                  ))}
                  {selectedAgents.length < maxCompare && <td className="py-4 px-4" />}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("noVpnsSelected")}</h3>
            <p className="text-muted-foreground mb-4">{t("selectToCompare")}</p>
            <Button onClick={() => setIsSelectingAgent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("addFirstVpn")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
