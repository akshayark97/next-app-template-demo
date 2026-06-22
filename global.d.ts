import type { routing } from "@/i18n/routing";
import type messages from "./messages/en.json";

// Gives `useTranslations`, `getTranslations`, etc. full type-safety and
// autocomplete for message keys, with `en.json` as the source of truth.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
