"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Monitor,
  Server,
  Globe,
  Check,
  Ticket,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { AiAgentData } from "@/lib/db/agent-service";
import { hasActiveCoupon } from "@/lib/coupon-data";
import { cn } from "@/lib/utils";

interface VpnCardProps {
  vpn: AiAgentData;
  rank?: number;
  locale: string;
}

export function VpnCard({ vpn, rank }: VpnCardProps) {
  const t = useTranslations("vpnCard");
  const hasCoupon = hasActiveCoupon(vpn.slug);
  const isTopRanked = rank === 1;

  return (
    <Card className={cn(
      "relative overflow-hidden card-hover",
      isTopRanked && "gradient-border"
    )}>
      {/* Screenshot Image */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        {vpn.cardImage ? (
          <Image
            src={vpn.cardImage}
            alt={`${vpn.name} website screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
            <Shield className="h-16 w-16 text-primary/30" />
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Badges - now positioned over image */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {rank && (
            <Badge variant="secondary" className="font-bold shadow-md">
              #{rank}
            </Badge>
          )}
          {vpn.editorChoice && (
            <Badge className="bg-yellow-500 text-yellow-950 shadow-md">
              {t("editorChoice")}
            </Badge>
          )}
          {hasCoupon && (
            <Badge className="bg-orange-500 text-white shadow-md">
              <Ticket className="h-3 w-3 mr-1" />
              {t("hasCoupon")}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{vpn.name}</h3>
            <RatingStars rating={vpn.overallRating} size="md" />
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t("from")}</div>
            <div className="text-3xl font-bold text-primary">
              ${vpn.annualPrice}
            </div>
            <div className="text-xs text-muted-foreground">{t("perMonth")}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm">{vpn.shortDescription}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Server className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{vpn.category}</div>
            <div className="text-xs text-muted-foreground">Category</div>
          </div>
          <div>
            <Globe className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">{vpn.maxUsers}</div>
            <div className="text-xs text-muted-foreground">Max Users</div>
          </div>
          <div>
            <Monitor className="h-5 w-5 mx-auto text-muted-foreground" />
            <div className="font-bold">
              {vpn.apiAccess ? "Yes" : "No"}
            </div>
            <div className="text-xs text-muted-foreground">API Access</div>
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Performance
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(vpn.performance / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{vpn.performance}/5</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Ease of Use
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(vpn.easeOfUse / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">{vpn.easeOfUse}/5</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {vpn.modelsSupported.slice(0, 3).map((model) => (
            <Badge key={model} variant="outline" className="text-xs">
              <Check className="h-3 w-3 mr-1" /> {model}
            </Badge>
          ))}
          {vpn.hasFreeTier && (
            <Badge variant="outline" className="text-xs bg-green-50">
              Free Tier
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <AffiliateButton
          agentId={vpn.id}
          agentName={vpn.name}
          affiliateUrl={vpn.affiliateUrl}
          className="flex-1"
        >
          {t("getVpn", { name: vpn.name })}
        </AffiliateButton>
        <Button variant="outline" asChild>
          <Link href={`/reviews/${vpn.slug}`}>{t("review")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
