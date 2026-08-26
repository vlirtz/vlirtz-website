/**
 * Shared Cal.com embed settings used by both the initializer and every
 * booking trigger button, so they always agree on namespace and target link.
 *
 * Set NEXT_PUBLIC_CAL_LINK to your Cal.com username/event-type slug, e.g.
 * "vlirtz/intro-call". The event type should use Cal Video (Cal.com's
 * built-in conferencing, no Google/Microsoft account needed) as its
 * location, with "Allow booker to select duration" enabled for 15 and 30
 * minute options.
 */
export const CAL_NAMESPACE = "book-a-call";

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "vlirtz/intro-call";
