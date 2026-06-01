import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const techStack = [
  {
    category: "Framework",
    items: ["Next.js 16", "React 19", "TypeScript"],
  },
  {
    category: "Database",
    items: ["Neon (Postgres)", "Drizzle ORM", "drizzle-seed"],
  },
  {
    category: "Auth",
    items: ["Stack Auth", "Role-based authz"],
  },
  {
    category: "Caching",
    items: ["Upstash Redis"],
  },
  {
    category: "Storage",
    items: ["Vercel Blob"],
  },
  {
    category: "AI",
    items: ["Vercel AI SDK", "Anthropic / OpenAI"],
  },
  {
    category: "Email",
    items: ["Resend", "React Email"],
  },
  {
    category: "Deployment",
    items: ["Vercel", "Vercel Analytics", "Speed Insights"],
  },
  {
    category: "Testing",
    items: ["Vitest", "Playwright", "Testing Library"],
  },
  {
    category: "Tooling",
    items: ["Biome", "Tailwind CSS v4", "shadcn/ui"],
  },
];

const features = [
  {
    icon: "🔐",
    title: "Authentication ready",
    description:
      "Full auth flow with Stack Auth — sign up, sign in, user management, and server-side session access out of the box.",
  },
  {
    icon: "🗄️",
    title: "Database + ORM",
    description:
      "Neon serverless Postgres with Drizzle ORM. Type-safe queries, migrations, and a seed script to get you running instantly.",
  },
  {
    icon: "⚡",
    title: "Redis caching",
    description:
      "Upstash Redis wired up and ready to go. Drop-in caching layer for any data-heavy route or server action.",
  },
  {
    icon: "🤖",
    title: "AI integration",
    description:
      "Vercel AI SDK configured with Anthropic. Add AI features to any route or server action with minimal boilerplate.",
  },
  {
    icon: "📧",
    title: "Transactional email",
    description:
      "Resend + React Email for sending beautiful HTML emails from server actions or API routes.",
  },
  {
    icon: "🧪",
    title: "Testing suite",
    description:
      "Unit tests with Vitest and E2E tests with Playwright. CI workflow with Neon branch-per-PR included.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <Badge
          variant="outline"
          className="mb-6 text-xs tracking-widest uppercase"
        >
          Starter Template
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Fullstack Next.js{" "}
          <span className="text-blue-600">Starter Template</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Everything you need to ship a production-grade app. Auth, database,
          caching, AI, email, testing, and CI — all wired up. Just start
          building.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/handler/sign-up">Get started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://github.com/akshayark97/next-app-template-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          What's included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-2xl mb-1">{f.icon}</div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {f.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Tech stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                {group.category}
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
      <footer className="border-t py-8 text-center text-sm text-gray-400">
        Built with Next.js · Replace this page with your actual app
      </footer>
    </div>
  );
}
