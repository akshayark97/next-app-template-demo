import { siteConfig } from "@/lib/site-config";

type Props = {
  name?: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
};

/**
 * Generic transactional email template.
 * Swap in your app name, colours, and copy to match your brand.
 */
const NotificationTemplate = ({
  name,
  message,
  actionUrl,
  actionLabel,
}: Props) => {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#f8fafc",
          margin: 0,
          padding: 20,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          color: "#0f172a",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <tr>
            <td style={{ paddingBottom: 12 }}>
              <strong style={{ fontSize: 18, color: "#0f172a" }}>
                {siteConfig.name}
              </strong>
            </td>
          </tr>

          <tr>
            <td>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 8,
                  padding: 24,
                  boxShadow: "0 1px 0 rgba(15,23,42,0.04)",
                }}
              >
                <h1 style={{ margin: "0 0 8px 0", fontSize: 20 }}>
                  Hi{name ? `, ${name}` : ""}!
                </h1>

                <p style={{ margin: "0 0 16px 0", color: "#334155" }}>
                  {message}
                </p>

                {actionUrl && (
                  <a
                    href={actionUrl}
                    style={{
                      display: "inline-block",
                      textDecoration: "none",
                      background: "#2563eb",
                      color: "white",
                      padding: "10px 14px",
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    {actionLabel ?? "Open App"}
                  </a>
                )}

                <p style={{ marginTop: 18, color: "#94a3b8", fontSize: 13 }}>
                  — The {siteConfig.name} team
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style={{ paddingTop: 14 }}>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>
                You received this email from {siteConfig.name}.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default NotificationTemplate;
