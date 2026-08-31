"use client";

import { useEffect, useRef } from "react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import type { ChatMessage } from "./useAgentChat";

/** Conversation openers shown before the first message. */
const SUGGESTIONS = [
  "What kind of AI agents do you build?",
  "Can you automate our lead qualification?",
  "How does a project with you start?",
] as const;

/**
 * Scrollable transcript, including the empty state and its suggested prompts.
 */
export function ChatMessageList({
  messages,
  isStreaming,
  error,
  onSuggestionClick,
}: {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  onSuggestionClick: (text: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  // Keep the newest content in view as tokens stream in.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, error]);

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3">
      {messages.length === 0 ? (
        <EmptyState onSuggestionClick={onSuggestionClick} />
      ) : (
        <ul className="grid gap-2.5">
          {messages.map((message, index) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          ))}
        </ul>
      )}

      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div ref={endRef} />
    </div>
  );
}

/**
 * First-run view: a short greeting plus one-tap conversation starters.
 */
function EmptyState({
  onSuggestionClick,
}: {
  onSuggestionClick: (text: string) => void;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-sm text-ink">
        Hi, I am VLIRTZ&apos;s AI consultant. Ask me anything about building AI
        agents, our stack, or how a project runs.
      </p>
      <div className="grid gap-1.5">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            className="rounded-xl border border-line bg-white px-3 py-2 text-left text-xs text-navy transition-colors hover:border-indigo hover:text-indigo"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
