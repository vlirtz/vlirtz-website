"use client";

import { useEffect, useState } from "react";
import {
  type CookieConsent,
  getCookieConsent,
  setCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookieConsent";

type UseCookieConsent = {
  /** Null until read from storage (avoids a hydration mismatch), then the visitor's choice or null if undecided. */
  consent: CookieConsent | null;
  /** True once the stored value has been read on the client. */
  hydrated: boolean;
  accept: () => void;
  acceptNecessaryOnly: () => void;
};

/**
 * Reads and updates the visitor's cookie consent choice, staying in sync
 * across every component that uses this hook in the same tab.
 */
export function useCookieConsent(): UseCookieConsent {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(getCookieConsent());
    setHydrated(true);
    return subscribeToCookieConsent(setConsentState);
  }, []);

  return {
    consent,
    hydrated,
    accept: () => setCookieConsent("accepted"),
    acceptNecessaryOnly: () => setCookieConsent("necessary"),
  };
}
