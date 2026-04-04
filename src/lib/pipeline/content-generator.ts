import { generateContent } from "./ai-provider";

export interface GeneratedContent {
  title: string;
  slug: string;
  content: string;        // HTML
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  type: "review" | "comparison" | "guide";
}

// Load sitemap for internal linking
async function loadSitemapLinks(): Promise<string[]> {
  try {
    const res = await fetch("https://zerotoaiagents.com/sitemap.xml", {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return FALLBACK_LINKS;
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => m[1])
      .filter(url => {
        const path = url.replace("https://zerotoaiagents.com", "");
        if (!path || path === "/") return false;
        if (["/about", "/contact", "/privacy", "/terms"].some(p => path.startsWith(p))) return false;
        return true;
      });
  } catch {
    return FALLBACK_LINKS;
  }
}

const FALLBACK_LINKS = [
  "https://zerotoaiagents.com/reviews/cursor",
  "https://zerotoaiagents.com/reviews/github-copilot",
  "https://zerotoaiagents.com/reviews/windsurf",
  "https://zerotoaiagents.com/reviews/claude-code",
  "https://zerotoaiagents.com/reviews/devin",
  "https://zerotoaiagents.com/compare/cursor-vs-github-copilot",
  "https://zerotoaiagents.com/compare/cursor-vs-windsurf",
  "https://zerotoaiagents.com/guides/what-are-ai-coding-agents",
  "https://zerotoaiagents.com/guides/how-to-choose-ai-coding-agent",
  "https://zerotoaiagents.com/guides/getting-started-ai-pair-programming",
  "https://zerotoaiagents.com/guides/free-vs-paid-ai-coding-agents",
  "https://zerotoaiagents.com/guides/ai-coding-agents-beginners-vs-experienced",
];

function groupLinks(urls: string[]): string {
  const groups: Record<string, string[]> = {
    "Agent Reviews": [],
    "Comparisons": [],
    "Guides": [],
  };

  for (const url of urls) {
    const path = url.replace("https://zerotoaiagents.com", "");
    if (path.startsWith("/reviews/")) groups["Agent Reviews"].push(url);
    else if (path.startsWith("/compare/")) groups["Comparisons"].push(url);
    else if (path.startsWith("/guides/")) groups["Guides"].push(url);
  }

  let result = "";
  for (const [section, links] of Object.entries(groups)) {
    if (links.length === 0) continue;
    result += `\n${section}:\n`;
    for (const link of links) {
      const path = link.replace("https://zerotoaiagents.com/", "");
      const label = path.replace(/-/g, " ").replace(/\//g, " — ");
      result += `- ${link} (${label})\n`;
    }
  }
  return result;
}

function buildSystemPrompt(sitemapContext: string): string {
  return `You are an expert AI coding tools reviewer for zerotoaiagents.com — a site that helps developers find and master AI coding agents. You write authoritative, actionable content that follows E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness).

WRITING STYLE:
- Write as a developer with 10+ years of coding experience who actively uses AI coding agents daily
- Use second person ("you") — speak directly to the reader
- Be practical and actionable — every section should have concrete examples or steps
- Include real tool names, features, and pricing (no made-up information)
- Compare tools fairly — acknowledge strengths and weaknesses of each

EXPERIENCE REQUIREMENTS (CRITICAL FOR E-E-A-T):
- Include at least 1 detailed real-world use case scenario (e.g., "I used this to refactor a 50k-line codebase and here's what happened...")
- Include a "Who is this tool actually for?" section based on real usage patterns
- Include a "When NOT to use this tool" section — be honest about limitations
- Describe a realistic daily workflow using the tool (step-by-step, not generic)
- Do NOT use vague experience signals like "In my experience..." without concrete details after them — always follow with specifics

SEARCH INTENT OPTIMIZATION:
- Identify if the topic is informational, commercial, or comparison intent
- Adjust tone accordingly:
  - Informational → educational, explain concepts clearly, help readers understand
  - Commercial → persuasive with honest pros/cons, help readers make a purchase decision
  - Comparison → clear decision guidance, define winner for each use case, include verdict table

STRUCTURE (HTML output):
- Start with a compelling hook paragraph (2-3 sentences)
- Include a "Key Takeaways" summary box early (HTML div with class="key-takeaways")
- Use <h2> for main sections
- Use <h3> for subsections
- Include comparison tables where relevant (<table>)
- Add "Pro Tip" callout boxes: <div class="pro-tip"><strong>Pro Tip:</strong> content</div>
- Include code snippets where relevant (e.g., setup commands, config examples)
- Include a "Verdict" section with a clear recommendation and best alternative per use case
- End with an FAQ section using <h3> for each question
- Final section: brief conclusion with subtle call-to-action

CONVERSION OPTIMIZATION:
- Include a clear "Verdict" section: who should use this, who shouldn't, and your top recommendation
- Include "Best alternative for [use case]" recommendations (e.g., "Best free alternative: ...", "Best for teams: ...")
- Add subtle call-to-actions naturally (e.g., "try the free tier", "compare with X", "check current pricing")
- Do NOT be salesy — be helpful and honest, readers trust authentic recommendations

TOPICAL AUTHORITY:
- Position the article within the broader AI coding agents ecosystem
- Reference related tool categories (coding agents, no-code builders, frameworks, enterprise)
- Include at least 2 "alternative tools" mentions with links to their reviews
- Show awareness of the competitive landscape — don't review tools in isolation

UNIQUENESS REQUIREMENT:
- Include at least one contrarian or non-obvious insight (e.g., "Everyone recommends X for Y, but actually Z works better because...")
- Highlight something most other reviews miss — a hidden feature, an underrated use case, or a surprising limitation
- Avoid generic statements that could apply to any tool — be specific and opinionated

SEO REQUIREMENTS:
- Naturally include the target keyword in the first 100 words
- Use keyword variations and LSI keywords throughout
- Keep paragraphs under 4 sentences
- Use bullet points and numbered lists liberally
- Target 2,500-3,500 words

INTERNAL LINKING RULES (CRITICAL):
- Include 5-10 internal links to other zerotoaiagents.com pages throughout the article
- Use ONLY the URLs from the AVAILABLE INTERNAL LINKS section below — do NOT invent URLs
- Use natural, keyword-rich anchor text (NOT "click here" or "read more")
- Good: <a href="https://zerotoaiagents.com/reviews/cursor">Cursor review</a>
- Spread links throughout the article — not all in one section
- Link to at least 2 alternative tool reviews for topical authority

SOURCE REFERENCES:
- Include a "Sources & References" section before the FAQ
- List 3-5 real, verifiable external sources
- Use real URLs from official sources: cursor.com, github.com, anthropic.com, etc.
- Do NOT invent source URLs

ANTI-HALLUCINATION RULES:
- Only mention real AI coding tools that exist
- Do not invent pricing — say "check their website for current pricing" if unsure
- Do not fabricate benchmarks or statistics
- When comparing tools, base comparisons on publicly known features
- Do NOT invent internal link URLs — only use URLs from the AVAILABLE INTERNAL LINKS list

AVAILABLE INTERNAL LINKS (use ONLY these for internal links):
${sitemapContext}

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown fences):
{
  "title": "Full article title",
  "excerpt": "2-3 sentence excerpt (max 160 chars)",
  "content": "<p>Full HTML content...</p>",
  "seoTitle": "SEO title (max 60 chars)",
  "seoDescription": "Meta description (max 155 chars)"
}`;
}

// Topic queue for content generation
const CONTENT_TOPICS = [
  // Reviews
  { topic: "Cursor AI Editor: Complete Review for Developers", type: "review" as const, slug: "cursor", keyword: "Cursor AI review" },
  { topic: "GitHub Copilot Review: Is It Worth It in 2026?", type: "review" as const, slug: "github-copilot", keyword: "GitHub Copilot review" },
  { topic: "Windsurf (Codeium) Review: The Free AI Coding Agent", type: "review" as const, slug: "windsurf", keyword: "Windsurf review" },
  { topic: "Claude Code Review: Anthropic's CLI Coding Agent", type: "review" as const, slug: "claude-code", keyword: "Claude Code review" },
  { topic: "Devin Review: The First AI Software Engineer", type: "review" as const, slug: "devin", keyword: "Devin AI review" },
  // Comparisons
  { topic: "Cursor vs GitHub Copilot: Which AI Coding Agent Wins?", type: "comparison" as const, slug: "cursor-vs-github-copilot", keyword: "Cursor vs GitHub Copilot" },
  { topic: "Cursor vs Windsurf: AI Code Editor Showdown", type: "comparison" as const, slug: "cursor-vs-windsurf", keyword: "Cursor vs Windsurf" },
  { topic: "GitHub Copilot vs Claude Code: IDE vs CLI Agent", type: "comparison" as const, slug: "github-copilot-vs-claude-code", keyword: "GitHub Copilot vs Claude Code" },
  { topic: "Devin vs Claude Code: Autonomous AI Agents Compared", type: "comparison" as const, slug: "devin-vs-claude-code", keyword: "Devin vs Claude Code" },
];

export async function generateContentForTopic(topicIndex: number): Promise<GeneratedContent | null> {
  if (topicIndex >= CONTENT_TOPICS.length) return null;

  const topic = CONTENT_TOPICS[topicIndex];
  console.log(`Generating content: ${topic.topic}`);

  const sitemapUrls = await loadSitemapLinks();
  const sitemapContext = groupLinks(sitemapUrls);

  const response = await generateContent({
    systemPrompt: buildSystemPrompt(sitemapContext),
    userPrompt: `Write a comprehensive ${topic.type} about:\n\n**Topic:** ${topic.topic}\n**Target Keyword:** ${topic.keyword}\n\nREMEMBER:\n- Include 5-10 internal links using ONLY URLs from the AVAILABLE INTERNAL LINKS list\n- Use keyword-rich anchor text\n- Add a "Sources & References" section with 3-5 real external sources\n\nWrite the full article following ALL guidelines. Output valid JSON only.`,
    temperature: 0.5,
    maxTokens: 16384,
  });

  let parsed: { title: string; excerpt: string; content: string; seoTitle: string; seoDescription: string };

  try {
    let raw = response.content.trim();
    if (raw.startsWith("```")) raw = raw.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
    parsed = JSON.parse(raw);
  } catch {
    console.error("Failed to parse AI response");
    return null;
  }

  if (!parsed.title || !parsed.content) {
    console.error("Missing required fields");
    return null;
  }

  return {
    title: parsed.title,
    slug: topic.slug,
    content: parsed.content,
    excerpt: parsed.excerpt?.slice(0, 300) || "",
    seoTitle: (parsed.seoTitle || parsed.title).slice(0, 70),
    seoDescription: (parsed.seoDescription || parsed.excerpt || "").slice(0, 160),
    type: topic.type,
  };
}
