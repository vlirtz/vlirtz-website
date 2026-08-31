"use client";

import { useEffect, useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";

/**
 * Floating sales agent widget, fixed to the bottom-right of every page.
 *
 * Mounted once from the root layout. The panel stays mounted after the first
 * open (hidden with CSS rather than unmounted) so the transcript and session id
 * survive collapsing and reopening.
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  /** Opens and closes the panel, recording the first open. */
  function toggle() {
    setIsOpen((open) => {
      if (!open) setHasOpened(true);
      return !open;
    });
  }

  // Escape closes the panel, which visitors expect from any overlay.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 print:hidden">
      {hasOpened ? (
        <div
          // `hidden` keeps the panel mounted so state is preserved.
          className={isOpen ? "block" : "hidden"}
          data-reveal-ignore=""
        >
          <ChatPanel onClose={() => setIsOpen(false)} />
        </div>
      ) : null}

      <ChatLauncher isOpen={isOpen} hasOpened={hasOpened} onClick={toggle} />
    </div>
  );
}
