"use client";

/**
 * Floating bubble that opens the chat panel.
 *
 * Collapses to an icon once the panel has been opened, so the label does not
 * keep competing for attention after the visitor has engaged.
 */
export function ChatLauncher({
  isOpen,
  hasOpened,
  onClick,
}: {
  isOpen: boolean;
  /** True after the first open, used to hide the intro label. */
  hasOpened: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close chat" : "Chat with our AI consultant"}
      className="group flex items-center gap-2 rounded-full bg-navy py-3 pl-3.5 pr-4 text-white shadow-xl shadow-navy/25 transition-all hover:bg-[#132a4d] hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {isOpen ? <CloseIcon /> : <ChatIcon />}
        {!isOpen && !hasOpened ? (
          <span
            className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan ring-2 ring-navy"
            aria-hidden="true"
          />
        ) : null}
      </span>

      {!isOpen && !hasOpened ? (
        <span className="hidden text-sm font-medium sm:inline">
          Ask about AI agents
        </span>
      ) : null}
    </button>
  );
}

/** Speech-bubble glyph. */
function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.2A8 8 0 1 1 21 12Z" />
    </svg>
  );
}

/** Close glyph. */
function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
