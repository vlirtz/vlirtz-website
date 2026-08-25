"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { site } from "@/lib/site";

const PREFILLED_MESSAGE = "Hi! I'd like to know more about VLIRTZ.";

/**
 * Floating bottom-left button that opens a WhatsApp chat with the studio
 * number in a new tab. Rendered once in the root layout so it stays visible
 * on every page. Lifts above the cookie banner while it is on screen so the
 * two never overlap.
 */
export function WhatsAppWidget() {
  const { consent, hydrated } = useCookieConsent();
  const bannerVisible = hydrated && !consent;

  const href = `${site.whatsappHref}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className={`group fixed left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] sm:left-6 ${
        bannerVisible ? "bottom-40 sm:bottom-32" : "bottom-6"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
      <path d="M12.04 0C5.5 0 .2 5.28.2 11.8c0 2.08.55 4.11 1.6 5.9L0 24l6.46-1.7a11.86 11.86 0 0 0 5.58 1.42h.01c6.53 0 11.83-5.28 11.83-11.8C23.88 5.4 18.58 0 12.04 0zm0 21.6h-.01a9.84 9.84 0 0 1-5-1.37l-.36-.21-3.83 1 1.02-3.72-.24-.38a9.75 9.75 0 0 1-1.5-5.19c0-5.4 4.42-9.8 9.93-9.8 2.65 0 5.14 1.03 7.01 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.42 9.8-9.92 9.8z" />
    </svg>
  );
}
