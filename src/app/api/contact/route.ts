import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

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
