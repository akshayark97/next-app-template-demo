// ---------------------------------------------------------------------------
// Example cron route: demonstrates the AI + DB + cron pattern.
//
// Wire this up in vercel.json:
//   { "crons": [{ "path": "/api/example", "schedule": "0 0 * * 0" }] }
//
// In development: GET http://localhost:3000/api/example
// In production:  secured with CRON_SECRET (set in your env vars)
// ---------------------------------------------------------------------------
import { type NextRequest, NextResponse } from "next/server";
import { summarizeContent } from "@/ai/summarize";

export async function GET(req: NextRequest) {
  if (
    process.env.NODE_ENV !== "development" &&
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Replace this with your own DB query and AI call.
  // Example: find records that need processing and run them through AI.
  const exampleRecord = {
    id: 1,
    title: "Hello world",
    content: "Example content to summarise.",
  };

  const summary = await summarizeContent(
    exampleRecord.title,
    exampleRecord.content,
  );

  console.log(`✅ Processed record ${exampleRecord.id}: ${summary}`);

  return NextResponse.json({ ok: true, summary });
}
