import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge and dedupe utility classes using `clsx` and `twMerge`.
 * Accepts the same inputs as `clsx`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

/**
 * Capitalize words in a string.
 *
 * - Capitalizes the first letter of every word (words are split on whitespace).
 * - Preserves other characters as-is.
 * - Accepts `null`/`undefined` and returns an empty string.
 *
 * @param str - The input string.
 * @param locale - Optional locale for case mapping (defaults to environment locale).
 * @returns capitalized string
 */
export function capitalize(str?: string | null, locale?: string): string {
  if (!str) return "";
  // Normalize spaces and split on whitespace (keeps punctuation attached to words)
  return str.replace(/(^|\s)\S/g, (match) => {
    // match is the first non-space char (possibly preceded by a space)
    const char = match.trim();
    return match[0] === " " ? match[0] + char.toLocaleUpperCase(locale) : char.toLocaleUpperCase(locale);
  });
}

/**
 * Compare two names (basic alphabetical ordering).
 *
 * Uses localeCompare with sensitivity 'base' (ignores accents/case by default).
 *
 * @param a - first name
 * @param b - second name
 * @param caseSensitive - if true, comparison is case sensitive (default false)
 * @param locale - optional locale for comparison
 * @returns -1 if a < b, 1 if a > b, 0 if equal
 */
export function sortByName(
  a: string,
  b: string,
  caseSensitive = false,
  locale?: string
): number {
  if (a === b) return 0;
  // Use localeCompare for correct language-aware ordering
  const options: Intl.CollatorOptions = {
    sensitivity: caseSensitive ? "variant" : "base",
    numeric: true, // treat numeric substrings naturally
  };

  return a.localeCompare(b, locale, options);
}
