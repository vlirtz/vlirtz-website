"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Bottom-fixed cookie banner shown until the visitor makes a choice.
 * Required cookies always run; optional cookies (Google Maps, Analytics)
 * only load after "Accept all" is chosen.
 */
export function CookieConsentBanner() {
  const { consent, hydrated, accept, acceptNecessaryOnly } = useCookieConsent();

  if (!hydrated || consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/97 backdrop-blur shadow-[0_-8px_24px_rgba(11,31,58,0.12)]">
      <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted">
          We use required cookies to run this site. With your consent, we
          also load optional cookies from embedded services like Google
          Maps and, if enabled, Google Analytics. Read our{" "}
          <Link
            href="/privacy"
            className="font-medium text-indigo underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={acceptNecessaryOnly}>
            Necessary only
          </Button>
          <Button onClick={accept}>Accept all</Button>
        </div>
      </Container>
    </div>
  );
}
