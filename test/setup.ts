import dotenv from "dotenv";
import { afterEach, beforeEach, vi } from "vitest";

// Load base test env first, then local overrides written by global setup
dotenv.config({ quiet: true, path: ".env.test" });
dotenv.config({ quiet: true, path: ".env.test.local" });

// Mock Next.js navigation helpers
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(),
}));

// Mock the AI summarize service globally so tests don't hit real APIs
vi.mock("@/ai/summarize", () => ({
  __esModule: true,
  summarizeContent: vi.fn().mockResolvedValue("This is a test summary."),
}));

beforeEach(async () => {
  // Add per-test setup here
});

afterEach(async () => {
  // Add per-test cleanup here
});
