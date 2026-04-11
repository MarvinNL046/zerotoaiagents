"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const comparisonLinks = [
  { href: "/compare/cursor-vs-github-copilot", label: "Cursor vs GitHub Copilot" },
  { href: "/compare/cursor-vs-windsurf", label: "Cursor vs Windsurf" },
  { href: "/compare/github-copilot-vs-claude-code", label: "GitHub Copilot vs Claude Code" },
  { href: "/compare/cursor-vs-windsurf-vs-github-copilot", label: "Cursor vs Windsurf vs Copilot" },
  { href: "/compare/devin-vs-claude-code", label: "Devin vs Claude Code" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const compareActive = pathname === "/compare" || pathname.startsWith("/compare/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">
            Zero<span className="text-primary">To</span>AIAgents
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  compareActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                Compare
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuItem asChild>
                <Link href="/compare" className="font-medium">
                  All Comparisons
                </Link>
              </DropdownMenuItem>
              {comparisonLinks.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg">
          <div className="flex flex-col space-y-4">
            <div className="space-y-3">
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-primary",
                  compareActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                Compare
              </Link>
              <div className="pl-4 space-y-2">
                {comparisonLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
