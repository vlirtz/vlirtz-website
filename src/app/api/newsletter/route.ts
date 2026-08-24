import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Accepts newsletter signups and forwards them to info@vlirtz.com.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = String(body.email || "").trim();

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const text = `New newsletter signup: ${email}`;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[newsletter]", email);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Signup is not configured yet. Email info@vlirtz.com instead." },
      { status: 503 },
    );
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
      subject: "VLIRTZ newsletter signup",
      text,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not subscribe. Email info@vlirtz.com instead." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
