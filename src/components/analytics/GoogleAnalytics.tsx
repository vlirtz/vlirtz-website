"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * Loads Google Analytics only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 * and the visitor has accepted optional cookies.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const { consent, hydrated } = useCookieConsent();

  if (!measurementId || !hydrated || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
