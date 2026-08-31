/**
 * Shared Cal.com embed settings used by both the initializer and every
 * booking trigger, so they always agree on namespace and target links.
 *
 * Two separate Cal.com event types back the "Book a call" picker, one per
 * duration (each using Cal Video, Cal.com's built-in conferencing, so no
 * Google/Microsoft account connection is needed). Set the env vars to your
 * own username/event-type slugs, e.g. "borja-javierre/15min".
 */
export const CAL_NAMESPACE = "book-a-call";

export const CAL_15MIN_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK_15MIN || "borja-javierre/15min";

export const CAL_30MIN_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK_30MIN || "borja-javierre/30min";

export const durationOptions = [
  { label: "15-minute call", calLink: CAL_15MIN_LINK },
  { label: "30-minute call", calLink: CAL_30MIN_LINK },
] as const;
