"use client";

import { useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import { aiAgentProviders, type AgentCategory } from "@/lib/ai-agent-data";

interface ReviewsPageClientProps {
  agents: typeof aiAgentProviders;
  locale: string;
}

export function ReviewsPageClient({ agents, locale }: ReviewsPageClientProps) {
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
    <div>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="container relative text-center">
          <h1 className="text-4xl font-bold text-white mb-4">AI Agent Reviews 2026</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Expert reviews of 26 AI agents across coding, automation, and enterprise categories
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Orange pill category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  : "border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full text-sm font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors"
              }
            >
              {cat === "all"
                ? "All"
                : cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground text-center">
          Showing {filteredAgents.length} agent{filteredAgents.length !== 1 ? "s" : ""}
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
