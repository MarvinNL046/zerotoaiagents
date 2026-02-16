"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { Link } from "@/i18n/navigation";
import { Check, X, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AiAgentProvider } from "@/lib/ai-agent-data";

interface ComparisonTableProps {
  agents: AiAgentProvider[];
}

export function ComparisonTable({ agents }: ComparisonTableProps) {
  const t = useTranslations("agentTable");

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">{t("headers.rank")}</TableHead>
            <TableHead>{t("headers.agent")}</TableHead>
            <TableHead>{t("headers.rating")}</TableHead>
            <TableHead className="text-center">{t("headers.easeOfUse")}</TableHead>
            <TableHead className="text-center">{t("headers.performance")}</TableHead>
            <TableHead className="text-center">{t("headers.freeTier")}</TableHead>
            <TableHead className="text-right">{t("headers.price")}</TableHead>
            <TableHead className="text-right">{t("headers.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent, index) => (
            <TableRow key={agent.id} className="hover:bg-muted/50">
              <TableCell className="font-bold text-lg">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <Link
                      href={`/reviews/${agent.slug}`}
                      className="font-semibold hover:text-primary flex items-center gap-2"
                    >
                      {agent.name}
                      {agent.editorChoice && (
                        <Badge className="bg-yellow-500 text-yellow-950 text-xs">
                          {t("editorChoice")}
                        </Badge>
                      )}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {agent.category} • {agent.modelsSupported.length} {t("models")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RatingStars rating={agent.overallRating} size="sm" />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(agent.easeOfUse / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{agent.easeOfUse.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(agent.performance / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{agent.performance.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {agent.hasFreeTier ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="font-bold text-primary">
                  {agent.hasFreeTier && agent.monthlyPrice === 0
                    ? t("free")
                    : `$${agent.monthlyPrice}`}
                </div>
                {agent.monthlyPrice > 0 && (
                  <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <AffiliateButton
                  agentId={agent.id}
                  agentName={agent.name}
                  affiliateUrl={agent.affiliateUrl}
                  size="sm"
                >
                  {t("visit")} <ExternalLink className="h-3 w-3 ml-1" />
                </AffiliateButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
