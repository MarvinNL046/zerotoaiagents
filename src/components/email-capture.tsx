"use client";

import { useState } from "react";

type Variant = "inline" | "footer" | "hero";

interface EmailCaptureProps {
  variant?: Variant;
  heading?: string;
  subtext?: string;
  buttonText?: string;
  className?: string;
}

export function EmailCapture({
  variant = "inline",
  heading,
  subtext,
  buttonText,
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const defaults: Record<Variant, { heading: string; subtext: string; buttonText: string }> = {
    inline: {
      heading: "Stay Updated on AI Coding Agents",
      subtext: "Get weekly reviews, comparisons, and tips. No spam, unsubscribe anytime.",
      buttonText: "Subscribe",
    },
    footer: {
      heading: "Newsletter",
      subtext: "Weekly AI coding agent updates",
      buttonText: "Subscribe",
    },
    hero: {
      heading: "Get AI Agent Updates",
      subtext: "Reviews, comparisons, and guides delivered weekly. Free forever.",
      buttonText: "Get Free Updates",
    },
  };

  const d = defaults[variant];
  const h = heading || d.heading;
  const s = subtext || d.subtext;
  const b = buttonText || d.buttonText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, site: "zerotoaiagents", locale: "en" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-green-500 font-semibold">You&apos;re subscribed! Welcome aboard.</p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <h4 className="text-white font-semibold mb-4">{h}</h4>
        <p className="text-slate-400 text-sm mb-3">{s}</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {status === "loading" ? "..." : b}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={className}>
        <h3 className="text-lg font-bold mb-1">{h}</h3>
        <p className="text-sm text-slate-300 mb-3">{s}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full border border-slate-600 bg-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "..." : b}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
        )}
        <p className="text-xs text-slate-500 mt-2">No spam, unsubscribe anytime.</p>
      </div>
    );
  }

  // inline variant (default)
  return (
    <div className={`bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-200 dark:border-orange-900/30 rounded-2xl p-6 my-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{h}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{s}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:min-w-[320px]">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap text-sm"
          >
            {status === "loading" ? "..." : b}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-2">Something went wrong. Try again.</p>
      )}
      <p className="text-xs text-slate-400 mt-2">Free forever. No spam, unsubscribe anytime.</p>
    </div>
  );
}
