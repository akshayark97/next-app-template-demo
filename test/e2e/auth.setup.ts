import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test as setup } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Always ensure the auth directory exists before writing state.
  mkdirSync(path.dirname(authFile), { recursive: true });

  const stackProjectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;

  if (!stackProjectId) {
    // Stack Auth not configured — save empty storage state so dependent
    // tests run in no-auth mode (nav shows disabled placeholder buttons).
    await page.context().storageState({ path: authFile });
    return;
  }

  const testEmail = process.env.TEST_USER_EMAIL;
  const testPassword = process.env.TEST_USER_PASSWORD;

  if (!testEmail || !testPassword) {
    console.warn(
      "⚠️  TEST_USER_EMAIL / TEST_USER_PASSWORD not set — skipping auth setup.",
    );
    await page.context().storageState({ path: authFile });
    return;
  }

  await page.goto("/handler/sign-in");
  await page.waitForLoadState("networkidle");

  try {
    const emailPasswordTabByText = page.locator(
      'button:has-text("Email & Password")',
    );
    const emailPasswordTabByValue = page.locator(
      'button[value="Email & Password"]',
    );
    if ((await emailPasswordTabByText.count()) > 0) {
      await emailPasswordTabByText.first().click();
    } else if ((await emailPasswordTabByValue.count()) > 0) {
      await emailPasswordTabByValue.first().click();
    }

    const emailInput = page
      .locator('input[type="email"], input[name="email"]')
      .first();
    await emailInput.waitFor({ timeout: 5000 });
    await emailInput.fill(testEmail);

    const passwordInput = page
      .locator('input[type="password"], input[name="password"]')
      .first();
    await passwordInput.fill(testPassword);

    const signInButton = page.locator('button[type="submit"]').first();
    await signInButton.click();

    await page.waitForURL(/^(?!.*handler).*$/, { timeout: 10000 });

    console.log("✅ Authentication successful");
    await page.context().storageState({ path: authFile });
  } catch (error) {
    console.error("❌ Authentication failed:", error);
    await page.screenshot({ path: "playwright/.auth/auth-error.png" });
    throw new Error(
      "Failed to authenticate. Please check:\n" +
        "1. TEST_USER_EMAIL and TEST_USER_PASSWORD are correct\n" +
        "2. The test user exists in your Stack project\n" +
        `Error: ${error}`,
    );
  }
});
