import { BookCallButton } from "./BookCallButton";

/**
 * Widget header: brand, live status, the compact booking CTA, and close.
 */
export function ChatHeader({
  isStreaming,
  onClose,
  onReset,
}: {
  isStreaming: boolean;
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <header className="rounded-t-2xl bg-navy px-4 py-3 text-white">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold leading-tight">
            VLIRTZ AI Consultant
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/70">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isStreaming ? "animate-pulse bg-cyan" : "bg-emerald-400"
              }`}
              aria-hidden="true"
            />
            {isStreaming ? "Thinking…" : "Online now"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <IconButton label="Start over" onClick={onReset}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
            </svg>
          </IconButton>
          <IconButton label="Close chat" onClick={onClose}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
      </div>

      <div className="mt-2.5">
        <BookCallButton variant="compact" />
      </div>
    </header>
  );
}

/**
 * Small transparent icon button used for the header actions.
 */
function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
