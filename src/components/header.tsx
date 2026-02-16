"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, Menu, X, Star, Zap, Code, Tag, ChevronDown, Trophy, Briefcase, Wrench, HeadphonesIcon, Sparkles, BookOpen } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bestAgentItems = [
    { href: "/best/coding-agents", label: t("codingAgents"), icon: Code },
    { href: "/best/no-code-agents", label: t("noCodeAgents"), icon: Wrench },
    { href: "/best/customer-support-agents", label: t("supportAgents"), icon: HeadphonesIcon },
    { href: "/best/enterprise-agents", label: t("enterpriseAgents"), icon: Briefcase },
    { href: "/best/free-agents", label: t("freeAgents"), icon: Sparkles },
    { href: "/best/ai-frameworks", label: t("aiFrameworks"), icon: Wrench },
    { href: "/best/general-purpose", label: t("generalPurpose"), icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          {/* Home & Reviews - regular links */}
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("home")}
          </Link>
          <Link
            href="/reviews"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/reviews" || pathname.startsWith("/reviews/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {t("reviews")}
          </Link>

          {/* HIGHLIGHTED ITEMS GROUP - Best AI Agents, Use Cases, Deals */}
          {/* Best AI Agents - Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
                  "border border-primary/20"
                )}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                {t("best")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {bestAgentItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Use Cases - highlighted */}
          <Link
            href="/use-cases"
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
              "border border-primary/20"
            )}
          >
            <BookOpen className="h-3.5 w-3.5 fill-current" />
            {t("useCases")}
          </Link>

          {/* Deals - highlighted */}
          <Link
            href="/deals"
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
              "border border-primary/20"
            )}
          >
            <Tag className="h-3.5 w-3.5 fill-current" />
            {t("deals")}
          </Link>

          {/* Compare & Guides - regular links */}
          <Link
            href="/compare"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/compare" ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("compare")}
          </Link>
          <Link
            href="/guides"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/guides" || pathname.startsWith("/guides/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {t("guides")}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />

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
        <nav className="md:hidden border-t p-4 bg-background">
          <div className="flex flex-col space-y-4">
            {/* Regular nav items */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("home")}
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/reviews" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("reviews")}
            </Link>

            {/* Best AI Agents section */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-primary flex items-center gap-2">
                <Star className="h-4 w-4" />
                {t("best")}
              </span>
              <div className="pl-6 space-y-2">
                {bestAgentItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Highlighted items */}
            <Link
              href="/use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
            >
              <BookOpen className="h-4 w-4 fill-current" />
              {t("useCases")}
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
            >
              <Tag className="h-4 w-4 fill-current" />
              {t("deals")}
            </Link>

            {/* Regular items */}
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/compare" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("compare")}
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/guides" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("guides")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
