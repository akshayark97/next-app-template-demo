import { stackClientApp } from "@/stack/client";
import { STACK_AUTH_ENABLED } from "@/stack/config";

export default async function Handler() {
  if (!STACK_AUTH_ENABLED || !stackClientApp) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Auth not configured
          </h1>
          <p className="text-gray-500 mb-6">
            Add your Stack Auth credentials to{" "}
            <code className="bg-gray-100 px-1 rounded">.env.local</code> to
            enable sign-in and sign-up.
          </p>
          <pre className="text-left bg-gray-50 border rounded p-4 text-sm text-gray-700 leading-relaxed">
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
