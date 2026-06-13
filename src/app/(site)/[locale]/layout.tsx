import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { geistMono, geistSans } from "@/app/fonts";
import NavBar from "@/components/nav/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { type Locale, routing } from "@/i18n/routing";
import { stackClientApp } from "@/stack/client";
import { STACK_AUTH_ENABLED } from "@/stack/config";
import "../../globals.css";

// Pre-render a static page for each supported locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Reject unknown locales (e.g. /xx) with a 404.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering for this request.
  setRequestLocale(locale);

  const bodyClassName = `${geistSans.variable} ${geistMono.variable} antialiased`;

  // Only wrap with StackProvider when Stack Auth is configured.
  if (STACK_AUTH_ENABLED && stackClientApp) {
    const { StackProvider, StackTheme } = await import("@stackframe/stack");
    return (
      <html lang={locale} suppressHydrationWarning>
        <body className={bodyClassName}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <StackProvider app={stackClientApp}>
                <StackTheme>
                  <NavBar />
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </StackTheme>
              </StackProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  // Auth not configured — render without StackProvider.
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={bodyClassName}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <NavBar />
            {children}
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
