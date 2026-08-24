"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button } from "@/components/ui/Button";

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
 * Embedded Google Map for the VLIRTZ office. The iframe (and the cookies it
 * sets) only loads once the visitor accepts optional cookies site-wide, or
 * explicitly loads the map for this one visit.
 */
export function GoogleMap() {
  const { consent, hydrated } = useCookieConsent();
  const [loadedOnce, setLoadedOnce] = useState(false);

  if (!hydrated) {
    return <div className="h-[28rem] w-full rounded-3xl bg-fog" />;
  }

  const canEmbed = consent === "accepted" || loadedOnce;

  if (!canEmbed) {
    return (
      <div className="flex h-[28rem] flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-fog p-10 text-center">
        <p className="max-w-sm text-sm leading-6 text-muted">
          Loading the map sets cookies from Google. Load it below for this
          visit, or open the location directly in Google Maps.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => setLoadedOnce(true)}>Load map</Button>
          <Button href={getMapsSearchUrl()} variant="secondary" target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </Button>
        </div>
      </div>
    );
  }

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
