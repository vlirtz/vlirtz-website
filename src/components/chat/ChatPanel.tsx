"use client";

import { BookCallButton } from "./BookCallButton";
import { ChatComposer } from "./ChatComposer";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { useAgentChat } from "./useAgentChat";

/**
 * The chat card itself: header, transcript, composer, and footer CTA.
 *
 * Conversation state lives here rather than in `ChatWidget` so the transcript
 * survives collapsing and reopening the panel.
 */
export function ChatPanel({ onClose }: { onClose: () => void }) {
  const {
    messages,
    isStreaming,
    error,
    leadCaptured,
    sendMessage,
    reset,
  } = useAgentChat();

  return (
    <section
      role="dialog"
      aria-label="Chat with the VLIRTZ AI consultant"
      className="flex h-[min(32rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-navy/20"
    >
      <ChatHeader
        isStreaming={isStreaming}
        onClose={onClose}
        onReset={reset}
      />

      <ChatMessageList
        messages={messages}
        isStreaming={isStreaming}
        error={error}
        onSuggestionClick={sendMessage}
      />

      <ChatComposer disabled={isStreaming} onSend={sendMessage} />

      <footer className="border-t border-line bg-fog px-3 py-2.5">
        <BookCallButton highlighted={leadCaptured} />
        <p className="mt-1.5 text-center text-[10px] text-muted">
          {leadCaptured
            ? "Your details are saved. Pick a time that suits you."
            : "Talk to Borja, founder of VLIRTZ. 30 minutes, no obligation."}
        </p>
      </footer>
    </section>
  );
}
