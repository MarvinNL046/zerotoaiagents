"use client";

import { useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import { aiAgentProviders, type AgentCategory, getCategoryDisplayName } from "@/lib/ai-agent-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

interface ReviewsPageClientProps {
  agents: typeof aiAgentProviders;
  locale: string;
}

export function ReviewsPageClient({ agents, locale }: ReviewsPageClientProps) {
  const t = useTranslations("comparison");
  const tAgent = useTranslations("agentReview");
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | "all">("all");

  const categories: Array<AgentCategory | "all"> = [
    "all",
    "coding-agents",
    "no-code-builders",
    "frameworks",
    "enterprise",
    "customer-support",
    "general-purpose",
  ];

  const filteredAgents = selectedCategory === "all"
    ? agents
    : agents.filter((agent) => agent.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{tAgent("title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {tAgent("subtitle")}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as AgentCategory | "all")}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
                  {category === "all" ? tAgent("allCategories") : getCategoryDisplayName(category as AgentCategory)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {tAgent("showingResults", { count: filteredAgents.length })}
        </div>

        {/* AI Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} rank={index + 1} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
