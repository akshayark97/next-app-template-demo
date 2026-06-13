import { stackClientApp } from "@/stack/client";
import { STACK_AUTH_ENABLED } from "@/stack/config";

export default async function Handler() {
  if (!STACK_AUTH_ENABLED || !stackClientApp) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Auth not configured
          </h1>
          <p className="text-muted-foreground mb-6">
            Add your Stack Auth credentials to{" "}
            <code className="bg-muted px-1 rounded">.env.local</code> to enable
            sign-in and sign-up.
          </p>
          <pre className="text-left bg-muted border rounded p-4 text-sm text-muted-foreground leading-relaxed">
            {`NEXT_PUBLIC_STACK_PROJECT_ID=<uuid>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<key>
STACK_SECRET_SERVER_KEY=<key>`}
          </pre>
        </div>
      </div>
    );
  }

  const { StackHandler } = await import("@stackframe/stack");
  return <StackHandler app={stackClientApp} fullPage />;
}
