// ---------------------------------------------------------------------------
// Example E2E tests — replace with tests for your own app flows.
// These run against the built production server started by global-setup.
// ---------------------------------------------------------------------------
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("shows Sign In and Sign Up in nav when not authenticated", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("text=Sign In")).toBeVisible();
    await expect(page.locator("text=Sign Up")).toBeVisible();
  });

  test("displays the features section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=What's included")).toBeVisible();
  });

  test("displays the tech stack section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Tech stack")).toBeVisible();
  });
});
