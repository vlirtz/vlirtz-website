/**
 * The Cal.com booking link, safe to import from both server and client code.
 *
 * `NEXT_PUBLIC_CAL_LINK` is inlined at build time, so this module works inside
 * client components. The fallback keeps the CTA functional before the variable
 * is set, rather than rendering a dead button.
 *
 * The fallback must therefore be a link that actually resolves. It previously
 * pointed at a `vlirtz` account that was never created, so with the variable
 * unset every booking CTA in the chat widget returned a 404 — and because the
 * same value is interpolated into the agent's system prompt, the agent recited
 * that dead link too. Keep this in step with `components/booking/calConfig.ts`,
 * which defaults to real slugs on the same account.
 */
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK?.trim() ||
  "https://cal.com/borja-javierre/discovery-call";
