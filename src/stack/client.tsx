import { STACK_AUTH_ENABLED } from "./config";

// StackClientApp is only instantiated when all three Stack env vars are present.
// When STACK_AUTH_ENABLED is false the export is null — all call sites must
// check the flag before using it (layout, nav, handler).
export const stackClientApp = STACK_AUTH_ENABLED
  ? (() => {
      // Dynamic require avoids the SDK running its UUID validation at module
      // load time when the env vars are absent.
      const { StackClientApp } = require("@stackframe/stack");
      return new StackClientApp({
        tokenStore: "nextjs-cookie",
        projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID ?? "",
        publishableClientKey:
          process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ?? "",
      }) as import("@stackframe/stack").StackClientApp;
    })()
  : null;
