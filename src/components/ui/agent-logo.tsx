"use client";

import { cn } from "@/lib/utils";

interface AgentLogoProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Color palette for AI agent brands (based on actual brand colors)
const brandColors: Record<string, { bg: string; text: string }> = {
  cursor: { bg: "#000000", text: "#FFFFFF" },
  claude: { bg: "#D97757", text: "#FFFFFF" },
  claudecode: { bg: "#D97757", text: "#FFFFFF" },
  chatgpt: { bg: "#10A37F", text: "#FFFFFF" },
  openai: { bg: "#10A37F", text: "#FFFFFF" },
  githubcopilot: { bg: "#000000", text: "#FFFFFF" },
  windsurf: { bg: "#00C4B4", text: "#FFFFFF" },
  codeium: { bg: "#09B6A2", text: "#FFFFFF" },
  replitagent: { bg: "#F26207", text: "#FFFFFF" },
  replit: { bg: "#F26207", text: "#FFFFFF" },
  devin: { bg: "#6366F1", text: "#FFFFFF" },
  amazonqdeveloper: { bg: "#FF9900", text: "#1A1A2E" },
  n8n: { bg: "#EA4B71", text: "#FFFFFF" },
  flowise: { bg: "#5046E5", text: "#FFFFFF" },
  relevanceai: { bg: "#3B82F6", text: "#FFFFFF" },
  make: { bg: "#6D00CC", text: "#FFFFFF" },
  zapier: { bg: "#FF4A00", text: "#FFFFFF" },
  crewai: { bg: "#FF6B35", text: "#FFFFFF" },
  autogen: { bg: "#0078D4", text: "#FFFFFF" },
  langgraph: { bg: "#1C3C3C", text: "#FFFFFF" },
  agentgpt: { bg: "#A855F7", text: "#FFFFFF" },
  salesforceagentforce: { bg: "#00A1E0", text: "#FFFFFF" },
  salesforce: { bg: "#00A1E0", text: "#FFFFFF" },
  microsoftcopilotstudio: { bg: "#0078D4", text: "#FFFFFF" },
  googlevertexai: { bg: "#4285F4", text: "#FFFFFF" },
  gemini: { bg: "#4285F4", text: "#FFFFFF" },
  intercomfin: { bg: "#6AFDEF", text: "#1A1A2E" },
  zendeskai: { bg: "#03363D", text: "#FFFFFF" },
  ada: { bg: "#7C3AED", text: "#FFFFFF" },
  perplexity: { bg: "#20808D", text: "#FFFFFF" },
};

// Get initials from agent name
function getInitials(name: string): string {
  const cleanName = name.replace(/\s*(ai|agent|studio|developer)\s*/gi, " ").trim();

  // Special cases
  if (name.toLowerCase().includes("n8n")) return "n8n";
  if (name.toLowerCase().includes("chatgpt")) return "GPT";
  if (name.toLowerCase().includes("claude code")) return "CC";
  if (name.toLowerCase().includes("claude")) return "CL";
  if (name.toLowerCase().includes("gemini")) return "GEM";

  // Get first letter or first letters of each word
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words.map(w => w[0]).join("").toUpperCase().slice(0, 3);
  }

  return cleanName.slice(0, 2).toUpperCase();
}

// Get colors for an agent
function getColors(name: string): { bg: string; text: string } {
  const slug = name.toLowerCase().replace(/[\s-]+/g, "").replace(/(ai|agent)$/i, "");
  // Try exact match first, then partial match
  if (brandColors[slug]) return brandColors[slug];
  const fullSlug = name.toLowerCase().replace(/[\s-]+/g, "");
  if (brandColors[fullSlug]) return brandColors[fullSlug];
  return { bg: "#6366F1", text: "#FFFFFF" };
}

const sizes = {
  sm: { width: 32, height: 32, fontSize: 10 },
  md: { width: 48, height: 48, fontSize: 14 },
  lg: { width: 64, height: 64, fontSize: 18 },
};

export function AgentLogo({ name, className, size = "md" }: AgentLogoProps) {
  const initials = getInitials(name);
  const colors = getColors(name);
  const { width, height, fontSize } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label={`${name} logo`}
    >
      {/* Rounded square shape */}
      <rect x="4" y="4" width="40" height="40" rx="10" fill={colors.bg} />
      {/* Subtle gradient overlay */}
      <defs>
        <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="10" fill={`url(#grad-${name})`} />
      {/* Text */}
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={colors.text}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
