import "dotenv/config";
import assert from "node:assert";
import { defineConfig } from "drizzle-kit";

// DATABASE_URL is required here because this file is only used by the
// Drizzle CLI (db:migrate, db:generate, db:seed) — never by the Next.js app
// itself. The app boot is safe without a DATABASE_URL; only CLI commands need it.
assert(
  process.env.DATABASE_URL,
  "DATABASE_URL is required for Drizzle CLI commands (db:migrate, db:generate). Add it to .env.local.",
);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
