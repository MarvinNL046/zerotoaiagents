import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const reviewPage = readFileSync("src/app/[locale]/reviews/[slug]/page.tsx", "utf8");
const reviewsIndexPage = readFileSync("src/app/[locale]/reviews/page.tsx", "utf8");
const reviewsClientPage = readFileSync("src/app/[locale]/reviews/reviews-client.tsx", "utf8");
const header = readFileSync("src/components/header.tsx", "utf8");
const sitemapPage = readFileSync("src/app/sitemap.ts", "utf8");
const blogIndexPage = readFileSync("src/app/[locale]/blog/page.tsx", "utf8");
const blogPostPage = readFileSync("src/app/[locale]/blog/[slug]/page.tsx", "utf8");
const guidesIndexPage = readFileSync("src/app/[locale]/guides/page.tsx", "utf8");
const statisticsGuidePage = readFileSync("src/app/[locale]/guides/ai-coding-agent-statistics/page.tsx", "utf8");
const comparisonDetailPage = readFileSync("src/app/[locale]/compare/[comparison]/page.tsx", "utf8");
const comparisonHero = readFileSync("src/components/compare/comparison-hero.tsx", "utf8");
const popularComparisons = readFileSync("src/components/compare/popular-comparisons.tsx", "utf8");
const broadAiAgentsGuidePath = "src/app/[locale]/guides/what-are-ai-agents/page.tsx";
const broadAiAgentsGuideExists = existsSync(broadAiAgentsGuidePath);
const broadAiAgentsGuidePage = broadAiAgentsGuideExists
  ? readFileSync(broadAiAgentsGuidePath, "utf8")
  : "";
const builderPrinciplesGuidePath = "src/app/[locale]/guides/principles-of-building-ai-agents/page.tsx";
const builderPrinciplesGuideExists = existsSync(builderPrinciplesGuidePath);
const builderPrinciplesGuidePage = builderPrinciplesGuideExists
  ? readFileSync(builderPrinciplesGuidePath, "utf8")
  : "";
const aiAgentsNewsHubPath = "src/app/[locale]/blog/ai-agents-news/page.tsx";
const aiAgentsNewsHubExists = existsSync(aiAgentsNewsHubPath);
const aiAgentsNewsHubPage = aiAgentsNewsHubExists
  ? readFileSync(aiAgentsNewsHubPath, "utf8")
  : "";
const metadataTitleSources = [
  readFileSync("src/app/[locale]/about/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/authors/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/compare/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/compare/[comparison]/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/contact/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/cookie-policy/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/editorial-policy/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/guides/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/privacy-policy/page.tsx", "utf8"),
  readFileSync("src/app/[locale]/terms/page.tsx", "utf8"),
].join("\n");
const projectSource = readFileSync("src/app/[locale]/compare/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/compare/[comparison]/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/contact/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/guides/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/guides/ai-coding-agent-statistics/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/guides/ai-coding-agents-beginners-vs-experienced/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/guides/what-are-ai-coding-agents/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/guides/free-vs-paid-ai-coding-agents/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/blog/page.tsx", "utf8")
  + readFileSync("src/app/[locale]/reviews/reviews-client.tsx", "utf8")
  + readFileSync("src/app/[locale]/reviews/[slug]/page.tsx", "utf8");

test("review pages include review and software structured data", () => {
  assert.match(
    reviewPage,
    /AgentReviewSchema|SoftwareApplicationJsonLd/,
    "Expected review detail page to render review structured data"
  );

  assert.match(
    reviewPage,
    /AgentSoftwareApplicationSchema|AgentProductSchema|SoftwareApplicationJsonLd/,
    "Expected review detail page to render aggregate rating software/product structured data"
  );
});

test("header exposes compare pages and blog navigation", () => {
  assert.match(
    header,
    /\/blog/,
    "Expected header navigation to include blog"
  );

  assert.match(
    header,
    /cursor-vs-github-copilot/,
    "Expected header to expose specific comparison links"
  );
});

test("header exposes the expanded comparison set", () => {
  [
    /claude-code-vs-cursor/,
    /github-copilot-vs-windsurf/,
    /cursor-vs-devin/,
    /crewai-vs-autogen-vs-langgraph/,
  ].forEach((pattern) => {
    assert.match(
      header,
      pattern,
      `Expected header to expose comparison slug ${pattern}`
    );
  });
});

test("review pages include FAQ structured data", () => {
  assert.match(
    reviewPage,
    /FaqSchema|FAQSchema/,
    "Expected review detail page to render FAQ structured data"
  );
});

test("sitemap includes blog posts and content-aware last modified dates", () => {
  assert.match(
    sitemapPage,
    /getAllPublishedSlugs/,
    "Expected sitemap to include published blog post slugs"
  );

  assert.match(
    sitemapPage,
    /getReviewContent/,
    "Expected sitemap to derive review lastModified values from review content"
  );

  assert.match(
    sitemapPage,
    /\/blog/,
    "Expected sitemap to include the blog index or blog entries"
  );
});

test("obsolete internal links are removed from key SEO pages", () => {
  assert.doesNotMatch(
    projectSource,
    /\/best\/coding-agents|\/guides\/what-is-ai-agent|\/use-cases/,
    "Expected obsolete internal links to be replaced with real routes"
  );
});

test("blog pages define canonicals and hreflang alternates", () => {
  assert.match(
    blogIndexPage,
    /alternates:\s*\{/,
    "Expected blog index metadata to define alternates"
  );
  assert.match(
    blogIndexPage,
    /canonical:/,
    "Expected blog index metadata to define a canonical URL"
  );
  assert.match(
    blogPostPage,
    /alternates:\s*\{/,
    "Expected blog post metadata to define alternates"
  );
  assert.match(
    blogPostPage,
    /canonical:/,
    "Expected blog post metadata to define a canonical URL"
  );
});

test("blog pages use Next Image instead of raw img tags", () => {
  assert.match(
    blogIndexPage,
    /from "next\/image"/,
    "Expected blog index page to import next/image"
  );
  assert.match(
    blogPostPage,
    /from "next\/image"/,
    "Expected blog post page to import next/image"
  );
  assert.doesNotMatch(
    blogIndexPage,
    /<img\b/,
    "Expected blog index page to avoid raw img tags"
  );
  assert.doesNotMatch(
    blogPostPage,
    /<img\b/,
    "Expected blog post page to avoid raw img tags"
  );
});

test("reviews index is positioned as a best ai coding agents hub", () => {
  assert.match(
    reviewsIndexPage,
    /Best AI Coding Agents 2026|best AI coding agents 2026/i,
    "Expected reviews index metadata to target best AI coding agents"
  );
  assert.match(
    reviewsClientPage,
    /Best AI Coding Agents 2026/,
    "Expected reviews UI to present a best AI coding agents roundup heading"
  );
  assert.match(
    reviewsClientPage,
    /FAQSchema|FaqSchema/,
    "Expected reviews UI to include FAQ structured data"
  );
});

test("comparison detail pages include FAQ schema and stronger SEO scaffolding", () => {
  assert.match(
    comparisonDetailPage,
    /FAQSchema|FaqSchema/,
    "Expected comparison detail pages to include FAQ structured data"
  );
  assert.match(
    comparisonDetailPage,
    /keywords:/,
    "Expected comparison detail metadata to include keywords"
  );
  assert.match(
    comparisonDetailPage,
    /comparisonFaqs|buildComparisonFaqs/,
    "Expected comparison detail pages to build data-driven FAQ content"
  );
});

test("compare hub promotes the expanded comparison set", () => {
  [
    /claude-code-vs-cursor/,
    /github-copilot-vs-windsurf/,
    /cursor-vs-devin/,
    /crewai-vs-autogen-vs-langgraph/,
  ].forEach((pattern) => {
    assert.match(
      popularComparisons,
      pattern,
      `Expected compare hub to promote comparison slug ${pattern}`
    );
  });
});

test("page metadata titles do not hardcode the site name when layout templates already append it", () => {
  const localizedBlogTitleBlock = blogIndexPage.match(/const titles:[\s\S]*?const descriptions:/)?.[0] || "";

  assert.doesNotMatch(
    metadataTitleSources,
    /title:\s*[`"][^`"\n]*ZeroToAIAgents/,
    "Expected route metadata titles to avoid hardcoding the site name"
  );
  assert.doesNotMatch(
    localizedBlogTitleBlock,
    /ZeroToAIAgents/,
    "Expected localized blog metadata titles to avoid hardcoding the site name"
  );
});

test("comparison hero uses AI-agent terminology instead of legacy VPN labels", () => {
  assert.doesNotMatch(
    comparisonHero,
    /Servers:|Countries:|Speed Score:/,
    "Expected comparison hero to avoid legacy VPN stat labels"
  );
  assert.match(
    comparisonHero,
    /renderQuickStat\("Best Price"|renderQuickStat\("Free Tier"|renderQuickStat\("Ease of Use"|renderQuickStat\("Best For"/,
    "Expected comparison hero to expose AI-agent-specific quick stats"
  );
});

test("statistics guide exists as a linked SEO hub with structured data and sources", () => {
  assert.match(
    statisticsGuidePage,
    /AI Coding Agent Statistics 2026/i,
    "Expected a dedicated AI coding agent statistics guide page"
  );
  assert.match(
    statisticsGuidePage,
    /FAQSchema|FAQJsonLd/,
    "Expected the statistics guide to include FAQ structured data"
  );
  assert.match(
    statisticsGuidePage,
    /github\.blog|survey\.stackoverflow\.co|stackoverflow\.blog|mckinsey\.com|anthropic\.com|cursor\.com\/blog/,
    "Expected the statistics guide to include cited source links"
  );
});

test("statistics guide is linked from key SEO hubs", () => {
  assert.match(
    guidesIndexPage,
    /\/guides\/ai-coding-agent-statistics/,
    "Expected guides index to link to the statistics guide"
  );
  assert.match(
    reviewsClientPage,
    /\/guides\/ai-coding-agent-statistics/,
    "Expected reviews hub to link to the statistics guide"
  );
  assert.match(
    reviewPage,
    /\/guides\/ai-coding-agent-statistics/,
    "Expected review detail pages to link to the statistics guide"
  );
  assert.match(
    blogIndexPage,
    /\/guides\/ai-coding-agent-statistics/,
    "Expected blog hub to link to the statistics guide"
  );
});

test("sitemap includes the expanded comparison targets", () => {
  [
    /\/compare\/claude-code-vs-cursor/,
    /\/compare\/github-copilot-vs-windsurf/,
    /\/compare\/cursor-vs-devin/,
    /\/compare\/crewai-vs-autogen-vs-langgraph/,
  ].forEach((pattern) => {
    assert.match(
      sitemapPage,
      pattern,
      `Expected sitemap source to include comparison route ${pattern}`
    );
  });
});

test("claude code review links to relevant WordPress implementation guides", () => {
  assert.match(
    reviewPage,
    /zerotowp\.com\/wordpress-claude-ai-mcp-connector/,
    "Expected review detail page source to include a WordPress Claude MCP guide backlink"
  );
});

test("statistics guide references practical WordPress implementation examples", () => {
  assert.match(
    statisticsGuidePage,
    /zerotowp\.com\/wordpress-claude-ai-mcp-connector/,
    "Expected statistics guide to reference the WordPress Claude MCP tutorial"
  );
  assert.match(
    statisticsGuidePage,
    /zerotowp\.com\/openclaw-wordpress/,
    "Expected statistics guide to reference the OpenClaw WordPress tutorial"
  );
});

test("broad what are ai agents guide exists and is wired into SEO hubs", () => {
  assert.equal(
    broadAiAgentsGuideExists,
    true,
    "Expected a dedicated broad AI agents guide route to exist"
  );

  assert.match(
    broadAiAgentsGuidePage,
    /What Are AI Agents/i,
    "Expected the broad guide to target the What Are AI Agents topic"
  );

  assert.match(
    broadAiAgentsGuidePage,
    /\/reviews|\/compare|\/reviews\/n8n-ai|\/reviews\/crewai|\/reviews\/claude-code/,
    "Expected the broad guide to link into existing review or compare hubs"
  );

  assert.match(
    guidesIndexPage,
    /slug:\s*"what-are-ai-agents"|what-are-ai-agents/,
    "Expected guides index to include the broad AI agents guide card"
  );

  assert.match(
    sitemapPage,
    /\/guides\/what-are-ai-agents/,
    "Expected sitemap source to include the broad AI agents guide"
  );
});

test("principles of building ai agents guide exists and links framework pages together", () => {
  assert.equal(
    builderPrinciplesGuideExists,
    true,
    "Expected a dedicated principles of building AI agents guide route to exist"
  );

  assert.match(
    builderPrinciplesGuidePage,
    /Principles of Building AI Agents/i,
    "Expected the builder guide to target the principles of building AI agents topic"
  );

  assert.match(
    builderPrinciplesGuidePage,
    /\/reviews\/crewai|\/reviews\/autogen|\/reviews\/langgraph|\/compare\/crewai-vs-autogen-vs-langgraph/,
    "Expected the builder guide to connect the framework reviews and comparison"
  );

  assert.match(
    guidesIndexPage,
    /principles-of-building-ai-agents/,
    "Expected guides index to include the builder principles guide"
  );

  assert.match(
    sitemapPage,
    /\/guides\/principles-of-building-ai-agents/,
    "Expected sitemap source to include the builder principles guide"
  );
});

test("ai agents news hub exists and is wired into the blog surface", () => {
  assert.equal(
    aiAgentsNewsHubExists,
    true,
    "Expected a dedicated AI Agents News hub route to exist"
  );

  assert.match(
    aiAgentsNewsHubPage,
    /AI Agents News/i,
    "Expected the news hub to target the AI Agents News topic"
  );

  assert.match(
    aiAgentsNewsHubPage,
    /\/blog|\/reviews|\/compare|\/guides\/ai-coding-agent-statistics/,
    "Expected the news hub to link into the blog and core SEO hubs"
  );

  assert.match(
    blogIndexPage,
    /ai-agents-news/,
    "Expected the blog index to link to the AI Agents News hub"
  );

  assert.match(
    sitemapPage,
    /\/blog\/ai-agents-news/,
    "Expected sitemap source to include the AI Agents News hub"
  );
});
