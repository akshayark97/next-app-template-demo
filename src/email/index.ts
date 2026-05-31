import { Resend } from "resend";

// Resend is optional — if no API key is set, email sending is a no-op
// so the app still runs without a Resend account configured.
const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder_key");

export default resend;
