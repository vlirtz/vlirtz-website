export type CookieConsent = "accepted" | "necessary";

const STORAGE_KEY = "vlirtz-cookie-consent";

type Listener = (value: CookieConsent | null) => void;

let current: CookieConsent | null = null;
let initialized = false;
const listeners = new Set<Listener>();

/**
 * Reads the stored consent value from localStorage, if any.
 */
function readStored(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "necessary" ? value : null;
}

/**
 * Returns the current cookie consent choice, reading from storage once per session.
 */
export function getCookieConsent(): CookieConsent | null {
  if (!initialized && typeof window !== "undefined") {
    current = readStored();
    initialized = true;
  }
  return current;
}

/**
 * Persists the visitor's cookie choice and notifies subscribed components
 * in the same tab (the native `storage` event only fires in other tabs).
 */
export function setCookieConsent(value: CookieConsent): void {
  current = value;
  initialized = true;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
  listeners.forEach((listener) => listener(value));
}

/**
 * Subscribes to consent changes. Returns an unsubscribe function.
 */
export function subscribeToCookieConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
