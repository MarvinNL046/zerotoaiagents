// Static coupon data for AI agent deals
// This will be replaced with database queries once Neon is configured

export interface Coupon {
  id: string;
  agentSlug: string;
  code: string;
  discount: string; // e.g., "50% OFF" or "1 month free"
  description?: string;
  expiresAt?: Date;
  isVerified: boolean;
  clickCount: number;
  createdAt: Date;
}

export const coupons: Coupon[] = [
  {
    id: "cursor-zerotoaiagents",
    agentSlug: "cursor",
    code: "ZEROTOAIAGENTS",
    discount: "50% OFF",
    description: "Save 50% on first year of Cursor Pro",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "n8n-zero25",
    agentSlug: "n8n-ai",
    code: "ZERO25",
    discount: "25% OFF",
    description: "Get 25% off n8n Cloud annual plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "copilot-annual",
    agentSlug: "github-copilot",
    code: "COPILOT20",
    discount: "20% OFF",
    description: "Save 20% on GitHub Copilot Business annual plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "windsurf-promo",
    agentSlug: "windsurf",
    code: "WIND30",
    discount: "30% OFF",
    description: "30% off Windsurf Pro for the first 3 months",
    expiresAt: new Date("2026-06-30"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "relevance-ai-promo",
    agentSlug: "relevance-ai",
    code: "RELEVANCE50",
    discount: "50% OFF",
    description: "Half price on Relevance AI annual plan",
    expiresAt: new Date("2026-12-31"),
    isVerified: true,
    clickCount: 0,
    createdAt: new Date("2026-01-01"),
  },
];

export function getCouponsByAgentSlug(agentSlug: string): Coupon[] {
  return coupons
    .filter((coupon) => coupon.agentSlug === agentSlug)
    .filter((coupon) => !coupon.expiresAt || coupon.expiresAt > new Date())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getAllActiveCoupons(): Coupon[] {
  return coupons
    .filter((coupon) => !coupon.expiresAt || coupon.expiresAt > new Date())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getCouponById(id: string): Coupon | undefined {
  return coupons.find((coupon) => coupon.id === id);
}

export function hasActiveCoupon(agentSlug: string): boolean {
  return getCouponsByAgentSlug(agentSlug).length > 0;
}

export function getDaysUntilExpiry(expiresAt?: Date): number | null {
  if (!expiresAt) return null;
  const now = new Date();
  const diffTime = expiresAt.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
