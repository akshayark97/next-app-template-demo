import { eq } from "drizzle-orm";
import db from "@/db";
import { resources, usersSync } from "@/db/schema";
import resend from "@/email";
import MilestoneTemplate from "./templates/milestone-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

/**
 * Send a milestone congratulations email to the author of a resource.
 * Silently skips if RESEND_API_KEY is not configured.
 */
export default async function sendMilestoneEmail(
  resourceId: number,
  pageviews: number,
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("ℹ️ RESEND_API_KEY not set — skipping milestone email");
    return;
  }

  const rows = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: resources.title,
      name: usersSync.name,
    })
    .from(resources)
    .leftJoin(usersSync, eq(resources.authorId, usersSync.id))
    .where(eq(resources.id, resourceId));

  const row = rows[0];
  if (!row?.email) {
    console.log(
      `❌ skipping milestone email for resource ${resourceId} — no author email found`,
    );
    return;
  }

  const emailRes = await resend.emails.send({
    from: "My App <onboarding@resend.dev>",
    to: row.email,
    subject: `🎉 Your post just hit ${pageviews} views!`,
    react: (
      <MilestoneTemplate
        title={row.title}
        resourceUrl={`${BASE_URL}/resources/${resourceId}`}
        name={row.name ?? "there"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `📧 Sent milestone email to ${row.id} for resource ${resourceId}`,
    );
  } else {
    console.error(`❌ Failed to send milestone email:`, emailRes.error);
  }
}
