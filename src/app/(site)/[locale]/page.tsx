import { getTranslations, setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n/routing";

// Tech-stack item names are proper nouns and stay untranslated; only the
// category label (looked up by `key`) is localized.
const techStack = [
  { key: "framework", items: ["Next.js 16", "React 19", "TypeScript"] },
  {
    key: "database",
    items: ["Neon (Postgres)", "Drizzle ORM", "drizzle-seed"],
  },
  { key: "auth", items: ["Stack Auth", "Role-based authz"] },
  { key: "caching", items: ["Upstash Redis"] },
  { key: "storage", items: ["Vercel Blob"] },
  { key: "ai", items: ["Vercel AI SDK", "Bring your own provider"] },
  { key: "email", items: ["Resend", "React Email"] },
  {
    key: "deployment",
    items: ["Vercel", "Vercel Analytics", "Speed Insights"],
  },
  { key: "testing", items: ["Vitest", "Playwright", "Testing Library"] },
  { key: "tooling", items: ["Biome", "Tailwind CSS v4", "shadcn/ui"] },
] as const;

// Feature copy (title/description) is localized; icon and key stay in code.
const features = [
  { key: "auth", icon: "🔐" },
  { key: "database", icon: "🗄️" },
  { key: "caching", icon: "⚡" },
  { key: "ai", icon: "🤖" },
  { key: "email", icon: "📧" },
  { key: "testing", icon: "🧪" },
] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Home");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <Badge
          variant="outline"
          className="mb-6 text-xs tracking-widest uppercase"
        >
          {t("badge")}
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6">
          {t("titleLead")}{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {t("titleHighlight")}
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <a href="https://github.com/akshayark97/next-app-template-demo#getting-started">
              {t("getStarted")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://github.com/akshayark97/next-app-template-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("viewOnGitHub")}
            </a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
          {t("featuresHeading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.key} className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-2xl mb-1">{f.icon}</div>
                <CardTitle className="text-base">
                  {t(`features.${f.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t(`features.${f.key}.description`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
          {t("techStackHeading")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((group) => (
            <div key={group.key}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {t(`categories.${group.key}`)}
              </p>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-xs w-fit"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        {t("footer")}
      </footer>
    </div>
  );
}
