// ---------------------------------------------------------------------------
// Example E2E test — replace with tests for your own app flows.
// ---------------------------------------------------------------------------
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // The starter template landing page should be visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("shows sign-in and sign-up links when not authenticated", async ({
    page,
  }) => {
    await page.goto("/");

    const signIn = page.locator("text=Sign In");
    const signUp = page.locator("text=Sign Up");

    await expect(signIn).toBeVisible();
    await expect(signUp).toBeVisible();
  });

  test("sign-up link navigates to the auth page", async ({ page }) => {
    await page.goto("/");
    await page.locator("text=Sign Up").first().click();
    await expect(page).toHaveURL(/handler\/sign-up/);
  });
});
