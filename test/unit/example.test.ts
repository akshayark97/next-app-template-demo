// ---------------------------------------------------------------------------
// Example unit test — replace with tests for your own domain logic.
// ---------------------------------------------------------------------------
import { describe, expect, it } from "vitest";

describe("Example", () => {
  it("passes a trivial assertion to verify the test runner is working", () => {
    expect(1 + 1).toBe(2);
  });

  it("demonstrates async test structure", async () => {
    const result = await Promise.resolve("hello");
    expect(result).toBe("hello");
  });
});
