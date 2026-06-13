import { getTranslations } from "next-intl/server";
import { stackClientApp } from "@/stack/client";
import { STACK_AUTH_ENABLED } from "@/stack/config";

export default async function Handler() {
  if (!STACK_AUTH_ENABLED || !stackClientApp) {
    const t = await getTranslations("Handler");
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {t("notConfiguredTitle")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t.rich("notConfiguredDescription", {
              code: (chunks) => (
                <code className="bg-muted px-1 rounded">{chunks}</code>
              ),
            })}
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
