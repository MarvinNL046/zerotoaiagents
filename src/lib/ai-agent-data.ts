// AiAgentData is the normalized type used throughout the frontend.
// It mirrors AiAgentProvider but with nullable fields to stay compatible
// with any future Convex-backed data source.
export type AiAgentData = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  screenshot: string | null;
  thumbnailImage: string | null;
  cardImage: string | null;
  ogImage: string | null;
  website: string;
  affiliateUrl: string;
  monthlyPrice: number;
  annualPrice: number;
  hasFreeTier: boolean;
  freeTierLimits: string | null;
  category: string;
  subcategory: string | null;
  modelsSupported: string[];
  integrations: string[];
  maxUsers: string;
  apiAccess: boolean;
  overallRating: number;
  easeOfUse: number;
  performance: number;
  valueForMoney: number;
  shortDescription: string | null;
  pros: string[];
  cons: string[];
  features: string[];
  bestFor: string | null;
  editorChoice: boolean;
  featured: boolean;
  sortOrder: number;
};

export type AgentCategory =
  | "coding-agents"
  | "no-code-builders"
  | "frameworks"
  | "enterprise"
  | "customer-support"
  | "general-purpose";

export interface AiAgentProvider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  affiliateUrl: string;

  // Pricing
  monthlyPrice: number;       // Starting price per month (0 if free only)
  annualPrice: number;         // Annual price per month equivalent
  hasFreeTier: boolean;
  freeTierLimits?: string;     // e.g. "100 messages/day"

  // Classification
  category: AgentCategory;
  subcategory?: string;

  // Capabilities
  modelsSupported: string[];   // e.g. ["GPT-4o", "Claude 3.5", "Gemini"]
  integrations: string[];      // e.g. ["Slack", "GitHub", "API"]
  maxUsers: string;            // e.g. "Unlimited", "5", "50"
  apiAccess: boolean;

  // Ratings (1-5 scale, one decimal)
  overallRating: number;
  easeOfUse: number;
  performance: number;
  valueForMoney: number;

  // Content
  shortDescription: string;
  pros: string[];
  cons: string[];
  features: string[];
  bestFor: string;             // One-liner: "Best for professional developers"

  // Display
  editorChoice: boolean;
  featured: boolean;
  sortOrder: number;
}

export const aiAgentProviders: AiAgentProvider[] = [
  // CODING AGENTS
  {
    id: "claude-code",
    name: "Claude Code",
    slug: "claude-code",
    logo: "/logos/claude-code.svg",
    website: "https://claude.ai/code",
    affiliateUrl: "https://go.zerotoaiagents.com/claude-code",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: false,
    category: "coding-agents",
    subcategory: "CLI Tools",
    modelsSupported: ["Claude Sonnet 4.5", "Claude Opus 4.6"],
    integrations: ["VS Code", "JetBrains", "Terminal", "GitHub", "GitLab"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.8,
    easeOfUse: 4.7,
    performance: 4.9,
    valueForMoney: 4.8,
    shortDescription: "Anthropic's official CLI coding agent with deep codebase understanding and autonomous task execution.",
    pros: [
      "Exceptional context window (200k tokens) for understanding large codebases",
      "Autonomous task execution with specialized subagents",
      "Native terminal integration with full system access",
      "Best-in-class code generation quality from Claude Opus 4.6",
      "Supports complex multi-file refactoring"
    ],
    cons: [
      "Requires Max subscription ($20/mo)",
      "CLI-only interface may have learning curve",
      "No real-time collaboration features",
      "Limited to Anthropic's models only"
    ],
    features: [
      "200k token context window",
      "Autonomous coding agents with task delegation",
      "Multi-file editing and refactoring",
      "Git integration and commit generation",
      "Support for 40+ programming languages",
      "Real-time error detection and fixes",
      "Custom agent workflows"
    ],
    bestFor: "Professional developers who want autonomous coding assistance with massive context",
    editorChoice: true,
    featured: true,
    sortOrder: 1
  },
  {
    id: "cursor",
    name: "Cursor",
    slug: "cursor",
    logo: "/logos/cursor.svg",
    website: "https://cursor.com",
    affiliateUrl: "https://go.zerotoaiagents.com/cursor",
    monthlyPrice: 20,
    annualPrice: 16,
    hasFreeTier: true,
    freeTierLimits: "50 cursor tab completions, 2 weeks premium trial",
    category: "coding-agents",
    subcategory: "IDE",
    modelsSupported: ["GPT-4o", "Claude 3.5 Sonnet", "Claude Opus", "Custom models"],
    integrations: ["GitHub", "GitLab", "Bitbucket"],
    maxUsers: "1",
    apiAccess: false,
    overallRating: 4.7,
    easeOfUse: 4.9,
    performance: 4.7,
    valueForMoney: 4.6,
    shortDescription: "AI-first code editor built on VS Code with intelligent autocomplete and chat-based editing.",
    pros: [
      "Familiar VS Code interface with AI superpowers",
      "Excellent inline code suggestions (Cursor Tab)",
      "Multi-model support (GPT-4, Claude, custom)",
      "Natural language to code conversion",
      "Privacy mode for sensitive codebases"
    ],
    cons: [
      "Subscription required for best features",
      "Can be slow with very large codebases",
      "Limited offline functionality",
      "Some VS Code extensions incompatible"
    ],
    features: [
      "Cursor Tab for intelligent autocomplete",
      "Chat-based code editing with context",
      "Multi-file search and edit",
      "Terminal integration",
      "Codebase-wide AI understanding",
      "Privacy mode (no code sent to servers)",
      "Custom model integration"
    ],
    bestFor: "Developers who want AI-powered VS Code with minimal learning curve",
    editorChoice: true,
    featured: true,
    sortOrder: 2
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    logo: "/logos/github-copilot.svg",
    website: "https://github.com/features/copilot",
    affiliateUrl: "https://go.zerotoaiagents.com/github-copilot",
    monthlyPrice: 10,
    annualPrice: 10,
    hasFreeTier: true,
    freeTierLimits: "Free for verified students and open-source maintainers",
    category: "coding-agents",
    subcategory: "IDE Plugin",
    modelsSupported: ["GPT-4o", "Claude 3.5 Sonnet", "Codex"],
    integrations: ["VS Code", "JetBrains", "Neovim", "Visual Studio", "Azure"],
    maxUsers: "1",
    apiAccess: false,
    overallRating: 4.6,
    easeOfUse: 4.8,
    performance: 4.5,
    valueForMoney: 4.7,
    shortDescription: "GitHub's AI pair programmer with real-time code suggestions and chat assistance.",
    pros: [
      "Most affordable premium AI coding tool ($10/mo)",
      "Works across multiple IDEs and editors",
      "Deep integration with GitHub ecosystem",
      "Free for students and open-source maintainers",
      "Strong community and documentation"
    ],
    cons: [
      "Suggestions can be hit-or-miss quality",
      "Limited codebase-wide understanding",
      "Chat feature less powerful than competitors",
      "Requires active GitHub account"
    ],
    features: [
      "Real-time code completions",
      "Multi-line suggestions",
      "GitHub Copilot Chat for Q&A",
      "Code explanation and documentation",
      "Test generation",
      "Bug detection and fixes",
      "Supports 12+ programming languages"
    ],
    bestFor: "Budget-conscious developers already using GitHub",
    editorChoice: false,
    featured: true,
    sortOrder: 3
  },
  {
    id: "windsurf",
    name: "Windsurf (Codeium)",
    slug: "windsurf",
    logo: "/logos/windsurf.svg",
    website: "https://codeium.com/windsurf",
    affiliateUrl: "https://go.zerotoaiagents.com/windsurf",
    monthlyPrice: 15,
    annualPrice: 12,
    hasFreeTier: true,
    freeTierLimits: "Unlimited basic completions, limited chat",
    category: "coding-agents",
    subcategory: "IDE",
    modelsSupported: ["Codeium proprietary", "GPT-4o"],
    integrations: ["VS Code", "JetBrains", "Web IDE"],
    maxUsers: "1",
    apiAccess: false,
    overallRating: 4.5,
    easeOfUse: 4.6,
    performance: 4.6,
    valueForMoney: 4.7,
    shortDescription: "AI-powered IDE with 'Cascade' AI agent that can understand and edit entire codebases.",
    pros: [
      "Generous free tier with unlimited completions",
      "Cascade agent can handle complex multi-file tasks",
      "Fast autocomplete with low latency",
      "Strong privacy protections (no training on your code)",
      "Good value compared to competitors"
    ],
    cons: [
      "Smaller user base than Cursor/Copilot",
      "IDE still in active development (occasional bugs)",
      "Limited model selection",
      "Documentation could be more comprehensive"
    ],
    features: [
      "Cascade AI agent for autonomous coding",
      "Unlimited autocomplete suggestions (free tier)",
      "Multi-file editing and refactoring",
      "Natural language to code",
      "Codebase search and understanding",
      "Terminal integration",
      "SOC 2 Type II certified"
    ],
    bestFor: "Developers wanting powerful AI coding with a generous free tier",
    editorChoice: false,
    featured: true,
    sortOrder: 4
  },
  {
    id: "replit-agent",
    name: "Replit Agent",
    slug: "replit-agent",
    logo: "/logos/replit-agent.svg",
    website: "https://replit.com/ai",
    affiliateUrl: "https://go.zerotoaiagents.com/replit-agent",
    monthlyPrice: 25,
    annualPrice: 20,
    hasFreeTier: false,
    category: "coding-agents",
    subcategory: "Cloud IDE",
    modelsSupported: ["Replit proprietary models", "GPT-4o"],
    integrations: ["Replit platform", "GitHub", "npm", "pip"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.7,
    performance: 4.2,
    valueForMoney: 4.1,
    shortDescription: "Autonomous AI that builds complete applications from natural language descriptions in Replit's cloud IDE.",
    pros: [
      "Can build full apps from scratch (frontend + backend)",
      "No local setup required (cloud-based)",
      "Automatic deployment and hosting",
      "Great for rapid prototyping",
      "Handles dependencies and environment setup"
    ],
    cons: [
      "Locked into Replit ecosystem",
      "Higher pricing than competitors",
      "Limited control over generated architecture",
      "Performance depends on Replit's servers"
    ],
    features: [
      "Full-stack app generation from prompts",
      "Automatic package installation",
      "Built-in hosting and deployment",
      "Real-time collaboration",
      "Database setup and integration",
      "API endpoint generation",
      "Multi-language support"
    ],
    bestFor: "Rapid prototyping and building full apps without local setup",
    editorChoice: false,
    featured: false,
    sortOrder: 5
  },
  {
    id: "devin",
    name: "Devin",
    slug: "devin",
    logo: "/logos/devin.svg",
    website: "https://devin.ai",
    affiliateUrl: "https://go.zerotoaiagents.com/devin",
    monthlyPrice: 500,
    annualPrice: 500,
    hasFreeTier: false,
    category: "coding-agents",
    subcategory: "Autonomous Agent",
    modelsSupported: ["Devin proprietary models"],
    integrations: ["GitHub", "GitLab", "Slack", "Linear", "Jira"],
    maxUsers: "Team-based",
    apiAccess: true,
    overallRating: 4.2,
    easeOfUse: 4.0,
    performance: 4.5,
    valueForMoney: 3.8,
    shortDescription: "Autonomous AI software engineer that can plan, code, test, and deploy entire features independently.",
    pros: [
      "Truly autonomous: can work on tasks for hours",
      "Handles entire development lifecycle",
      "Can debug and fix its own mistakes",
      "Strong planning and reasoning capabilities",
      "Integrated with professional dev tools"
    ],
    cons: [
      "Extremely expensive ($500/mo)",
      "Still in limited beta with waitlist",
      "Requires significant oversight and review",
      "Not suitable for complex architectural decisions"
    ],
    features: [
      "Autonomous task execution (hours-long)",
      "Code planning and architecture",
      "Bug fixing and debugging",
      "Test writing and execution",
      "Deployment and monitoring",
      "Integration with issue trackers",
      "Detailed execution logs"
    ],
    bestFor: "Enterprise teams needing autonomous development for routine tasks",
    editorChoice: false,
    featured: false,
    sortOrder: 6
  },
  {
    id: "amazon-q-developer",
    name: "Amazon Q Developer",
    slug: "amazon-q-developer",
    logo: "/logos/amazon-q-developer.svg",
    website: "https://aws.amazon.com/q/developer/",
    affiliateUrl: "https://go.zerotoaiagents.com/amazon-q-developer",
    monthlyPrice: 19,
    annualPrice: 19,
    hasFreeTier: true,
    freeTierLimits: "Limited monthly usage with AWS Free Tier",
    category: "coding-agents",
    subcategory: "Cloud-Native",
    modelsSupported: ["Amazon Bedrock models", "Claude", "GPT-4"],
    integrations: ["AWS", "VS Code", "JetBrains", "AWS Console", "CLI"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.1,
    easeOfUse: 4.2,
    performance: 4.3,
    valueForMoney: 4.4,
    shortDescription: "AWS-native AI coding assistant specialized in cloud development and infrastructure as code.",
    pros: [
      "Deep AWS integration and expertise",
      "Excellent for IaC (CloudFormation, Terraform)",
      "Security scanning and best practices",
      "Works within AWS Console",
      "Good value for AWS-heavy teams"
    ],
    cons: [
      "Primarily useful for AWS development",
      "Less powerful for non-AWS projects",
      "Learning curve for AWS ecosystem",
      "Limited model selection"
    ],
    features: [
      "AWS-specific code generation",
      "Infrastructure as Code assistance",
      "Security vulnerability scanning",
      "AWS best practices recommendations",
      "Multi-IDE support",
      "Code transformation and upgrades",
      "Cost optimization suggestions"
    ],
    bestFor: "Development teams building on AWS infrastructure",
    editorChoice: false,
    featured: false,
    sortOrder: 7
  },

  // NO-CODE BUILDERS
  {
    id: "n8n-ai",
    name: "n8n AI",
    slug: "n8n-ai",
    logo: "/logos/n8n-ai.svg",
    website: "https://n8n.io",
    affiliateUrl: "https://go.zerotoaiagents.com/n8n-ai",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: true,
    freeTierLimits: "Self-hosted community edition (unlimited)",
    category: "no-code-builders",
    subcategory: "Workflow Automation",
    modelsSupported: ["OpenAI", "Claude", "Gemini", "Local models"],
    integrations: ["400+ apps", "Slack", "Notion", "Airtable", "Gmail", "Webhooks"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.6,
    easeOfUse: 4.4,
    performance: 4.6,
    valueForMoney: 4.8,
    shortDescription: "Open-source workflow automation platform with powerful AI agent building capabilities.",
    pros: [
      "Fully open-source (can self-host for free)",
      "400+ pre-built integrations",
      "Visual workflow builder is intuitive",
      "Supports multiple AI models",
      "Active community and extensions"
    ],
    cons: [
      "Self-hosting requires technical knowledge",
      "UI can be overwhelming for beginners",
      "Some advanced features require coding",
      "Hosted version more expensive at scale"
    ],
    features: [
      "Visual workflow designer",
      "AI agent nodes (chat, embeddings, tools)",
      "Custom code execution (JavaScript/Python)",
      "Webhook triggers and responses",
      "Error handling and retries",
      "Scheduled and event-based triggers",
      "Version control and backups"
    ],
    bestFor: "Technical teams wanting full control over AI automation workflows",
    editorChoice: true,
    featured: true,
    sortOrder: 8
  },
  {
    id: "flowise",
    name: "Flowise",
    slug: "flowise",
    logo: "/logos/flowise.svg",
    website: "https://flowiseai.com",
    affiliateUrl: "https://go.zerotoaiagents.com/flowise",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Unlimited (open-source), hosted plans start at $35/mo",
    category: "no-code-builders",
    subcategory: "LLM Orchestration",
    modelsSupported: ["OpenAI", "Claude", "Gemini", "Hugging Face", "Local models"],
    integrations: ["LangChain", "API", "Webhooks", "Vector databases"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.5,
    performance: 4.2,
    valueForMoney: 4.7,
    shortDescription: "Open-source drag-and-drop tool for building LLM orchestration flows and chatbots visually.",
    pros: [
      "Completely free and open-source",
      "Visual LangChain builder (no coding needed)",
      "Easy chatbot deployment",
      "Built-in vector database support",
      "Growing library of templates"
    ],
    cons: [
      "Limited compared to coding frameworks",
      "Hosted version is expensive ($35+/mo)",
      "Documentation could be better",
      "Fewer integrations than enterprise tools"
    ],
    features: [
      "Drag-and-drop LLM flow builder",
      "RAG (Retrieval Augmented Generation) support",
      "Multiple vector database connectors",
      "Chatbot UI included",
      "API endpoint generation",
      "Prompt chaining and loops",
      "Self-hosting with Docker"
    ],
    bestFor: "Developers building custom LLM applications without writing LangChain code",
    editorChoice: false,
    featured: true,
    sortOrder: 9
  },
  {
    id: "relevance-ai",
    name: "Relevance AI",
    slug: "relevance-ai",
    logo: "/logos/relevance-ai.svg",
    website: "https://relevanceai.com",
    affiliateUrl: "https://go.zerotoaiagents.com/relevance-ai",
    monthlyPrice: 19,
    annualPrice: 15,
    hasFreeTier: true,
    freeTierLimits: "200 credits/month (~50 agent runs)",
    category: "no-code-builders",
    subcategory: "Agent Builder",
    modelsSupported: ["OpenAI", "Claude", "Gemini", "Cohere"],
    integrations: ["Zapier", "Make", "API", "Webhooks", "Airtable"],
    maxUsers: "5",
    apiAccess: true,
    overallRating: 4.4,
    easeOfUse: 4.7,
    performance: 4.3,
    valueForMoney: 4.3,
    shortDescription: "No-code platform for building and deploying custom AI agents with tools and memory.",
    pros: [
      "Very user-friendly interface",
      "Built-in agent templates",
      "Tool/function calling support",
      "Agent memory and context management",
      "Good documentation and tutorials"
    ],
    cons: [
      "Credit system can be confusing",
      "More expensive at scale",
      "Limited customization vs coding",
      "Smaller integration library"
    ],
    features: [
      "Visual agent builder",
      "Multi-step agent workflows",
      "Custom tool integration",
      "Agent memory and state",
      "API and webhook access",
      "Prompt template library",
      "Usage analytics and monitoring"
    ],
    bestFor: "Non-technical teams building custom AI agents quickly",
    editorChoice: false,
    featured: true,
    sortOrder: 10
  },
  {
    id: "make-ai",
    name: "Make (with AI)",
    slug: "make-ai",
    logo: "/logos/make-ai.svg",
    website: "https://www.make.com",
    affiliateUrl: "https://go.zerotoaiagents.com/make-ai",
    monthlyPrice: 9,
    annualPrice: 9,
    hasFreeTier: true,
    freeTierLimits: "1,000 operations/month",
    category: "no-code-builders",
    subcategory: "Workflow Automation",
    modelsSupported: ["OpenAI", "Claude", "Custom API models"],
    integrations: ["1,500+ apps", "OpenAI", "Slack", "Google", "Microsoft"],
    maxUsers: "2",
    apiAccess: true,
    overallRating: 4.5,
    easeOfUse: 4.6,
    performance: 4.5,
    valueForMoney: 4.6,
    shortDescription: "Visual automation platform with AI modules for building intelligent workflows without code.",
    pros: [
      "Huge app ecosystem (1,500+ integrations)",
      "Intuitive visual interface",
      "Powerful AI modules (OpenAI, Claude)",
      "Affordable entry-level pricing",
      "Strong error handling and debugging"
    ],
    cons: [
      "Costs scale quickly with operations",
      "AI features require separate API keys",
      "Learning curve for complex scenarios",
      "Some apps have limited triggers"
    ],
    features: [
      "Visual workflow builder",
      "OpenAI and Claude modules",
      "Conditional logic and routing",
      "Error handling and retries",
      "Scheduled and webhook triggers",
      "Data transformation tools",
      "Team collaboration"
    ],
    bestFor: "Small businesses automating workflows with AI components",
    editorChoice: false,
    featured: true,
    sortOrder: 11
  },
  {
    id: "zapier-central",
    name: "Zapier AI (Central)",
    slug: "zapier-central",
    logo: "/logos/zapier-central.svg",
    website: "https://zapier.com/central",
    affiliateUrl: "https://go.zerotoaiagents.com/zapier-central",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: false,
    category: "no-code-builders",
    subcategory: "AI Automation",
    modelsSupported: ["OpenAI GPT-4", "Claude", "Zapier AI"],
    integrations: ["6,000+ apps", "ChatGPT", "Slack", "Gmail", "CRM tools"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.4,
    easeOfUse: 4.8,
    performance: 4.3,
    valueForMoney: 4.2,
    shortDescription: "AI-powered automation platform that lets you create workflows using natural language commands.",
    pros: [
      "Largest app ecosystem (6,000+ integrations)",
      "Natural language workflow creation",
      "Extremely user-friendly",
      "Strong brand and reliability",
      "Great for non-technical users"
    ],
    cons: [
      "Expensive compared to alternatives",
      "AI features still in beta",
      "Task limits can be restrictive",
      "Limited customization"
    ],
    features: [
      "Natural language automation builder",
      "AI-suggested workflows",
      "Multi-step Zaps with AI logic",
      "6,000+ app integrations",
      "AI-powered data formatting",
      "Automatic error recovery",
      "Team collaboration tools"
    ],
    bestFor: "Non-technical users wanting AI automation across many apps",
    editorChoice: false,
    featured: false,
    sortOrder: 12
  },

  // FRAMEWORKS
  {
    id: "crewai",
    name: "CrewAI",
    slug: "crewai",
    logo: "/logos/crewai.svg",
    website: "https://www.crewai.com",
    affiliateUrl: "https://go.zerotoaiagents.com/crewai",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Unlimited (open-source), Enterprise: $200/mo",
    category: "frameworks",
    subcategory: "Multi-Agent Framework",
    modelsSupported: ["OpenAI", "Claude", "Gemini", "Local models", "Custom APIs"],
    integrations: ["Python", "LangChain", "API", "Custom tools"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.5,
    easeOfUse: 4.3,
    performance: 4.6,
    valueForMoney: 5.0,
    shortDescription: "Open-source framework for orchestrating role-playing autonomous AI agents working together as a crew.",
    pros: [
      "Completely free and open-source",
      "Powerful multi-agent collaboration",
      "Role-based agent design is intuitive",
      "Strong community and examples",
      "Active development and updates"
    ],
    cons: [
      "Requires Python programming skills",
      "Learning curve for agent orchestration",
      "Documentation could be more comprehensive",
      "Debugging multi-agent systems is complex"
    ],
    features: [
      "Role-based agent system",
      "Sequential and parallel task execution",
      "Custom tool integration",
      "Memory and context management",
      "Agent delegation and collaboration",
      "Process flow control",
      "Built-in observability"
    ],
    bestFor: "Python developers building complex multi-agent AI systems",
    editorChoice: true,
    featured: true,
    sortOrder: 13
  },
  {
    id: "autogen",
    name: "AutoGen (Microsoft)",
    slug: "autogen",
    logo: "/logos/autogen.svg",
    website: "https://microsoft.github.io/autogen/",
    affiliateUrl: "https://go.zerotoaiagents.com/autogen",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Unlimited (open-source)",
    category: "frameworks",
    subcategory: "Multi-Agent Framework",
    modelsSupported: ["OpenAI", "Azure OpenAI", "Claude", "Local models"],
    integrations: ["Python", "Azure", "API", "Custom functions"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.0,
    performance: 4.4,
    valueForMoney: 5.0,
    shortDescription: "Microsoft's open-source framework for building conversational multi-agent systems with human feedback.",
    pros: [
      "Free and open-source from Microsoft",
      "Excellent for conversational agents",
      "Human-in-the-loop support",
      "Strong Azure integration",
      "Research-backed architecture"
    ],
    cons: [
      "Steeper learning curve than alternatives",
      "Documentation can be technical",
      "Smaller community than LangChain",
      "Requires solid Python skills"
    ],
    features: [
      "Conversable agent framework",
      "Human-in-the-loop workflows",
      "Group chat for multi-agent collaboration",
      "Code execution capabilities",
      "Custom tool/function support",
      "Caching and cost optimization",
      "Integration with Azure services"
    ],
    bestFor: "Research teams and enterprises building conversational AI systems",
    editorChoice: false,
    featured: true,
    sortOrder: 14
  },
  {
    id: "langgraph",
    name: "LangGraph",
    slug: "langgraph",
    logo: "/logos/langgraph.svg",
    website: "https://langchain-ai.github.io/langgraph/",
    affiliateUrl: "https://go.zerotoaiagents.com/langgraph",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Unlimited (open-source)",
    category: "frameworks",
    subcategory: "Agent Orchestration",
    modelsSupported: ["OpenAI", "Claude", "Gemini", "Any LangChain model"],
    integrations: ["Python", "JavaScript", "LangChain", "LangSmith"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.4,
    easeOfUse: 4.2,
    performance: 4.5,
    valueForMoney: 5.0,
    shortDescription: "LangChain's graph-based framework for building stateful, cyclic agent workflows with loops and persistence.",
    pros: [
      "Free and open-source",
      "Graph-based design for complex flows",
      "Built-in state persistence",
      "Excellent for cyclic workflows",
      "Strong LangChain ecosystem integration"
    ],
    cons: [
      "Requires understanding of graph concepts",
      "More complex than simple agent frameworks",
      "Documentation still evolving",
      "Python/JS knowledge required"
    ],
    features: [
      "Graph-based workflow orchestration",
      "Stateful agent execution",
      "Cyclic flows and loops",
      "Checkpointing and persistence",
      "Human-in-the-loop support",
      "Parallel execution",
      "LangSmith tracing integration"
    ],
    bestFor: "Developers building complex stateful AI agent workflows",
    editorChoice: true,
    featured: true,
    sortOrder: 15
  },
  {
    id: "agentgpt",
    name: "AgentGPT",
    slug: "agentgpt",
    logo: "/logos/agentgpt.svg",
    website: "https://agentgpt.reworkd.ai",
    affiliateUrl: "https://go.zerotoaiagents.com/agentgpt",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Limited free runs, Pro: $40/mo",
    category: "frameworks",
    subcategory: "Autonomous Agent",
    modelsSupported: ["OpenAI GPT-4", "GPT-3.5"],
    integrations: ["Web browser", "API"],
    maxUsers: "1",
    apiAccess: false,
    overallRating: 4.0,
    easeOfUse: 4.8,
    performance: 3.8,
    valueForMoney: 4.0,
    shortDescription: "Browser-based autonomous AI agent that breaks down goals into tasks and executes them independently.",
    pros: [
      "No installation required (web-based)",
      "Extremely easy to use",
      "Good for simple autonomous tasks",
      "Open-source version available",
      "Quick prototyping"
    ],
    cons: [
      "Limited capabilities vs coding frameworks",
      "Can go off-track on complex tasks",
      "Free tier very limited",
      "Less control than code-based agents"
    ],
    features: [
      "Browser-based agent interface",
      "Autonomous goal execution",
      "Task breakdown and planning",
      "Web search capabilities",
      "Iteration and self-correction",
      "Execution logs and tracking",
      "Custom agent naming"
    ],
    bestFor: "Non-developers experimenting with autonomous AI agents",
    editorChoice: false,
    featured: false,
    sortOrder: 16
  },

  // ENTERPRISE
  {
    id: "salesforce-agentforce",
    name: "Salesforce Agentforce",
    slug: "salesforce-agentforce",
    logo: "/logos/salesforce-agentforce.svg",
    website: "https://www.salesforce.com/agentforce/",
    affiliateUrl: "https://go.zerotoaiagents.com/salesforce-agentforce",
    monthlyPrice: 2,
    annualPrice: 2,
    hasFreeTier: false,
    freeTierLimits: "Priced per conversation (~$2)",
    category: "enterprise",
    subcategory: "CRM AI",
    modelsSupported: ["Einstein AI", "OpenAI", "Claude"],
    integrations: ["Salesforce CRM", "Slack", "Microsoft Teams", "MuleSoft"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.2,
    performance: 4.4,
    valueForMoney: 4.0,
    shortDescription: "Enterprise AI agents deeply integrated with Salesforce CRM for autonomous customer service and sales.",
    pros: [
      "Seamless Salesforce integration",
      "Pre-built CRM workflows",
      "Enterprise-grade security",
      "Autonomous customer service agents",
      "Scalable to large organizations"
    ],
    cons: [
      "Requires Salesforce ecosystem",
      "Complex setup and configuration",
      "Pricing per conversation can add up",
      "Steep learning curve"
    ],
    features: [
      "Pre-built CRM agents",
      "Autonomous case resolution",
      "Sales process automation",
      "Multi-channel support (chat, email, voice)",
      "CRM data integration",
      "Analytics and reporting",
      "Custom agent builder"
    ],
    bestFor: "Enterprise teams using Salesforce for automated CRM workflows",
    editorChoice: false,
    featured: true,
    sortOrder: 17
  },
  {
    id: "microsoft-copilot-studio",
    name: "Microsoft Copilot Studio",
    slug: "microsoft-copilot-studio",
    logo: "/logos/microsoft-copilot-studio.svg",
    website: "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio",
    affiliateUrl: "https://go.zerotoaiagents.com/microsoft-copilot-studio",
    monthlyPrice: 200,
    annualPrice: 200,
    hasFreeTier: false,
    category: "enterprise",
    subcategory: "Enterprise Platform",
    modelsSupported: ["Azure OpenAI", "GPT-4", "Custom models"],
    integrations: ["Microsoft 365", "Teams", "Power Platform", "Dynamics 365"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.4,
    easeOfUse: 4.3,
    performance: 4.5,
    valueForMoney: 4.2,
    shortDescription: "Enterprise platform for building custom AI copilots integrated with Microsoft 365 and Power Platform.",
    pros: [
      "Deep Microsoft ecosystem integration",
      "No-code/low-code builder",
      "Enterprise security and compliance",
      "Powerful automation with Power Platform",
      "Supports both DIY and professional dev"
    ],
    cons: [
      "Expensive for small teams",
      "Requires Microsoft 365 subscription",
      "Complex licensing model",
      "Learning curve for Power Platform"
    ],
    features: [
      "Visual copilot builder",
      "Microsoft 365 integration",
      "Power Automate workflows",
      "Custom connectors and plugins",
      "Teams deployment",
      "Analytics dashboard",
      "Enterprise governance"
    ],
    bestFor: "Enterprises building custom AI assistants across Microsoft products",
    editorChoice: false,
    featured: true,
    sortOrder: 18
  },
  {
    id: "google-vertex-ai-agent-builder",
    name: "Google Vertex AI Agent Builder",
    slug: "google-vertex-ai-agent-builder",
    logo: "/logos/google-vertex-ai-agent-builder.svg",
    website: "https://cloud.google.com/products/agent-builder",
    affiliateUrl: "https://go.zerotoaiagents.com/google-vertex-ai-agent-builder",
    monthlyPrice: 0,
    annualPrice: 0,
    hasFreeTier: true,
    freeTierLimits: "Pay-per-use pricing (varies by usage)",
    category: "enterprise",
    subcategory: "Cloud AI Platform",
    modelsSupported: ["Gemini 2.5", "PaLM 2", "Custom models"],
    integrations: ["Google Cloud", "BigQuery", "Firestore", "API"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.0,
    performance: 4.5,
    valueForMoney: 4.3,
    shortDescription: "Google Cloud's platform for building AI agents with Gemini, optimized for enterprise search and chat.",
    pros: [
      "Powered by latest Gemini models",
      "Strong search and retrieval capabilities",
      "Scales with Google Cloud infrastructure",
      "Pay-per-use pricing model",
      "Good for data-heavy applications"
    ],
    cons: [
      "Requires Google Cloud knowledge",
      "Pricing can be unpredictable",
      "Less mature than competitors",
      "Documentation could be better"
    ],
    features: [
      "Gemini-powered agents",
      "Enterprise search integration",
      "RAG (Retrieval Augmented Generation)",
      "Custom data connectors",
      "Multi-turn conversations",
      "BigQuery integration",
      "Vertex AI ecosystem access"
    ],
    bestFor: "Enterprises on Google Cloud building search and chat agents",
    editorChoice: false,
    featured: false,
    sortOrder: 19
  },

  // CUSTOMER SUPPORT
  {
    id: "intercom-fin",
    name: "Intercom Fin",
    slug: "intercom-fin",
    logo: "/logos/intercom-fin.svg",
    website: "https://www.intercom.com/fin",
    affiliateUrl: "https://go.zerotoaiagents.com/intercom-fin",
    monthlyPrice: 0.99,
    annualPrice: 0.99,
    hasFreeTier: false,
    freeTierLimits: "$0.99 per resolution",
    category: "customer-support",
    subcategory: "AI Support Bot",
    modelsSupported: ["Intercom proprietary AI", "GPT-4"],
    integrations: ["Intercom", "Slack", "Salesforce", "HubSpot", "Zendesk"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.5,
    easeOfUse: 4.7,
    performance: 4.6,
    valueForMoney: 4.4,
    shortDescription: "AI customer service agent that resolves support tickets autonomously using your knowledge base.",
    pros: [
      "Pay per resolution (very cost-effective)",
      "High resolution rate (40-60%)",
      "Easy setup with existing Intercom",
      "Learns from your knowledge base",
      "Seamless handoff to human agents"
    ],
    cons: [
      "Requires Intercom subscription",
      "Limited to text-based support",
      "Can struggle with complex issues",
      "Customization options limited"
    ],
    features: [
      "Autonomous ticket resolution",
      "Knowledge base integration",
      "Multi-language support",
      "Seamless human handoff",
      "Conversation analytics",
      "Custom workflows",
      "Resolution quality scoring"
    ],
    bestFor: "Companies using Intercom wanting AI to handle routine support queries",
    editorChoice: true,
    featured: true,
    sortOrder: 20
  },
  {
    id: "zendesk-ai",
    name: "Zendesk AI",
    slug: "zendesk-ai",
    logo: "/logos/zendesk-ai.svg",
    website: "https://www.zendesk.com/ai/",
    affiliateUrl: "https://go.zerotoaiagents.com/zendesk-ai",
    monthlyPrice: 55,
    annualPrice: 55,
    hasFreeTier: false,
    category: "customer-support",
    subcategory: "AI Support Platform",
    modelsSupported: ["Zendesk AI", "OpenAI GPT-4"],
    integrations: ["Zendesk Suite", "Slack", "Salesforce", "Jira"],
    maxUsers: "Per agent pricing",
    apiAccess: true,
    overallRating: 4.3,
    easeOfUse: 4.4,
    performance: 4.3,
    valueForMoney: 4.1,
    shortDescription: "AI-powered customer support platform with intelligent routing, auto-responses, and analytics.",
    pros: [
      "Comprehensive support platform",
      "Intelligent ticket routing",
      "Multi-channel support (email, chat, phone)",
      "Strong analytics and reporting",
      "Enterprise-grade reliability"
    ],
    cons: [
      "Expensive per-agent pricing",
      "Requires full Zendesk ecosystem",
      "Complex setup process",
      "AI features require higher tiers"
    ],
    features: [
      "AI-powered ticket routing",
      "Auto-responses and suggestions",
      "Intent detection",
      "Sentiment analysis",
      "Agent assist (answer suggestions)",
      "Multi-language support",
      "Performance analytics"
    ],
    bestFor: "Medium to large companies needing comprehensive AI support platform",
    editorChoice: false,
    featured: true,
    sortOrder: 21
  },
  {
    id: "ada-ai",
    name: "Ada",
    slug: "ada-ai",
    logo: "/logos/ada-ai.svg",
    website: "https://www.ada.cx",
    affiliateUrl: "https://go.zerotoaiagents.com/ada-ai",
    monthlyPrice: 500,
    annualPrice: 500,
    hasFreeTier: false,
    freeTierLimits: "Custom pricing (~$500/mo starting)",
    category: "customer-support",
    subcategory: "Conversational AI",
    modelsSupported: ["Ada proprietary AI", "GPT-4"],
    integrations: ["Zendesk", "Salesforce", "Shopify", "Slack", "Custom APIs"],
    maxUsers: "Unlimited",
    apiAccess: true,
    overallRating: 4.4,
    easeOfUse: 4.5,
    performance: 4.5,
    valueForMoney: 4.2,
    shortDescription: "Enterprise conversational AI platform for automated customer service across channels.",
    pros: [
      "Very high automation rates (70%+)",
      "No-code bot builder",
      "Multi-channel deployment",
      "Strong analytics and insights",
      "Dedicated customer success team"
    ],
    cons: [
      "Expensive for small businesses",
      "Custom pricing (not transparent)",
      "Setup requires professional services",
      "Long implementation timeline"
    ],
    features: [
      "No-code conversation builder",
      "Multi-channel deployment",
      "Proactive messaging",
      "Customer data integration",
      "A/B testing",
      "Advanced analytics",
      "Enterprise security"
    ],
    bestFor: "Enterprise companies needing high-volume automated customer service",
    editorChoice: false,
    featured: false,
    sortOrder: 22
  },

  // GENERAL PURPOSE
  {
    id: "chatgpt",
    name: "ChatGPT (OpenAI)",
    slug: "chatgpt",
    logo: "/logos/chatgpt.svg",
    website: "https://openai.com/chatgpt",
    affiliateUrl: "https://go.zerotoaiagents.com/chatgpt",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: true,
    freeTierLimits: "GPT-4o mini, limited usage, no advanced features",
    category: "general-purpose",
    subcategory: "AI Assistant",
    modelsSupported: ["GPT-4o", "o1", "o3-mini", "DALL-E 3", "Sora"],
    integrations: ["API", "Custom GPTs", "Plugins", "Web browsing", "Code interpreter"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.7,
    easeOfUse: 4.9,
    performance: 4.8,
    valueForMoney: 4.6,
    shortDescription: "OpenAI's flagship conversational AI assistant with advanced reasoning, coding, and creative capabilities.",
    pros: [
      "Most well-known AI assistant",
      "Excellent for coding and reasoning",
      "Custom GPTs marketplace",
      "Strong plugin ecosystem",
      "Web browsing and real-time data"
    ],
    cons: [
      "Can be slow during peak times",
      "Pro tier very expensive ($200/mo)",
      "Privacy concerns with data usage",
      "Free tier very limited"
    ],
    features: [
      "Advanced conversational AI",
      "Code generation and debugging",
      "Web search and real-time info",
      "Image generation (DALL-E 3)",
      "File uploads and analysis",
      "Custom GPT creation",
      "Voice conversations"
    ],
    bestFor: "Everyone - coding, writing, research, and general productivity",
    editorChoice: true,
    featured: true,
    sortOrder: 23
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    slug: "claude",
    logo: "/logos/claude.svg",
    website: "https://claude.ai",
    affiliateUrl: "https://go.zerotoaiagents.com/claude",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: true,
    freeTierLimits: "Limited usage, older models only",
    category: "general-purpose",
    subcategory: "AI Assistant",
    modelsSupported: ["Claude Sonnet 4.5", "Claude Opus 4.6", "Claude Haiku 4"],
    integrations: ["API", "MCP (Model Context Protocol)", "Artifacts"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.8,
    easeOfUse: 4.8,
    performance: 4.9,
    valueForMoney: 4.8,
    shortDescription: "Anthropic's AI assistant known for helpful, harmless, and honest responses with exceptional reasoning.",
    pros: [
      "Best-in-class reasoning and coding",
      "Extremely accurate and thoughtful",
      "200k context window (largest available)",
      "Strong safety and alignment",
      "Artifacts for interactive content"
    ],
    cons: [
      "No image generation",
      "No web browsing (yet)",
      "Smaller plugin ecosystem than ChatGPT",
      "Free tier very limited"
    ],
    features: [
      "200k token context window",
      "Advanced reasoning and analysis",
      "Code generation and debugging",
      "Artifacts (interactive content)",
      "Document analysis (PDFs, images)",
      "Project knowledge organization",
      "Claude Code (CLI) integration"
    ],
    bestFor: "Professionals needing deep analysis, coding, and long-form content",
    editorChoice: true,
    featured: true,
    sortOrder: 24
  },
  {
    id: "gemini",
    name: "Gemini (Google)",
    slug: "gemini",
    logo: "/logos/gemini.svg",
    website: "https://gemini.google.com",
    affiliateUrl: "https://go.zerotoaiagents.com/gemini",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: true,
    freeTierLimits: "Limited usage, Gemini 2.5 Flash",
    category: "general-purpose",
    subcategory: "AI Assistant",
    modelsSupported: ["Gemini 2.5 Pro", "Gemini 2.5 Flash"],
    integrations: ["Google Workspace", "Gmail", "Drive", "Docs", "API"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.5,
    easeOfUse: 4.7,
    performance: 4.6,
    valueForMoney: 4.5,
    shortDescription: "Google's multimodal AI assistant with deep integration across Google Workspace and services.",
    pros: [
      "Excellent Google Workspace integration",
      "Strong multimodal capabilities",
      "Real-time information via Google Search",
      "Good for research and fact-checking",
      "Competitive pricing"
    ],
    cons: [
      "Less powerful for complex coding",
      "Occasional inaccuracies",
      "Limited third-party integrations",
      "Privacy concerns with Google"
    ],
    features: [
      "Multimodal understanding (text, images, video)",
      "Google Search integration",
      "Gmail and Drive integration",
      "Document analysis",
      "Code generation",
      "Extensions for Workspace",
      "2M token context window"
    ],
    bestFor: "Google Workspace users wanting AI integrated with their workflow",
    editorChoice: false,
    featured: true,
    sortOrder: 25
  },
  {
    id: "perplexity",
    name: "Perplexity",
    slug: "perplexity",
    logo: "/logos/perplexity.svg",
    website: "https://www.perplexity.ai",
    affiliateUrl: "https://go.zerotoaiagents.com/perplexity",
    monthlyPrice: 20,
    annualPrice: 20,
    hasFreeTier: true,
    freeTierLimits: "Limited Pro searches, basic model",
    category: "general-purpose",
    subcategory: "AI Research",
    modelsSupported: ["Perplexity proprietary", "GPT-4o", "Claude", "Gemini"],
    integrations: ["API", "Web search", "Citations"],
    maxUsers: "1",
    apiAccess: true,
    overallRating: 4.6,
    easeOfUse: 4.8,
    performance: 4.5,
    valueForMoney: 4.6,
    shortDescription: "AI-powered research assistant that provides cited answers by searching and synthesizing web sources.",
    pros: [
      "Excellent for research and fact-checking",
      "Always provides citations and sources",
      "Clean, focused interface",
      "Multi-model support (GPT-4, Claude, etc.)",
      "Unlimited file uploads (Pro)"
    ],
    cons: [
      "Limited for creative writing",
      "No code execution",
      "Free tier very restricted",
      "Sometimes cites low-quality sources"
    ],
    features: [
      "AI-powered web search",
      "Cited and sourced answers",
      "Multi-model selection",
      "Focus modes (academic, writing, etc.)",
      "File uploads and analysis",
      "Thread-based conversations",
      "API access"
    ],
    bestFor: "Researchers, students, and fact-checkers needing cited answers",
    editorChoice: false,
    featured: true,
    sortOrder: 26
  }
];

// Helper functions
export function getAgentsByCategory(category: AgentCategory): AiAgentProvider[] {
  return aiAgentProviders
    .filter(agent => agent.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedAgents(): AiAgentProvider[] {
  return aiAgentProviders
    .filter(agent => agent.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAgentBySlug(slug: string): AiAgentProvider | undefined {
  return aiAgentProviders.find(agent => agent.slug === slug);
}

export function getEditorChoiceAgents(): AiAgentProvider[] {
  return aiAgentProviders
    .filter(agent => agent.editorChoice)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllCategories(): AgentCategory[] {
  return [
    "coding-agents",
    "no-code-builders",
    "frameworks",
    "enterprise",
    "customer-support",
    "general-purpose"
  ];
}

export function getCategoryDisplayName(category: AgentCategory): string {
  const names: Record<AgentCategory, string> = {
    "coding-agents": "Coding Agents",
    "no-code-builders": "No-Code Builders",
    "frameworks": "Frameworks",
    "enterprise": "Enterprise",
    "customer-support": "Customer Support",
    "general-purpose": "General Purpose"
  };
  return names[category];
}
