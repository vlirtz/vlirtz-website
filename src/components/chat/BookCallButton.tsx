import { CAL_LINK } from "@/lib/agent/calLink";

/**
 * Always-visible "Book a Discovery Call" call to action.
 *
 * Rendered in the widget header (compact) and footer (full width) so a visitor
 * can convert at any point without waiting for the agent to offer it.
 */
export function BookCallButton({
  variant = "full",
  highlighted = false,
}: {
  /** `full` fills its container; `compact` fits inside the header bar. */
  variant?: "full" | "compact";
  /** Draws extra attention once the agent has captured a lead. */
  highlighted?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
    "transition-all focus:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-cyan focus-visible:ring-offset-2";

  const sizing =
    variant === "compact"
      ? "px-3 py-1.5 text-xs"
      : "w-full px-4 py-2.5 text-sm";

  const colors =
    variant === "compact"
      ? "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
      : "bg-indigo text-white hover:bg-[#2f3d99] shadow-sm hover:shadow-md";

  const attention = highlighted
    ? "ring-2 ring-cyan ring-offset-1 ring-offset-white"
    : "";

  return (
    <a
      href={CAL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizing} ${colors} ${attention}`}
    >
      <CalendarIcon />
      Book a Discovery Call
    </a>
  );
}

/** Small inline calendar glyph. */
function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-3.5 w-3.5"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}
