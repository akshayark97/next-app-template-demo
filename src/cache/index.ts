import { Redis } from "@upstash/redis";

// Redis is optional — if credentials are missing, all cache operations
// are no-ops so the app still runs without Upstash configured.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis;

if (url && token) {
  redis = new Redis({ url, token });
} else {
  // Stub client: every method is a silent no-op.
  // Replace with a real Redis instance once you add your Upstash credentials.
  redis = {
    get: async () => null,
    set: async () => null,
    del: async () => 0,
    incr: async () => 0,
  } as unknown as Redis;
}

export default redis;
