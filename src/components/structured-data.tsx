import type { AiAgentProvider } from "@/lib/ai-agent-data";

// Organization Schema for the website
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroToAIAgents",
    url: "https://zerotoaiagents.com",
    logo: "https://zerotoaiagents.com/logo.png",
    sameAs: [
      "https://twitter.com/zerotoaiagents",
      "https://facebook.com/zerotoaiagents",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@zerotoaiagents.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroToAIAgents",
    url: "https://zerotoaiagents.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://zerotoaiagents.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// AI Agent Review Schema
export function AgentReviewSchema({ agent }: { agent: AiAgentProvider }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${agent.name} Review 2026`,
    reviewBody: agent.shortDescription,
    author: {
      "@type": "Organization",
      name: "ZeroToAIAgents",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: agent.name,
      applicationCategory: "AI Agent Platform",
      operatingSystem: "Web, Windows, macOS, iOS, Android, Linux",
      offers: {
        "@type": "Offer",
        price: agent.annualPrice || agent.monthlyPrice,
        priceCurrency: "USD",
        priceValidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString().split("T")[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: agent.overallRating,
      bestRating: 5,
      worstRating: 1,
    },
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: agent.pros.map((pro, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pro,
      })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: agent.cons.map((con, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: con,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for AI Agent
export function AgentProductSchema({ agent }: { agent: AiAgentProvider }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: agent.name,
    description: agent.shortDescription,
    brand: {
      "@type": "Brand",
      name: agent.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agent.overallRating,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "ZeroToAIAgents",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: agent.overallRating,
        bestRating: 5,
      },
    },
    offers: {
      "@type": "Offer",
      price: agent.annualPrice || agent.monthlyPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split("T")[0],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Comparison Table Schema for AI Agents
export function ComparisonTableSchema({ agents }: { agents: AiAgentProvider[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best AI Agents of 2026",
    description: "Comparison of the best AI agent platforms tested and reviewed by experts",
    numberOfItems: agents.length,
    itemListElement: agents.map((agent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: agent.name,
        applicationCategory: "AI Agent Platform",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: agent.overallRating,
          bestRating: 5,
        },
        offers: {
          "@type": "Offer",
          price: agent.annualPrice || agent.monthlyPrice,
          priceCurrency: "USD",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FaqSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for Blog Posts (E-E-A-T optimized)
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "ZeroToAIAgents Expert Team",
      url: "https://zerotoaiagents.com/about",
      jobTitle: "AI & Automation Researchers",
      description:
        "AI professionals who have tested and reviewed over 25 AI agent platforms since 2024.",
      sameAs: [
        "https://twitter.com/zerotoaiagents",
        "https://facebook.com/zerotoaiagents",
      ],
      worksFor: {
        "@type": "Organization",
        name: "ZeroToAIAgents",
        url: "https://zerotoaiagents.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroToAIAgents",
      url: "https://zerotoaiagents.com",
      logo: {
        "@type": "ImageObject",
        url: "https://zerotoaiagents.com/logo.png",
      },
    },
    isAccessibleForFree: true,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
