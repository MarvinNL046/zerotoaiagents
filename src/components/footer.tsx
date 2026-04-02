import { Link } from "@/i18n/navigation";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewsletterFooter } from "@/components/newsletter/newsletter-footer";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">
                Zero<span className="text-primary">To</span>AIAgents
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("aboutText")}</p>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="font-semibold mb-4">Reviews</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/reviews/cursor"
                  className="text-muted-foreground hover:text-primary"
                >
                  Cursor Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/github-copilot"
                  className="text-muted-foreground hover:text-primary"
                >
                  GitHub Copilot Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/windsurf"
                  className="text-muted-foreground hover:text-primary"
                >
                  Windsurf Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/claude-code"
                  className="text-muted-foreground hover:text-primary"
                >
                  Claude Code Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/devin"
                  className="text-muted-foreground hover:text-primary"
                >
                  Devin Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="font-semibold mb-4">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/guides/what-are-ai-coding-agents"
                  className="text-muted-foreground hover:text-primary"
                >
                  What Are AI Coding Agents?
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-choose-ai-coding-agent"
                  className="text-muted-foreground hover:text-primary"
                >
                  How to Choose
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/getting-started-ai-pair-programming"
                  className="text-muted-foreground hover:text-primary"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/ai-coding-agents-beginners-vs-experienced"
                  className="text-muted-foreground hover:text-primary"
                >
                  Beginners vs Experienced
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/free-vs-paid-ai-coding-agents"
                  className="text-muted-foreground hover:text-primary"
                >
                  Free vs Paid
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterFooter />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 space-y-4">
          <p className="text-xs text-muted-foreground text-center">
            {t("disclaimer")}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
