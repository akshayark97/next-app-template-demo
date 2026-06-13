import resend from "@/email";
import NotificationTemplate from "./templates/notification-template";

/**
 * Example: send a transactional notification email.
 * Call this from any server action or API route when you need to email a user.
 *
 * Requires RESEND_API_KEY — silently skips if the key is not set.
 */
export async function sendNotificationEmail({
  to,
  subject,
  name,
  message,
  actionUrl,
  actionLabel,
}: {
  to: string;
  subject: string;
  name?: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("ℹ️  RESEND_API_KEY not set — skipping email");
    return;
  }

  const { error } = await resend.emails.send({
    from: "My App <onboarding@resend.dev>",
    to,
    subject,
    react: (
      <NotificationTemplate
        name={name}
        message={message}
        actionUrl={actionUrl}
        actionLabel={actionLabel}
      />
    ),
  });

  if (error) {
    console.error("❌ Failed to send email:", error);
  } else {
    console.log(`📧 Email sent to ${to}`);
  }
}
