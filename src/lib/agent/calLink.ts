/**
 * The Cal.com booking link, safe to import from both server and client code.
 *
 * `NEXT_PUBLIC_CAL_LINK` is inlined at build time, so this module works inside
 * client components. The fallback keeps the CTA functional before the variable
 * is set, rather than rendering a dead button.
 */
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK?.trim() ||
  "https://cal.com/vlirtz/discovery-call";
