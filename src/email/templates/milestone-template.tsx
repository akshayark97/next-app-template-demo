type Props = {
  name?: string;
  pageviews: number;
  title?: string;
  resourceUrl?: string;
};

/**
 * Generic milestone email template.
 * Swap in your app name, colours, and copy to match your brand.
 */
const MilestoneTemplate = ({ name, pageviews, title, resourceUrl }: Props) => {
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
              <strong style={{ fontSize: 18, color: "#0f172a" }}>My App</strong>
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
                  🎉 Nice work{name ? `, ${name}` : ""}!
                </h1>

                <p style={{ margin: "0 0 16px 0", color: "#334155" }}>
                  Your post{title ? ` "${title}"` : ""} just hit{" "}
                  <strong>{pageviews}</strong> views — that&apos;s a milestone.
                </p>

                {resourceUrl ? (
                  <a
                    href={resourceUrl}
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
                    View post
                  </a>
                ) : null}

                <p style={{ marginTop: 18, color: "#94a3b8", fontSize: 13 }}>
                  Keep it up — the team
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style={{ paddingTop: 14 }}>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>
                You received this because you authored content on My App.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default MilestoneTemplate;
