import { site } from "./site";

type SendMailInput = {
  subject: string;
  text: string;
  /** Defaults to CONTACT_TO_EMAIL / site.email when omitted. */
  to?: string[];
  replyTo?: string;
};

type SendMailResult = { ok: true } | { ok: false; error: string };

/**
 * Sends a plain-text email through Resend when RESEND_API_KEY is configured.
 * In development without a key, it logs the message instead of failing so
 * local testing does not require real credentials.
 */
export async function sendMail({
  subject,
  text,
  to,
  replyTo,
}: SendMailInput): Promise<SendMailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = to && to.length > 0 ? to : [process.env.CONTACT_TO_EMAIL || site.email];

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[mail] RESEND_API_KEY missing. Would send to ${recipients.join(", ")}:\n`, text);
      return { ok: true };
    }
    return {
      ok: false,
      error: "Email is not configured yet. Write to info@vlirtz.com instead.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${site.name} <noreply@vlirtz.com>`,
      to: recipients,
      subject,
      text,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    return { ok: false, error: "Could not send the email. Try info@vlirtz.com." };
  }

  return { ok: true };
}
