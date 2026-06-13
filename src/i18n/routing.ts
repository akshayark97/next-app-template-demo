import { defineRouting } from "next-intl/routing";

/**
 * Central i18n configuration.
 *
 * To add a new language:
 *   1. Add its code to `locales` below (e.g. "fr").
 *   2. Create `messages/<code>.json` (copy `messages/en.json` as a template).
 *   3. Add a display name in `src/i18n/locale-names.ts`.
 * That's it — routing, the language switcher, and message loading pick it up
 * automatically.
 */
export const routing = defineRouting({
  // All locales the app supports.
  locales: ["en", "ja", "de"],
  // Used when no locale matches (and as the fallback for non-localized routes).
  defaultLocale: "en",
  // "always" => every route is prefixed with the locale (e.g. /en, /ja).
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
