import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
};

/**
 * Accepts the contact form and emails info@vlirtz.com when Resend is configured.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!firstName || !lastName || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }

  const text = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  const sent = await sendMail({
    subject: `Website inquiry from ${firstName} ${lastName}`,
    text,
    replyTo: email,
  });

  if (!sent.ok) {
    return NextResponse.json({ error: sent.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

/**
 * Sends email through Resend when RESEND_API_KEY is present.
 */
async function sendMail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] RESEND_API_KEY missing. Message logged:\n", text);
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
      to: [process.env.CONTACT_TO_EMAIL || site.email],
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
