import { UseCaseTranslation } from "./types";
import { nlTranslations } from "./nl";
import { deTranslations } from "./de";
import { esTranslations } from "./es";
import { frTranslations } from "./fr";
import { zhTranslations } from "./zh";
import { jaTranslations } from "./ja";
import { koTranslations } from "./ko";
import { thTranslations } from "./th";

const translationMap: Record<string, Record<string, UseCaseTranslation>> = {
  nl: nlTranslations,
  de: deTranslations,
  es: esTranslations,
  fr: frTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  th: thTranslations,
};

/**
 * Get translated use case content for a specific locale and slug.
 * Returns undefined if no translation exists (falls back to English in use-case-data.ts).
 */
export function getUseCaseTranslation(
  slug: string,
  locale: string
): UseCaseTranslation | undefined {
  if (locale === "en") return undefined; // English is in use-case-data.ts
  return translationMap[locale]?.[slug];
}
