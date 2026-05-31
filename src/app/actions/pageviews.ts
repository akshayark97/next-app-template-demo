"use server";

import redis from "@/cache";
import sendMilestoneEmail from "@/email/milestone-email";

const milestones = [10, 50, 100, 1000, 10000];
const keyFor = (id: number | string) => `pageviews:resources:${id}`;

/**
 * Increment the page view count for a resource.
 * Triggers a milestone email when a milestone is hit.
 * Swap out the email call or remove it if you don't need email notifications.
 */
export async function incrementPageViews(resourceId: number) {
  const key = keyFor(resourceId);
  const newVal = await redis.incr(key);

  if (milestones.includes(newVal)) {
    sendMilestoneEmail(resourceId, +newVal); // fire-and-forget
  }
  return +newVal;
}
