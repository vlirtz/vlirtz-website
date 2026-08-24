import { site } from "@/lib/site";

/**
 * Builds the public Google Maps search URL for the office street address.
 */
export function getMapsSearchUrl(): string {
  const query = encodeURIComponent(site.address.mapQuery);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Builds the iframe embed URL. Uses street + city only so the pin lands
 * in Kungsängen instead of a generic Stockholm result.
 */
export function getMapsEmbedUrl(): string {
  const query = encodeURIComponent(site.address.mapQuery);
  const { latitude, longitude } = site.address;
  return `https://maps.google.com/maps?q=${query}&ll=${latitude},${longitude}&z=16&hl=en&output=embed`;
}

/**
 * Embedded Google Map for the VLIRTZ office, with an open-in-Maps control.
 */
export function GoogleMap() {
  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-line">
      <iframe
        title="VLIRTZ office on Google Maps, Kokillbacken 7, Kungsängen"
        src={getMapsEmbedUrl()}
        className="h-[28rem] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={getMapsSearchUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-3 top-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-[#1a73e8] shadow-sm ring-1 ring-black/10"
      >
        Open in Maps
      </a>
    </div>
  );
}
