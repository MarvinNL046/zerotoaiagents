import { Link } from "@/i18n/navigation";

export function AuthorBio() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-start gap-4 mt-10">
      {/* Profile photo */}
      <img
        src="/images/team/marvin.webp"
        alt="Marvin Smit — Founder of ZeroToAIAgents"
        className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-orange-500"
      />

      {/* Bio text */}
      <div>
        <p className="font-bold text-slate-900 dark:text-white mb-1">
          Written by Marvin Smit
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Marvin is a developer and the founder of ZeroToAIAgents. He tests AI coding agents daily across real-world projects and shares honest, hands-on reviews to help developers find the right tools.
        </p>
        <Link
          href="/about"
          className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          Learn more about our testing methodology &rarr;
        </Link>
      </div>
    </div>
  );
}
