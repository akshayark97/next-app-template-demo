import type { Locale } from "./routing";

/**
 * Human-readable, native names for each locale — shown in the language
 * switcher. Add an entry here when you add a new locale in `routing.ts`.
 */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  de: "Deutsch",
};
