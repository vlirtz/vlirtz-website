import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

type CalAttendee = {
  name?: string;
  email?: string;
};

type CalBookingPayload = {
  title?: string;
  startTime?: string;
  endTime?: string;
  length?: number;
  organizer?: CalAttendee;
  attendees?: CalAttendee[];
  responses?: Record<string, { value?: unknown }>;
  metadata?: { videoCallUrl?: string };
};

type CalWebhookBody = {
  triggerEvent?: string;
  payload?: CalBookingPayload;
};

const SALES_EMAIL = process.env.SALES_NOTIFICATION_EMAIL || "sales@vlirtz.com";

/**
 * Receives Cal.com's BOOKING_CREATED webhook for the "Book a call" flow and
 * emails a copy of the confirmation to sales@vlirtz.com. Cal.com already
 * notifies the organizer and the lead directly, so this only covers the
 * shared sales inbox.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!isValidSignature(request, rawBody)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as CalWebhookBody;

  if (body.triggerEvent !== "BOOKING_CREATED" || !body.payload) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { payload } = body;
  const lead = payload.attendees?.[0];
  const meetLink = payload.metadata?.videoCallUrl;

  const text = [
    `New "${payload.title || "Book a call"}" booking (${payload.length ?? "?"} min).`,
    "",
    `Lead: ${lead?.name || "Unknown"} <${lead?.email || "no email"}>`,
    `When: ${formatRange(payload.startTime, payload.endTime)}`,
    meetLink ? `Call link: ${meetLink}` : null,
    `Organizer: ${payload.organizer?.email || "unknown"}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const sent = await sendMail({
    subject: `New call booked: ${lead?.name || lead?.email || "a lead"}`,
    text,
    to: [SALES_EMAIL],
    replyTo: lead?.email,
  });

  if (!sent.ok) {
    console.error("[cal-webhook] Could not notify sales inbox:", sent.error);
  }

  return NextResponse.json({ ok: true });
}

/**
 * Verifies the `X-Cal-Signature-256` header against an HMAC-SHA256 of the
 * raw request body, per Cal.com's webhook signing scheme. Skips the check
 * (and logs a warning) when no secret is configured, so local development
 * without a Cal.com account still works.
 */
function isValidSignature(request: Request, rawBody: string): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[cal-webhook] CAL_WEBHOOK_SECRET missing; skipping signature check.");
      return true;
    }
    return false;
  }

  const signature = request.headers.get("x-cal-signature-256");
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

/**
 * Formats an ISO start/end pair as a single human-readable line, falling
 * back gracefully if either timestamp is missing or unparsable.
 */
function formatRange(start?: string, end?: string): string {
  if (!start) {
    return "unknown time";
  }
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: site.address.country === "Sweden" ? "Europe/Stockholm" : undefined,
  });

  const startLabel = formatter.format(startDate);
  const endLabel = endDate ? new Intl.DateTimeFormat("en-GB", { timeStyle: "short" }).format(endDate) : null;

  return endLabel ? `${startLabel} \u2013 ${endLabel}` : startLabel;
}
