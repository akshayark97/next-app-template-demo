"use client";

import { Check, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DropdownMenu } from "radix-ui";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { localeNames } from "@/i18n/locale-names";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function selectLocale(nextLocale: Locale) {
    if (nextLocale === activeLocale) return;
    // Re-navigate to the same pathname under the chosen locale. next-intl
    // swaps the locale prefix for us.
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("label")}
          title={t("label")}
          disabled={isPending}
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {routing.locales.map((locale) => (
            <DropdownMenu.Item
              key={locale}
              onSelect={() => selectLocale(locale)}
              className={cn(
                "relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                "focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
              )}
            >
              {localeNames[locale]}
              {locale === activeLocale && <Check className="h-4 w-4" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
