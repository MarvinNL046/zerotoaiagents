import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/agents/affiliate-button";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import {
  Tag,
  Clock,
  CheckCircle,
  Gift,
  Sparkles,
  Shield,
  Zap,
  Info,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotoaiagents.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "AI Agent Deals & Coupons 2026: Save Up to 50% | ZeroToAIAgents",
    nl: "AI Agent Deals & Kortingscodes 2026: Bespaar tot 50% | ZeroToAIAgents",
    de: "KI-Agent-Angebote & Gutscheine 2026: Sparen Sie bis zu 50% | ZeroToAIAgents",
    es: "Ofertas y Cupones de Agentes IA 2026: Ahorra hasta 50% | ZeroToAIAgents",
    fr: "Offres Agents IA & Coupons 2026: Économisez jusqu'à 50% | ZeroToAIAgents",
    zh: "AI代理优惠与折扣码2026：节省高达50% | ZeroToAIAgents",
    ja: "AIエージェントセール＆クーポン2026：最大50％オフ | ZeroToAIAgents",
    ko: "AI 에이전트 할인 및 쿠폰 2026: 최대 50% 절약 | ZeroToAIAgents",
    th: "ดีล AI Agent และคูปอง 2026: ประหยัดสูงสุด 50% | ZeroToAIAgents",
  };

  const descriptions: Record<string, string> = {
    en: "Exclusive AI agent deals and coupons for 2026. Save up to 50% on premium AI automation platforms. Limited-time offers with free trials.",
    nl: "Exclusieve AI agent-deals en kortingscodes voor 2026. Bespaar tot 50% op premium AI-automatiseringsplatforms. Tijdelijke aanbiedingen met gratis proefversies.",
    de: "Exklusive KI-Agent-Angebote und Gutscheine für 2026. Sparen Sie bis zu 50% bei Premium-KI-Automatisierungsplattformen. Zeitlich begrenzte Angebote mit kostenlosen Testversionen.",
    es: "Ofertas y cupones de agentes IA exclusivos para 2026. Ahorra hasta 50% en plataformas de automatización IA premium. Ofertas limitadas con pruebas gratuitas.",
    fr: "Offres exclusives d'agents IA et coupons pour 2026. Économisez jusqu'à 50% sur les plateformes d'automatisation IA premium. Offres limitées avec essais gratuits.",
    zh: "2026年独家AI代理优惠和折扣码。高级AI自动化平台节省高达50%。限时优惠，支持免费试用。",
    ja: "2026年限定AIエージェントセールとクーポン。プレミアムAI自動化プラットフォームが最大50％オフ。無料トライアル付きの期間限定オファー。",
    ko: "2026년 독점 AI 에이전트 할인 및 쿠폰. 프리미엄 AI 자동화 플랫폼에서 최대 50% 절약. 무료 체험이 있는 기간 한정 혜택.",
    th: "ดีล AI Agent และคูปองพิเศษสำหรับปี 2026 ประหยัดสูงสุด 50% สำหรับแพลตฟอร์มอัตโนมัติ AI พรีเมียม ข้อเสนอจำกัดเวลาพร้อมทดลองใช้ฟรี",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
  };
}

// Structured Data
function DealsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    name: "AI Agent Deals & Discounts 2026",
    description: "Exclusive AI agent platform deals and discounts with savings up to 50%",
    datePosted: "2026-11-29",
    expires: "2026-12-31",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const deals = [
  {
    name: "Cursor Pro",
    badgeKey: "bestDeal" as const,
    badgeColor: "bg-green-500",
    originalPrice: 20,
    dealPrice: 10,
    discount: 50,
    months: 12,
    total: 120,
    features: ["AI code completion", "GPT-4 & Claude models", "Unlimited usage"],
    coupon: null,
    affiliateUrl: "https://go.zerotoaiagents.com/cursor",
    expiresAt: new Date("2026-12-31T23:59:59"),
  },
  {
    name: "Claude Pro",
    badgeKey: "mostPopular" as const,
    badgeColor: "bg-blue-500",
    originalPrice: 20,
    dealPrice: 18,
    discount: 10,
    months: 12,
    total: 216,
    features: ["Extended usage limits", "Priority access", "Claude 3.5 Sonnet & Opus"],
    coupon: null,
    affiliateUrl: "https://go.zerotoaiagents.com/claude",
    expiresAt: new Date("2026-12-31T23:59:59"),
  },
  {
    name: "GitHub Copilot",
    badgeKey: "premiumChoice" as const,
    badgeColor: "bg-purple-500",
    originalPrice: 19,
    dealPrice: 10,
    discount: 47,
    months: 12,
    total: 120,
    features: ["AI pair programming", "Multi-IDE support", "Code suggestions"],
    coupon: null,
    affiliateUrl: "https://go.zerotoaiagents.com/github-copilot",
    expiresAt: new Date("2026-12-31T23:59:59"),
  },
  {
    name: "n8n Cloud",
    badgeKey: "bestValue" as const,
    badgeColor: "bg-orange-500",
    originalPrice: 24,
    dealPrice: 20,
    discount: 17,
    months: 12,
    total: 240,
    features: ["AI workflow automation", "500+ integrations", "Self-host option"],
    coupon: null,
    affiliateUrl: "https://go.zerotoaiagents.com/n8n-ai",
    expiresAt: new Date("2026-12-31T23:59:59"),
  },
];

export default async function DealsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content: Record<
    string,
    {
      hero: {
        title: string;
        subtitle: string;
        urgency: string;
        timerLabel: string;
      };
      deals: {
        perMonth: string;
        wasPrice: string;
        totalCost: string;
        savePercent: string;
        extraMonths: string;
        months: string;
        getDeal: string;
        copyCoupon: string;
        copied: string;
        expiresLabel: string;
        expiresSoon: string;
      };
      badges: {
        bestDeal: string;
        mostPopular: string;
        premiumChoice: string;
        bestValue: string;
      };
      features: {
        title: string;
      };
      tips: {
        title: string;
        items: Array<{ title: string; description: string }>;
      };
      guarantee: {
        title: string;
        description: string;
      };
      faq: {
        title: string;
        items: Array<{ question: string; answer: string }>;
      };
    }
  > = {
    en: {
      hero: {
        title: "AI Agent Deals & Discounts 2026",
        subtitle:
          "Exclusive discounts on premium AI agent platforms. Save up to 50% with our verified deals.",
        urgency: "Limited-time offers - Don't miss out!",
        timerLabel: "Deals End In",
      },
      deals: {
        perMonth: "/month",
        wasPrice: "Was",
        totalCost: "Total cost",
        savePercent: "SAVE",
        extraMonths: "months free",
        months: "months",
        getDeal: "Get This Deal",
        copyCoupon: "Copy Coupon Code",
        copied: "Copied!",
        expiresLabel: "Deal expires",
        expiresSoon: "Soon",
      },
      badges: {
        bestDeal: "Best Deal",
        mostPopular: "Most Popular",
        premiumChoice: "Premium Choice",
        bestValue: "Best Value",
      },
      features: {
        title: "Included Features",
      },
      tips: {
        title: "Smart Deal Shopping Tips",
        items: [
          {
            title: "Check Renewal Prices",
            description:
              "Always check what you'll pay after the promotional period ends. Many AI platforms increase prices after year 1.",
          },
          {
            title: "Free Tier First",
            description:
              "Most AI agents offer free tiers. Test them before committing to a paid plan to make sure it fits your needs.",
          },
          {
            title: "Money-Back Guarantee",
            description:
              "Many platforms offer trial periods or money-back guarantees. Test the service risk-free before committing.",
          },
          {
            title: "Annual vs Monthly",
            description:
              "Annual plans typically offer 15-30% savings over monthly billing. Choose annual if you're committed.",
          },
        ],
      },
      guarantee: {
        title: "Risk-Free with Free Trials & Guarantees",
        description:
          "Most AI agent platforms offer free tiers or trial periods. Try the service risk-free and upgrade only if you're satisfied.",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Do these deals expire?",
            answer:
              "Yes, AI agent deals change frequently. We update this page regularly with the latest offers.",
          },
          {
            question: "Are coupon codes required?",
            answer:
              "Most deals are automatically applied through our links. When a coupon code is required, we display it prominently.",
          },
          {
            question: "What happens after the promotional period?",
            answer:
              "After your initial subscription period ends, you'll be charged the standard renewal price unless you cancel.",
          },
          {
            question: "Can I get a refund if I don't like the AI agent?",
            answer:
              "Most AI platforms offer free tiers, trial periods, or money-back guarantees. Check the specific platform's refund policy.",
          },
        ],
      },
    },
    nl: {
      hero: {
        title: "AI Agent Deals & Kortingen 2026",
        subtitle:
          "Exclusieve kortingen op premium AI agent-platforms. Bespaar tot 50% met onze geverifieerde deals.",
        urgency: "Tijdelijke aanbiedingen - Mis het niet!",
        timerLabel: "Deals Eindigen In",
      },
      deals: {
        perMonth: "/maand",
        wasPrice: "Was",
        totalCost: "Totale kosten",
        savePercent: "BESPAAR",
        extraMonths: "maanden gratis",
        months: "maanden",
        getDeal: "Pak Deze Deal",
        copyCoupon: "Kopieer Kortingscode",
        copied: "Gekopieerd!",
        expiresLabel: "Deal verloopt",
        expiresSoon: "Binnenkort",
      },
      badges: {
        bestDeal: "Beste Deal",
        mostPopular: "Meest Populair",
        premiumChoice: "Premium Keuze",
        bestValue: "Beste Waarde",
      },
      features: {
        title: "Inbegrepen Functies",
      },
      tips: {
        title: "Slimme Deal Shopping Tips",
        items: [
          {
            title: "Controleer Verlengingsprijzen",
            description:
              "Controleer altijd wat u betaalt nadat de promotieperiode afloopt. Veel AI-platforms verhogen de prijzen na jaar 1.",
          },
          {
            title: "Gratis Tier Eerst",
            description:
              "De meeste AI agents bieden gratis tiers. Test ze voordat u zich committeert aan een betaald plan om er zeker van te zijn dat het past bij uw behoeften.",
          },
          {
            title: "Geld-Terug-Garantie",
            description:
              "Veel platforms bieden proefperiodes of geld-terug-garanties. Test de dienst risicovrij voordat u zich committeert.",
          },
          {
            title: "Jaarlijks vs Maandelijks",
            description:
              "Jaarplannen bieden doorgaans 15-30% besparing ten opzichte van maandelijkse facturering. Kies jaarlijks als u toegewijd bent.",
          },
        ],
      },
      guarantee: {
        title: "Risicovrij met Gratis Proefversies & Garanties",
        description:
          "De meeste AI agent-platforms bieden gratis tiers of proefperiodes. Probeer de dienst risicovrij en upgrade alleen als u tevreden bent.",
      },
      faq: {
        title: "Veelgestelde Vragen",
        items: [
          {
            question: "Verlopen deze deals?",
            answer:
              "Ja, AI agent-deals veranderen regelmatig. We werken deze pagina regelmatig bij met de nieuwste aanbiedingen.",
          },
          {
            question: "Zijn kortingscodes vereist?",
            answer:
              "De meeste deals worden automatisch toegepast via onze links. Wanneer een kortingscode vereist is, tonen we deze prominent.",
          },
          {
            question: "Wat gebeurt er na de promotieperiode?",
            answer:
              "Nadat uw initiële abonnementsperiode afloopt, wordt u de standaard verlengingsprijs in rekening gebracht tenzij u annuleert.",
          },
          {
            question: "Kan ik mijn geld terugkrijgen als ik de AI agent niet leuk vind?",
            answer:
              "De meeste AI-platforms bieden gratis tiers, proefperiodes of geld-terug-garanties. Controleer het specifieke terugbetalingsbeleid van het platform.",
          },
        ],
      },
    },
    de: {
      hero: {
        title: "KI-Agent-Angebote & Rabatte 2026",
        subtitle:
          "Exklusive Rabatte auf Premium-KI-Agent-Plattformen. Sparen Sie bis zu 50% mit unseren verifizierten Angeboten.",
        urgency: "Zeitlich begrenzte Angebote - Verpassen Sie es nicht!",
        timerLabel: "Angebote Enden In",
      },
      deals: {
        perMonth: "/Monat",
        wasPrice: "War",
        totalCost: "Gesamtkosten",
        savePercent: "SPAREN",
        extraMonths: "Monate gratis",
        months: "Monate",
        getDeal: "Dieses Angebot holen",
        copyCoupon: "Gutscheincode kopieren",
        copied: "Kopiert!",
        expiresLabel: "Angebot läuft ab",
        expiresSoon: "Bald",
      },
      badges: {
        bestDeal: "Bestes Angebot",
        mostPopular: "Am Beliebtesten",
        premiumChoice: "Premium-Wahl",
        bestValue: "Bester Wert",
      },
      features: {
        title: "Enthaltene Funktionen",
      },
      tips: {
        title: "Intelligente Deal-Shopping-Tipps",
        items: [
          {
            title: "Verlängerungspreise prüfen",
            description:
              "Überprüfen Sie immer, was Sie nach Ablauf der Aktionsperiode zahlen. Viele KI-Plattformen erhöhen die Preise nach dem ersten Jahr.",
          },
          {
            title: "Kostenlose Stufe zuerst",
            description:
              "Die meisten KI-Agenten bieten kostenlose Stufen. Testen Sie sie, bevor Sie sich auf einen kostenpflichtigen Plan festlegen, um sicherzustellen, dass er Ihren Anforderungen entspricht.",
          },
          {
            title: "Geld-zurück-Garantie",
            description:
              "Viele Plattformen bieten Testzeiträume oder Geld-zurück-Garantien. Testen Sie den Service risikofrei, bevor Sie sich verpflichten.",
          },
          {
            title: "Jährlich vs. Monatlich",
            description:
              "Jahrespläne bieten in der Regel 15-30% Einsparungen gegenüber monatlicher Abrechnung. Wählen Sie jährlich, wenn Sie sich verpflichten.",
          },
        ],
      },
      guarantee: {
        title: "Risikofrei mit kostenlosen Testversionen & Garantien",
        description:
          "Die meisten KI-Agent-Plattformen bieten kostenlose Stufen oder Testzeiträume. Testen Sie den Service risikofrei und upgraden Sie nur, wenn Sie zufrieden sind.",
      },
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          {
            question: "Laufen diese Angebote ab?",
            answer:
              "Ja, KI-Agent-Angebote ändern sich häufig. Wir aktualisieren diese Seite regelmäßig mit den neuesten Angeboten.",
          },
          {
            question: "Sind Gutscheincodes erforderlich?",
            answer:
              "Die meisten Angebote werden automatisch über unsere Links angewendet. Wenn ein Gutscheincode erforderlich ist, zeigen wir ihn prominent an.",
          },
          {
            question: "Was passiert nach der Aktionsperiode?",
            answer:
              "Nach Ablauf Ihrer anfänglichen Abonnementperiode wird Ihnen der Standardverlängerungspreis berechnet, es sei denn, Sie kündigen.",
          },
          {
            question: "Kann ich eine Rückerstattung erhalten, wenn mir der KI-Agent nicht gefällt?",
            answer:
              "Die meisten KI-Plattformen bieten kostenlose Stufen, Testzeiträume oder Geld-zurück-Garantien. Überprüfen Sie die spezifische Rückerstattungsrichtlinie der Plattform.",
          },
        ],
      },
    },
    es: {
      hero: {
        title: "Ofertas y Descuentos de Agentes IA 2026",
        subtitle:
          "Descuentos exclusivos en plataformas de agentes IA premium. Ahorra hasta 50% con nuestras ofertas verificadas.",
        urgency: "¡Ofertas por tiempo limitado - No te lo pierdas!",
        timerLabel: "Las Ofertas Terminan En",
      },
      deals: {
        perMonth: "/mes",
        wasPrice: "Era",
        totalCost: "Costo total",
        savePercent: "AHORRA",
        extraMonths: "meses gratis",
        months: "meses",
        getDeal: "Obtener Esta Oferta",
        copyCoupon: "Copiar Código de Cupón",
        copied: "¡Copiado!",
        expiresLabel: "La oferta expira",
        expiresSoon: "Pronto",
      },
      badges: {
        bestDeal: "Mejor Oferta",
        mostPopular: "Más Popular",
        premiumChoice: "Elección Premium",
        bestValue: "Mejor Valor",
      },
      features: {
        title: "Características Incluidas",
      },
      tips: {
        title: "Consejos Inteligentes para Comprar Ofertas",
        items: [
          {
            title: "Verificar Precios de Renovación",
            description:
              "Siempre verifica lo que pagarás después de que termine el período promocional. Muchas plataformas de IA aumentan los precios después del año 1.",
          },
          {
            title: "Nivel Gratuito Primero",
            description:
              "La mayoría de los agentes IA ofrecen niveles gratuitos. Pruébalos antes de comprometerte con un plan de pago para asegurarte de que se adapte a tus necesidades.",
          },
          {
            title: "Garantía de Devolución de Dinero",
            description:
              "Muchas plataformas ofrecen períodos de prueba o garantías de devolución de dinero. Prueba el servicio sin riesgo antes de comprometerte.",
          },
          {
            title: "Anual vs Mensual",
            description:
              "Los planes anuales suelen ofrecer un ahorro del 15-30% sobre la facturación mensual. Elige anual si estás comprometido.",
          },
        ],
      },
      guarantee: {
        title: "Sin Riesgo con Pruebas Gratuitas y Garantías",
        description:
          "La mayoría de las plataformas de agentes IA ofrecen niveles gratuitos o períodos de prueba. Prueba el servicio sin riesgo y actualiza solo si estás satisfecho.",
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          {
            question: "¿Estas ofertas expiran?",
            answer:
              "Sí, las ofertas de agentes IA cambian con frecuencia. Actualizamos esta página regularmente con las últimas ofertas.",
          },
          {
            question: "¿Se requieren códigos de cupón?",
            answer:
              "La mayoría de las ofertas se aplican automáticamente a través de nuestros enlaces. Cuando se requiere un código de cupón, lo mostramos de manera prominente.",
          },
          {
            question: "¿Qué sucede después del período promocional?",
            answer:
              "Después de que termine tu período de suscripción inicial, se te cobrará el precio de renovación estándar a menos que canceles.",
          },
          {
            question: "¿Puedo obtener un reembolso si no me gusta el agente IA?",
            answer:
              "La mayoría de las plataformas de IA ofrecen niveles gratuitos, períodos de prueba o garantías de devolución de dinero. Verifica la política de reembolso específica de la plataforma.",
          },
        ],
      },
    },
    fr: {
      hero: {
        title: "Offres Agents IA & Réductions 2026",
        subtitle:
          "Remises exclusives sur les plateformes d'agents IA premium. Économisez jusqu'à 50% avec nos offres vérifiées.",
        urgency: "Offres à durée limitée - Ne manquez pas ça!",
        timerLabel: "Les Offres Se Terminent Dans",
      },
      deals: {
        perMonth: "/mois",
        wasPrice: "Était",
        totalCost: "Coût total",
        savePercent: "ÉCONOMISEZ",
        extraMonths: "mois gratuits",
        months: "mois",
        getDeal: "Obtenir Cette Offre",
        copyCoupon: "Copier le Code Promo",
        copied: "Copié!",
        expiresLabel: "L'offre expire",
        expiresSoon: "Bientôt",
      },
      badges: {
        bestDeal: "Meilleure Offre",
        mostPopular: "Plus Populaire",
        premiumChoice: "Choix Premium",
        bestValue: "Meilleur Rapport",
      },
      features: {
        title: "Fonctionnalités Incluses",
      },
      tips: {
        title: "Conseils d'Achat Intelligents",
        items: [
          {
            title: "Vérifier les Prix de Renouvellement",
            description:
              "Vérifiez toujours ce que vous paierez après la fin de la période promotionnelle. De nombreuses plateformes IA augmentent les prix après la 1ère année.",
          },
          {
            title: "Niveau Gratuit D'abord",
            description:
              "La plupart des agents IA offrent des niveaux gratuits. Testez-les avant de vous engager dans un plan payant pour vous assurer qu'il répond à vos besoins.",
          },
          {
            title: "Garantie Satisfait ou Remboursé",
            description:
              "De nombreuses plateformes offrent des périodes d'essai ou des garanties satisfait ou remboursé. Testez le service sans risque avant de vous engager.",
          },
          {
            title: "Annuel vs Mensuel",
            description:
              "Les plans annuels offrent généralement 15-30% d'économies par rapport à la facturation mensuelle. Choisissez annuel si vous êtes engagé.",
          },
        ],
      },
      guarantee: {
        title: "Sans Risque avec Essais Gratuits & Garanties",
        description:
          "La plupart des plateformes d'agents IA offrent des niveaux gratuits ou des périodes d'essai. Essayez le service sans risque et mettez à niveau uniquement si vous êtes satisfait.",
      },
      faq: {
        title: "Questions Fréquemment Posées",
        items: [
          {
            question: "Ces offres expirent-elles?",
            answer:
              "Oui, les offres d'agents IA changent fréquemment. Nous mettons à jour cette page régulièrement avec les dernières offres.",
          },
          {
            question: "Les codes promo sont-ils obligatoires?",
            answer:
              "La plupart des offres sont automatiquement appliquées via nos liens. Lorsqu'un code promo est requis, nous l'affichons de manière bien visible.",
          },
          {
            question: "Que se passe-t-il après la période promotionnelle?",
            answer:
              "Après la fin de votre période d'abonnement initiale, vous serez facturé au prix de renouvellement standard sauf si vous annulez.",
          },
          {
            question: "Puis-je obtenir un remboursement si je n'aime pas l'agent IA?",
            answer:
              "La plupart des plateformes IA offrent des niveaux gratuits, des périodes d'essai ou des garanties satisfait ou remboursé. Vérifiez la politique de remboursement spécifique de la plateforme.",
          },
        ],
      },
    },
    zh: {
      hero: {
        title: "AI代理优惠与折扣2026",
        subtitle: "高级AI代理平台独家折扣。使用我们验证过的优惠节省高达50%。",
        urgency: "限时优惠 - 不要错过！",
        timerLabel: "优惠结束倒计时",
      },
      deals: {
        perMonth: "/月",
        wasPrice: "原价",
        totalCost: "总费用",
        savePercent: "节省",
        extraMonths: "个月免费",
        months: "个月",
        getDeal: "获取此优惠",
        copyCoupon: "复制优惠码",
        copied: "已复制！",
        expiresLabel: "优惠到期",
        expiresSoon: "即将到期",
      },
      badges: {
        bestDeal: "最佳优惠",
        mostPopular: "最受欢迎",
        premiumChoice: "高级选择",
        bestValue: "最佳价值",
      },
      features: {
        title: "包含功能",
      },
      tips: {
        title: "智能购物技巧",
        items: [
          {
            title: "检查续订价格",
            description: "始终检查促销期结束后您将支付的价格。许多AI平台在第一年后会提高价格。",
          },
          {
            title: "先试用免费层",
            description: "大多数AI代理提供免费层。在承诺付费计划之前测试它们，确保它符合您的需求。",
          },
          {
            title: "退款保证",
            description: "许多平台提供试用期或退款保证。在承诺之前无风险测试服务。",
          },
          {
            title: "年度vs月度",
            description: "年度计划通常比月度计费节省15-30%。如果您准备承诺，请选择年度。",
          },
        ],
      },
      guarantee: {
        title: "免费试用和保证无风险",
        description:
          "大多数AI代理平台提供免费层或试用期。无风险试用服务，只有在满意时才升级。",
      },
      faq: {
        title: "常见问题",
        items: [
          {
            question: "这些优惠会过期吗？",
            answer: "是的，AI代理优惠经常变化。我们定期更新此页面以提供最新优惠。",
          },
          {
            question: "需要优惠码吗？",
            answer: "大多数优惠通过我们的链接自动应用。当需要优惠码时，我们会显著显示它。",
          },
          {
            question: "促销期结束后会怎样？",
            answer: "初始订阅期结束后，除非您取消，否则将按标准续订价格收费。",
          },
          {
            question: "如果我不喜欢AI代理可以退款吗？",
            answer: "大多数AI平台提供免费层、试用期或退款保证。请查看特定平台的退款政策。",
          },
        ],
      },
    },
    ja: {
      hero: {
        title: "AIエージェントセール＆割引2026",
        subtitle: "プレミアムAIエージェントプラットフォームの独占割引。検証済みのセールで最大50％節約。",
        urgency: "期間限定オファー - お見逃しなく！",
        timerLabel: "セール終了まで",
      },
      deals: {
        perMonth: "/月",
        wasPrice: "通常価格",
        totalCost: "総費用",
        savePercent: "割引",
        extraMonths: "ヶ月無料",
        months: "ヶ月",
        getDeal: "このセールを入手",
        copyCoupon: "クーポンコードをコピー",
        copied: "コピーしました！",
        expiresLabel: "セール終了",
        expiresSoon: "まもなく",
      },
      badges: {
        bestDeal: "ベストディール",
        mostPopular: "最も人気",
        premiumChoice: "プレミアム選択",
        bestValue: "最高の価値",
      },
      features: {
        title: "含まれる機能",
      },
      tips: {
        title: "スマートなお買い物のヒント",
        items: [
          {
            title: "更新価格を確認",
            description:
              "プロモーション期間終了後に支払う金額を必ず確認してください。多くのAIプラットフォームは1年目以降に価格を引き上げます。",
          },
          {
            title: "まず無料ティア",
            description:
              "ほとんどのAIエージェントは無料ティアを提供しています。有料プランにコミットする前にテストして、ニーズに合うことを確認してください。",
          },
          {
            title: "返金保証",
            description:
              "多くのプラットフォームは試用期間または返金保証を提供しています。コミットする前にサービスをリスクなしでテストしてください。",
          },
          {
            title: "年間vs月間",
            description:
              "年間プランは通常、月額請求に比べて15-30％の節約になります。コミットする場合は年間を選択してください。",
          },
        ],
      },
      guarantee: {
        title: "無料トライアルと保証でリスクフリー",
        description:
          "ほとんどのAIエージェントプラットフォームは無料ティアまたは試用期間を提供しています。サービスをリスクなく試して、満足した場合のみアップグレードしてください。",
      },
      faq: {
        title: "よくある質問",
        items: [
          {
            question: "これらのディールは期限切れになりますか？",
            answer:
              "はい、AIエージェントディールは頻繁に変わります。このページを定期的に最新のオファーで更新しています。",
          },
          {
            question: "クーポンコードは必要ですか？",
            answer:
              "ほとんどのディールはリンクを通じて自動的に適用されます。クーポンコードが必要な場合は、目立つように表示されます。",
          },
          {
            question: "プロモーション期間後はどうなりますか？",
            answer:
              "初回購読期間が終了すると、キャンセルしない限り標準更新価格が請求されます。",
          },
          {
            question: "AIエージェントが気に入らない場合、返金を受けられますか？",
            answer:
              "ほとんどのAIプラットフォームは無料ティア、試用期間、または返金保証を提供しています。特定のプラットフォームの返金ポリシーを確認してください。",
          },
        ],
      },
    },
    ko: {
      hero: {
        title: "AI 에이전트 할인 및 특가 2026",
        subtitle: "프리미엄 AI 에이전트 플랫폼 독점 할인. 검증된 할인으로 최대 50% 절약하세요.",
        urgency: "기간 한정 혜택 - 놓치지 마세요!",
        timerLabel: "할인 종료까지",
      },
      deals: {
        perMonth: "/월",
        wasPrice: "정상가",
        totalCost: "총 비용",
        savePercent: "절약",
        extraMonths: "개월 무료",
        months: "개월",
        getDeal: "이 할인 받기",
        copyCoupon: "쿠폰 코드 복사",
        copied: "복사됨!",
        expiresLabel: "할인 종료",
        expiresSoon: "곧",
      },
      badges: {
        bestDeal: "최고 할인",
        mostPopular: "가장 인기",
        premiumChoice: "프리미엄 선택",
        bestValue: "최고 가치",
      },
      features: {
        title: "포함된 기능",
      },
      tips: {
        title: "스마트 쇼핑 팁",
        items: [
          {
            title: "갱신 가격 확인",
            description: "프로모션 기간 종료 후 지불할 금액을 항상 확인하세요. 많은 AI 플랫폼이 1년 후 가격을 인상합니다.",
          },
          {
            title: "무료 티어 먼저",
            description: "대부분의 AI 에이전트는 무료 티어를 제공합니다. 유료 플랜에 약정하기 전에 테스트하여 필요에 맞는지 확인하세요.",
          },
          {
            title: "환불 보장",
            description: "많은 플랫폼이 체험 기간이나 환불 보장을 제공합니다. 약정하기 전에 서비스를 위험 없이 테스트하세요.",
          },
          {
            title: "연간 vs 월간",
            description: "연간 플랜은 일반적으로 월간 청구보다 15-30% 절감됩니다. 약정할 준비가 되었다면 연간을 선택하세요.",
          },
        ],
      },
      guarantee: {
        title: "무료 체험 및 보장으로 위험 없음",
        description:
          "대부분의 AI 에이전트 플랫폼은 무료 티어나 체험 기간을 제공합니다. 서비스를 위험 없이 시도하고 만족한 경우에만 업그레이드하세요.",
      },
      faq: {
        title: "자주 묻는 질문",
        items: [
          {
            question: "이 할인들은 만료되나요?",
            answer: "예, AI 에이전트 할인은 자주 변경됩니다. 최신 혜택으로 이 페이지를 정기적으로 업데이트합니다.",
          },
          {
            question: "쿠폰 코드가 필요한가요?",
            answer: "대부분의 할인은 링크를 통해 자동으로 적용됩니다. 쿠폰 코드가 필요한 경우 눈에 띄게 표시됩니다.",
          },
          {
            question: "프로모션 기간 후에는 어떻게 되나요?",
            answer: "초기 구독 기간이 종료되면 취소하지 않는 한 표준 갱신 가격이 청구됩니다.",
          },
          {
            question: "AI 에이전트가 마음에 들지 않으면 환불받을 수 있나요?",
            answer: "대부분의 AI 플랫폼은 무료 티어, 체험 기간 또는 환불 보장을 제공합니다. 특정 플랫폼의 환불 정책을 확인하세요.",
          },
        ],
      },
    },
    th: {
      hero: {
        title: "ดีล AI Agent และส่วนลด 2026",
        subtitle: "ส่วนลดพิเศษสำหรับแพลตฟอร์ม AI agent พรีเมียม ประหยัดสูงสุด 50% ด้วยดีลที่ตรวจสอบแล้วของเรา",
        urgency: "ข้อเสนอจำกัดเวลา - อย่าพลาด!",
        timerLabel: "ดีลสิ้นสุดใน",
      },
      deals: {
        perMonth: "/เดือน",
        wasPrice: "ราคาเดิม",
        totalCost: "ค่าใช้จ่ายทั้งหมด",
        savePercent: "ประหยัด",
        extraMonths: "เดือนฟรี",
        months: "เดือน",
        getDeal: "รับดีลนี้",
        copyCoupon: "คัดลอกรหัสคูปอง",
        copied: "คัดลอกแล้ว!",
        expiresLabel: "ดีลหมดอายุ",
        expiresSoon: "เร็วๆ นี้",
      },
      badges: {
        bestDeal: "ดีลที่ดีที่สุด",
        mostPopular: "ยอดนิยมสูงสุด",
        premiumChoice: "ตัวเลือกพรีเมียม",
        bestValue: "คุ้มค่าที่สุด",
      },
      features: {
        title: "ฟีเจอร์ที่รวมอยู่",
      },
      tips: {
        title: "เคล็ดลับการช็อปปิ้งอย่างชาญฉลาด",
        items: [
          {
            title: "ตรวจสอบราคาต่ออายุ",
            description:
              "ตรวจสอบเสมอว่าคุณจะจ่ายเท่าไหร่หลังจากช่วงโปรโมชั่นสิ้นสุด แพลตฟอร์ม AI หลายรายเพิ่มราคาหลังจากปีแรก",
          },
          {
            title: "ทดลองใช้ฟรีก่อน",
            description:
              "AI agent ส่วนใหญ่เสนอระดับฟรี ทดสอบก่อนที่จะผูกมัดกับแผนที่ต้องชำระเงินเพื่อให้แน่ใจว่าตรงกับความต้องการของคุณ",
          },
          {
            title: "การรับประกันคืนเงิน",
            description:
              "หลายแพลตฟอร์มเสนอช่วงทดลองหรือการรับประกันคืนเงิน ทดสอบบริการโดยไม่มีความเสี่ยงก่อนที่จะผูกมัด",
          },
          {
            title: "รายปี vs รายเดือน",
            description:
              "แผนรายปีมักจะให้ส่วนลด 15-30% เมื่อเทียบกับการเรียกเก็บเงินรายเดือน เลือกรายปีหากคุณพร้อมที่จะผูกมัด",
          },
        ],
      },
      guarantee: {
        title: "ไร้ความเสี่ยงด้วยการทดลองใช้ฟรีและการรับประกัน",
        description:
          "แพลตฟอร์ม AI agent ส่วนใหญ่เสนอระดับฟรีหรือช่วงทดลอง ทดลองใช้บริการโดยไม่มีความเสี่ยงและอัปเกรดเฉพาะเมื่อคุณพอใจ",
      },
      faq: {
        title: "คำถามที่พบบ่อย",
        items: [
          {
            question: "ดีลเหล่านี้หมดอายุหรือไม่?",
            answer: "ใช่ ดีล AI agent เปลี่ยนแปลงบ่อย เราอัปเดตหน้านี้เป็นประจำด้วยข้อเสนอล่าสุด",
          },
          {
            question: "ต้องใช้รหัสคูปองหรือไม่?",
            answer:
              "ดีลส่วนใหญ่จะถูกนำไปใช้โดยอัตโนมัติผ่านลิงก์ของเรา เมื่อต้องใช้รหัสคูปอง เราจะแสดงอย่างเด่นชัด",
          },
          {
            question: "จะเกิดอะไรขึ้นหลังจากช่วงโปรโมชั่น?",
            answer:
              "หลังจากช่วงสมัครสมาชิกเริ่มต้นสิ้นสุด คุณจะถูกเรียกเก็บเงินตามราคาต่ออายุมาตรฐานเว้นแต่คุณจะยกเลิก",
          },
          {
            question: "ฉันสามารถขอคืนเงินได้หากไม่ชอบ AI agent หรือไม่?",
            answer:
              "แพลตฟอร์ม AI ส่วนใหญ่เสนอระดับฟรี ช่วงทดลอง หรือการรับประกันคืนเงิน ตรวจสอบนโยบายคืนเงินเฉพาะของแพลตฟอร์ม",
          },
        ],
      },
    },
  };

  const t = content[locale] || content.en;

  return (
    <main className="min-h-screen">
      <DealsSchema />

      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Deals", href: "/deals" }]} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Tag className="h-8 w-8 text-primary" />
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t.hero.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full font-semibold mb-8">
              <Clock className="h-5 w-5" />
              {t.hero.urgency}
            </div>

            {/* Countdown Timer */}
            <div className="mt-8 inline-block">
              <CountdownTimer
                endDate={new Date("2026-12-31T23:59:59")}
                variant="full"
                label={t.hero.timerLabel}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {deals.map((deal, index) => (
              <DealCard key={index} deal={deal} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Info className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">{t.tips.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {t.tips.items.map((tip, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-8 w-8 text-green-500" />
                  {t.guarantee.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  {t.guarantee.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-6">
              {t.faq.items.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Deal Card Component types
type DealCardTranslations = {
  deals: {
    perMonth: string;
    wasPrice: string;
    totalCost: string;
    savePercent: string;
    extraMonths: string;
    months: string;
    getDeal: string;
    copyCoupon: string;
    copied: string;
    expiresLabel: string;
    expiresSoon: string;
  };
  badges: {
    bestDeal: string;
    mostPopular: string;
    premiumChoice: string;
    bestValue: string;
  };
  features: {
    title: string;
  };
};

function DealCard({
  deal,
  t,
}: {
  deal: (typeof deals)[0];
  t: DealCardTranslations;
}) {
  // Note: Coupon copy functionality would require client component
  // For now, coupon is displayed but not interactive

  return (
    <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <Badge className={`${deal.badgeColor} text-white border-0`}>
          {t.badges[deal.badgeKey]}
        </Badge>
      </div>

      <CardContent className="pt-6">
        {/* Platform Name */}
        <h3 className="text-2xl font-bold mb-6">{deal.name}</h3>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-bold text-primary">
              ${deal.dealPrice}
            </span>
            <span className="text-lg text-muted-foreground">
              {t.deals.perMonth}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="line-through">
              {t.deals.wasPrice} ${deal.originalPrice}
            </span>
            <Badge variant="destructive" className="font-semibold">
              {t.deals.savePercent} {deal.discount}%
            </Badge>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t.deals.totalCost}
              </p>
              <p className="text-2xl font-bold">${deal.total}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                {deal.months} {t.deals.months}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="font-semibold mb-3 text-sm">{t.features.title}</p>
          <ul className="space-y-2">
            {deal.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupon Code */}
        {deal.coupon && (
          <div className="mb-6">
            <div className="border rounded-lg p-4 text-center bg-muted">
              <p className="text-sm text-muted-foreground mb-1">{t.deals.copyCoupon}</p>
              <p className="text-lg font-bold font-mono">{deal.coupon}</p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <AffiliateButton
          agentId={deal.name.toLowerCase().replace(/\s+/g, '-')}
          agentName={deal.name}
          affiliateUrl={deal.affiliateUrl}
          className="w-full text-lg py-6"
          size="lg"
        >
          <Zap className="h-5 w-5 mr-2" />
          {t.deals.getDeal}
        </AffiliateButton>

        {/* Countdown Timer */}
        <div className="mt-4 pt-4 border-t">
          <CountdownTimer
            endDate={deal.expiresAt}
            variant="compact"
            label={t.deals.expiresLabel}
            className="justify-center"
          />
        </div>
      </CardContent>
    </Card>
  );
}
