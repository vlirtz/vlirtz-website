import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

/**
 * Accepts newsletter signups and forwards them to info@vlirtz.com.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = String(body.email || "").trim();

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const sent = await sendMail({
    subject: "VLIRTZ newsletter signup",
    text: `New newsletter signup: ${email}`,
  });

  if (!sent.ok) {
    return NextResponse.json({ error: sent.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
