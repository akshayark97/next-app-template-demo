"use server";

import redis from "@/cache";

const key = (name: string) => `counter:${name}`;

/**
 * Example server action: generic Redis counter.
 * Use this pattern to count anything — page views, downloads, button clicks, etc.
 *
 * Usage:
 *   const views = await increment("posts:123");
 *   const total = await getCount("posts:123");
 */
export async function increment(name: string): Promise<number> {
  return +(await redis.incr(key(name)));
}

export async function getCount(name: string): Promise<number> {
  return +((await redis.get<number>(key(name))) ?? 0);
}
