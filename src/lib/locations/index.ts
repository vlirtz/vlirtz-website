/**
 * Market/location page registry.
 *
 * Each market lives in its own module so a single file never carries every
 * market's long-form copy, which is both unreviewable and well over the
 * 300-line limit this codebase keeps to.
 *
 * Order here is the order markets appear on the /locations hub and in the
 * footer, so it is deliberate: the four priority search markets first,
 * then Dubai, then the pan-European page last.
 */
import { amsterdam } from "./amsterdam";
import { copenhagen } from "./copenhagen";
import { dubai } from "./dubai";
import { europe } from "./europe";
import { stockholm } from "./stockholm";
import { zurich } from "./zurich";
import type { Location } from "./types";

export type {
  Location,
  LocationFaqItem,
  LocationSection,
  LocalRegulator,
  PricingBand,
} from "./types";

export const locations: Location[] = [
  stockholm,
  copenhagen,
  zurich,
  amsterdam,
  dubai,
  europe,
];

/**
 * Looks up a single market by its URL slug.
 *
 * @param slug - The market slug from the route, e.g. "stockholm".
 * @returns The market, or undefined when the slug is unknown.
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}

/**
 * Returns every market except the given one, for "other markets" links.
 * Cross-linking markets spreads internal link equity to pages that would
 * otherwise only be reachable from the footer.
 *
 * @param slug - The market to exclude, normally the current page.
 * @returns The remaining markets in registry order.
 */
export function getOtherLocations(slug: string): Location[] {
  return locations.filter((location) => location.slug !== slug);
}
