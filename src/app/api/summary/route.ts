// ---------------------------------------------------------------------------
// Cron route: backfill AI summaries for any resources that don't have one yet.
// Trigger this via a Vercel Cron Job or call it manually in development.
// ---------------------------------------------------------------------------
import { eq, isNull } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { summarizeContent } from "@/ai/summarize";
import redis from "@/cache";
import db from "@/db";
import { resources } from "@/db/schema";

export async function GET(req: NextRequest) {
  if (
    process.env.NODE_ENV !== "development" &&
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find resources that don't yet have a summary
  const rows = await db
    .select({
      id: resources.id,
      title: resources.title,
      content: resources.content,
    })
    .from(resources)
    .where(isNull(resources.summary));

  if (!rows || rows.length === 0) {
    return NextResponse.json({ ok: true, updated: 0 });
  }

  let updated = 0;
  console.log("🤖 Starting AI summary job");

  for (const row of rows) {
    try {
      const summary = await summarizeContent(row.title ?? "", row.content);

      if (summary && summary.trim().length > 0) {
        await db
          .update(resources)
          .set({ summary })
          .where(eq(resources.id, row.id));
        updated++;
      }
    } catch (err) {
      console.error("Failed to summarize resource id=", row.id, err);
    }
  }

  if (updated > 0) {
    try {
      await redis.del("resources:all");
    } catch (er) {
      console.warn("⚠️ Failed to clear resources cache", er);
    }
  }

  console.log(`🤖 Concluding AI summary job, updated ${updated} rows`);
  return NextResponse.json({ ok: true, updated });
}
