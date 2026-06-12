// ---------------------------------------------------------------------------
// Authentication E2E tests — template defaults (no credentials configured).
// Tests that depend on Stack Auth are skipped automatically when
// NEXT_PUBLIC_STACK_PROJECT_ID is not set.
// ---------------------------------------------------------------------------
import { expect, test } from "@playwright/test";

test.describe("Home page — unauthenticated", () => {
  test("is publicly accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL("/");
  });

  test("shows Sign In and Sign Up in the nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Sign In")).toBeVisible();
    await expect(page.locator("text=Sign Up")).toBeVisible();
  });

  test("navigates to sign-in when Stack Auth is enabled", async ({ page }) => {
    test.skip(
      !process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
      "Stack Auth not configured",
    );
    await page.goto("/");
    await page.locator("text=Sign In").click();
    await expect(page).toHaveURL(/handler\/sign-in/);
  });

  test("navigates to sign-up when Stack Auth is enabled", async ({ page }) => {
    test.skip(
      !process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
      "Stack Auth not configured",
    );
    await page.goto("/");
    await page.locator("text=Sign Up").click();
    await expect(page).toHaveURL(/handler\/sign-up/);
  });
});
