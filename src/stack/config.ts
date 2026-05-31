/**
 * Feature flag — true only when all three Stack Auth env vars are present.
 * Used throughout the app to conditionally render/call Stack Auth code.
 *
 * Set these in .env.local to enable auth:
 *   NEXT_PUBLIC_STACK_PROJECT_ID=<uuid>
 *   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<key>
 *   STACK_SECRET_SERVER_KEY=<key>
 */
export const STACK_AUTH_ENABLED =
  !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
  !!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY &&
  !!process.env.STACK_SECRET_SERVER_KEY;
