/**
 * Wire protocol between `/api/agent/chat` and the chat widget.
 *
 * The route streams newline-delimited JSON (one {@link AgentEvent} per line).
 * Both sides import these types, so a change to the protocol is a type error
 * rather than a silent runtime mismatch.
 */

/** Tool names the agent may call. Used to label the UI status indicator. */
export const TOOL_NAMES = {
  searchKnowledgeBase: "searchVlirtzKnowledgeBase",
  saveLead: "saveLeadToPostgres",
} as const;

export type ToolName = (typeof TOOL_NAMES)[keyof typeof TOOL_NAMES];

export type AgentEvent =
  /** Session identifier, emitted once at the start of every response. */
  | { type: "session"; sessionId: string }
  /** An incremental chunk of assistant text. */
  | { type: "token"; value: string }
  /** The agent started a tool call; `label` is display-ready. */
  | { type: "tool_start"; id: string; name: string; label: string }
  /** The tool finished. `ok` is false when the tool reported an error. */
  | { type: "tool_end"; id: string; name: string; ok: boolean }
  /** A lead was persisted, so the UI can celebrate and nudge the booking CTA. */
  | { type: "lead_saved"; email: string | null }
  /** Terminal event on success. */
  | { type: "done" }
  /** Terminal event on failure; `message` is safe to show to a visitor. */
  | { type: "error"; message: string };

/** Display labels for the "agent is working" indicator in the widget. */
const TOOL_LABELS: Record<string, string> = {
  [TOOL_NAMES.searchKnowledgeBase]: "Searching Vlirtz knowledge base…",
  [TOOL_NAMES.saveLead]: "Saving your details…",
};

/**
 * Maps a tool name to the sentence shown while it runs, falling back to a
 * generic label so an unknown tool never renders as a raw identifier.
 */
export function toolLabel(name: string): string {
  return TOOL_LABELS[name] ?? "Working on it…";
}

/**
 * Serialises an event as one line of NDJSON.
 *
 * A trailing newline is the frame delimiter, so the client can split on `\n`
 * without needing a full Server-Sent Events parser.
 */
export function encodeAgentEvent(event: AgentEvent): string {
  return `${JSON.stringify(event)}\n`;
}

/**
 * Parses a single NDJSON line into an {@link AgentEvent}.
 *
 * Returns `null` for blank lines and unparseable frames so a truncated chunk
 * cannot break the whole stream.
 */
export function decodeAgentEvent(line: string): AgentEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as AgentEvent;
  } catch {
    return null;
  }
}
