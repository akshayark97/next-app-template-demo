
<img width="3670" height="1916" alt="image" src="https://github.com/user-attachments/assets/70d9b2c2-7099-448c-919d-2eae2580686e" />

# Next.js App Template

A production-ready fullstack Next.js starter. Clone it, configure your env vars, and start building your app — not infrastructure.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Database | Neon (Postgres) + Drizzle ORM |
| Auth | Stack Auth |
| Caching | Upstash Redis |
| Storage | Vercel Blob |
| AI (optional) | Vercel AI SDK (bring your own provider) |
| Email | Resend + React Email |
| Deployment | Vercel |
| Testing | Vitest + Playwright |
| Tooling | Biome, Tailwind CSS v4, shadcn/ui |

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/akshayark97/next-app-template my-app
cd my-app

# 2. Install dependencies
npm install

# 3. Copy the example env file and fill in your values
cp .env.example .env.local

# 4. Run database migrations
npm run db:migrate

# 5. (Optional) Seed the database with placeholder data
npm run db:seed

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the starter landing page.

## Environment variables

Copy `.env.example` to `.env.local`. All variables are optional — the app will start without them, but features that depend on them will be disabled or stub out.

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Stack Auth |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth |
| `STACK_SECRET_SERVER_KEY` | Stack Auth |
| `UPSTASH_REDIS_REST_URL` | Redis caching |
| `UPSTASH_REDIS_REST_TOKEN` | Redis caching |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob uploads |
| `BLOB_BASE_URL` | Vercel Blob image rendering |
| `RESEND_API_KEY` | Transactional email |
| `<PROVIDER>_API_KEY` | AI features (optional) — only if you wire up an LLM provider, e.g. `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY` |

## Building your app

1. **Rename the domain model** — The example table is called `resources`. Rename it (or replace it) in `src/db/schema.ts` and regenerate the migration with `npm run db:generate`.
2. **Update the landing page** — Replace `src/app/page.tsx` with your actual home page.
3. **Update the nav** — Edit `src/components/nav/nav-bar.tsx` to add your app name and navigation links.
4. **Add your routes** — Create new pages under `src/app/`. Server actions live in `src/app/actions/`.
5. **Wire up AI (optional)** — The Vercel AI SDK is included but provider-agnostic. Pick a provider, install its adapter (e.g. `npm install @ai-sdk/openai`), then uncomment and configure `src/ai/summarize.ts`. Skip this entirely if your app doesn't need AI — it returns a stub by default.
6. **Customise email** — Update `src/email/templates/notification-template.tsx` with your branding.

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run typecheck    # TypeScript check
npm run lint         # Biome lint + format check
npm run lint:fix     # Auto-fix lint issues
npm run db:generate  # Generate Drizzle migration
npm run db:migrate   # Apply migrations
npm run db:seed      # Seed placeholder data
npm run test         # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)
```

## Project structure

```
src/
  app/            # Next.js App Router pages and server actions
  ai/             # AI utilities
  cache/          # Redis client
  components/     # Shared UI components
  db/             # Drizzle schema, migrations, seed
  email/          # Email sending logic and React Email templates
  lib/            # Shared data-access helpers
  stack/          # Stack Auth client/server config
test/
  unit/           # Vitest unit tests
  e2e/            # Playwright E2E tests
```
