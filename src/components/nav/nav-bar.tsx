import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/nav/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { STACK_AUTH_ENABLED } from "@/stack/config";
import { getCurrentUser } from "@/stack/server";

export default async function NavBar() {
  // getCurrentUser safely returns null when Stack Auth is disabled.
  const user = await getCurrentUser();
  const t = await getTranslations("Nav");

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Locale-aware home link (keeps the /en, /ja, … prefix). */}
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <LanguageSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
            {STACK_AUTH_ENABLED ? (
              // Auth is configured — show real auth UI
              user ? (
                <NavigationMenuItem>
                  {/* UserButton must be imported dynamically to avoid SDK
                      being evaluated when auth is disabled */}
                  <AuthUserButton />
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Button asChild variant="outline">
                      {/* Stack Auth lives on a fixed, non-localized path. */}
                      <NextLink href="/handler/sign-in">{t("signIn")}</NextLink>
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button asChild>
                      <NextLink href="/handler/sign-up">{t("signUp")}</NextLink>
                    </Button>
                  </NavigationMenuItem>
                </>
              )
            ) : (
              // Auth not configured — show placeholder links
              <>
                <NavigationMenuItem>
                  <Button asChild variant="outline" disabled>
                    <span title={t("signInDisabled")}>{t("signIn")}</span>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button asChild disabled>
                    <span title={t("signUpDisabled")}>{t("signUp")}</span>
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

// Isolated component so UserButton import only runs when auth is enabled.
async function AuthUserButton() {
  const { UserButton } = await import("@stackframe/stack");
  return <UserButton />;
}
