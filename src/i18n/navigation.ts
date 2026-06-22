import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers. Use these instead of the ones from
 * `next/navigation` / `next/link` for localized routes — they automatically
 * keep the active locale prefix in the URL.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
