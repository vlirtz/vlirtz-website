import type { ToolActivity } from "./useAgentChat";

/**
 * Shows what the agent is doing behind the scenes.
 *
 * Each row corresponds to one tool call, for example "Searching Vlirtz
 * knowledge base…" while retrieval runs. Rows persist after completion so the
 * visitor can see the answer was grounded, which builds trust.
 */
export function ToolActivityList({
  activities,
}: {
  activities: ToolActivity[];
}) {
  if (activities.length === 0) return null;

  return (
    <ul className="mb-2 grid gap-1" aria-live="polite">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="flex items-center gap-2 text-[11px] leading-tight text-muted"
        >
          <StatusIcon status={activity.status} />
          <span className={activity.status === "running" ? "animate-pulse" : ""}>
            {activity.status === "failed"
              ? `${activity.label.replace(/…$/, "")} — failed`
              : activity.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders the leading glyph for a tool row: spinner, check, or warning.
 */
function StatusIcon({ status }: { status: ToolActivity["status"] }) {
  if (status === "running") {
    return (
      <span
        className="h-3 w-3 shrink-0 animate-spin rounded-full border border-line border-t-cyan"
        aria-hidden="true"
      />
    );
  }

  if (status === "failed") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        className="h-3 w-3 shrink-0 text-red-500"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 shrink-0 text-cyan"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}
