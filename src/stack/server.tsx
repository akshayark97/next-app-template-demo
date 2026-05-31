import "server-only";
import { stackClientApp } from "./client";
import { STACK_AUTH_ENABLED } from "./config";

// StackServerApp is only instantiated when auth is enabled.
export const stackServerApp = STACK_AUTH_ENABLED
  ? (() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { StackServerApp } = require("@stackframe/stack");
      return new StackServerApp({
        tokenStore: "nextjs-cookie",
        secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
        inheritsFrom: stackClientApp,
      }) as import("@stackframe/stack").StackServerApp;
    })()
  : null;

/**
 * Safe helper — returns the current user or null without throwing
 * when Stack Auth is disabled.
 */
export async function getCurrentUser() {
  if (!stackServerApp) return null;
  try {
    return await stackServerApp.getUser();
  } catch {
    return null;
  }
}
