import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { IntlErrorCode } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  // Always load English as base
  const enMessages = (await import(`../messages/en.json`)).default;

  // For English, use messages with error handling
  if (locale === 'en') {
    return {
      locale,
      messages: enMessages,
      onError(error) {
        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          return;
        }
        if (process.env.NODE_ENV === 'development') {
          console.warn(error);
        }
      },
      getMessageFallback({ namespace, key }) {
        return [namespace, key].filter(Boolean).join('.');
      }
    };
  }

  // For other locales, load and merge with English fallback
  let localeMessages;
  try {
    localeMessages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    localeMessages = {};
  }

  // Deep merge: English first, then override with locale-specific
  const mergedMessages = deepMerge(enMessages, localeMessages);

  return {
    locale,
    messages: mergedMessages,
    // Suppress missing message errors - we have English fallback
    onError(error) {
      // Silently ignore missing message errors since we have fallback
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return;
      }
      // Log other errors only in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(error);
      }
    },
    getMessageFallback({ namespace, key }) {
      // This shouldn't be called due to deepMerge, but provide fallback anyway
      return [namespace, key].filter(Boolean).join('.');
    }
  };
});

/**
 * Deep merge two objects, with source overriding target
 * For nested objects, recursively merge
 * For primitives and arrays, source wins
 */
function deepMerge(target: any, source: any): any {
  // If source is not an object, return source (it overrides target)
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return source;
  }

  // Start with target as base
  const output = { ...target };

  // Merge each key from source
  Object.keys(source).forEach(key => {
    if (source[key] === undefined || source[key] === null) {
      // Skip undefined/null values from source
      return;
    }

    if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // Recursively merge nested objects
      output[key] = deepMerge(output[key] || {}, source[key]);
    } else {
      // Override with source value (primitives and arrays)
      output[key] = source[key];
    }
  });

  return output;
}
