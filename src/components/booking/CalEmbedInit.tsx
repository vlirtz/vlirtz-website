"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "./calConfig";

/**
 * Loads the Cal.com embed script once and applies VLIRTZ branding to it.
 * Rendered once in the root layout so every `data-cal-link` trigger button
 * (desktop header, mobile header) opens the same themed modal without each
 * one re-initializing the embed script.
 */
export function CalEmbedInit() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) {
        return;
      }
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        styles: { branding: { brandColor: "#3949ab" } },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
