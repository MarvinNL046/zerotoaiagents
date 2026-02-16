// JSON-LD Structured Data Components for SEO

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroToAIAgents",
    url: "https://zerotoaiagents.com",
    logo: "https://zerotoaiagents.com/logo.png",
    description:
      "Expert AI agent reviews, honest comparisons, and exclusive deals on top AI automation platforms.",
    sameAs: [
      // Add social media links when available
      // "https://twitter.com/zerotoaiagents",
      // "https://facebook.com/zerotoaiagents",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://zerotoaiagents.com/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroToAIAgents",
    url: "https://zerotoaiagents.com",
    description:
      "Find the perfect AI agent for your needs. Expert reviews, honest comparisons, and exclusive deals.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://zerotoaiagents.com/reviews?q={search_term_string}",
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

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished = "2026-01-01",
  dateModified,
  image = "https://zerotoaiagents.com/og-image.png",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "ZeroToAIAgents",
      url: "https://zerotoaiagents.com",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
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

interface ProductReviewJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  rating: number;
  reviewCount?: number;
  price?: string;
  priceCurrency?: string;
}

export function ProductReviewJsonLd({
  name,
  description,
  image,
  url,
  rating,
  reviewCount = 1,
  price,
  priceCurrency = "USD",
}: ProductReviewJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image,
    url: url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      bestRating: "10",
      worstRating: "1",
      ratingCount: reviewCount,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating.toFixed(1),
        bestRating: "10",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "ZeroToAIAgents",
      },
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: priceCurrency,
        availability: "https://schema.org/InStock",
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

interface SoftwareApplicationJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  rating: number;
  reviewCount?: number;
  price?: string;
  priceCurrency?: string;
  operatingSystem?: string;
  category?: string;
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  image,
  url,
  rating,
  reviewCount = 1,
  price,
  priceCurrency = "USD",
  operatingSystem = "Web, Windows, macOS, iOS, Android, Linux",
  category = "AI Agent Platform",
}: SoftwareApplicationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    image: image,
    url: url,
    applicationCategory: category,
    operatingSystem: operatingSystem,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      bestRating: "10",
      worstRating: "1",
      ratingCount: reviewCount,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating.toFixed(1),
        bestRating: "10",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "ZeroToAIAgents",
      },
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: priceCurrency,
        availability: "https://schema.org/InStock",
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
