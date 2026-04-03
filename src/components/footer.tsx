import { Link } from "@/i18n/navigation";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmailCapture } from "@/components/email-capture";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-orange-400" />
              <span className="font-bold text-xl text-white">
                Zero<span className="text-orange-400">To</span>AIAgents
              </span>
            </Link>
            <p className="text-sm text-slate-400">{t("aboutText")}</p>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="text-white font-semibold mb-4">Reviews</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/reviews/cursor"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Cursor Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/github-copilot"
                  className="text-slate-400 hover:text-orange-400"
                >
                  GitHub Copilot Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/windsurf"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Windsurf Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/claude-code"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Claude Code Review
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews/devin"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Devin Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-semibold mb-4">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/guides/what-are-ai-coding-agents"
                  className="text-slate-400 hover:text-orange-400"
                >
                  What Are AI Coding Agents?
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-choose-ai-coding-agent"
                  className="text-slate-400 hover:text-orange-400"
                >
                  How to Choose
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/getting-started-ai-pair-programming"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/ai-coding-agents-beginners-vs-experienced"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Beginners vs Experienced
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/free-vs-paid-ai-coding-agents"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Free vs Paid
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-orange-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-orange-400"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <EmailCapture variant="footer" />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/50 mt-8 pt-8 space-y-4">
          <p className="text-xs text-slate-500 text-center">
            {t("disclaimer")}
          </p>
          <p className="text-sm text-slate-500 text-center">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
