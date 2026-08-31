import { ToolActivityList } from "./ToolActivityList";
import type { ChatMessage } from "./useAgentChat";

/**
 * One conversation turn.
 *
 * Visitor turns are right-aligned solid bubbles; agent turns are left-aligned
 * light cards that also carry the tool-activity rows for that turn.
 */
export function ChatMessageBubble({
  message,
  isStreaming,
}: {
  message: ChatMessage;
  /** True while this message is still being generated. */
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <li className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-sm text-white">
          {message.content}
        </div>
      </li>
    );
  }

  // An assistant turn with no text yet and no tool rows is the brief gap before
  // the first token; a typing indicator reads better than an empty bubble.
  const showTypingOnly =
    isStreaming && !message.content && message.activities.length === 0;

  return (
    <li className="flex justify-start">
      <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-fog px-3.5 py-2.5 text-sm text-ink">
        <ToolActivityList activities={message.activities} />

        {showTypingOnly ? (
          <TypingDots />
        ) : (
          <p className="whitespace-pre-wrap break-words">
            {linkify(message.content)}
            {isStreaming && message.content ? <Caret /> : null}
          </p>
        )}
      </div>
    </li>
  );
}

/** Three-dot "thinking" animation. */
function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Agent is typing">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted/60"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

/** Blinking cursor shown at the end of streaming text. */
function Caret() {
  return (
    <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-cyan align-middle" />
  );
}

/** Matches bare URLs so booking links in the reply become clickable. */
const URL_SOURCE = "https?:\\/\\/[^\\s<>()]+[^\\s<>().,;:!?]";

/** Global copy used to split text, keeping the URLs as array entries. */
const URL_SPLIT_PATTERN = new RegExp(`(${URL_SOURCE})`, "g");

/** Non-global copy: `test` on a global regex is stateful via `lastIndex`. */
const URL_TEST_PATTERN = new RegExp(`^${URL_SOURCE}$`);

/**
 * Converts URLs inside plain reply text into anchors.
 *
 * The agent is prompted to write plain text, so this is deliberately narrow:
 * no Markdown parsing, which keeps the widget free of HTML injection risk.
 */
function linkify(text: string) {
  if (!text) return null;

  return text.split(URL_SPLIT_PATTERN).map((part, index) => {
    if (!URL_TEST_PATTERN.test(part)) return part;

    return (
      <a
        key={`${part}-${index}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-indigo underline underline-offset-2 hover:text-cyan"
      >
        {part}
      </a>
    );
  });
}
