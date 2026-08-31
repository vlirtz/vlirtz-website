"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

/** Matches the `message` limit enforced by the API route. */
const MAX_LENGTH = 4000;

/**
 * Message input with auto-growing textarea and send button.
 *
 * Enter sends, Shift+Enter inserts a newline, which is the convention visitors
 * already expect from chat interfaces.
 */
export function ChatComposer({
  disabled,
  onSend,
}: {
  /** True while a reply is streaming. */
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /** Grows the textarea with its content, up to a few lines. */
  function resize() {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  }

  /** Sends the current value and clears the field. */
  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setValue("");

    const element = textareaRef.current;
    if (element) element.style.height = "auto";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-line px-3 py-2.5"
    >
      <label className="sr-only" htmlFor="vlirtz-agent-input">
        Your message
      </label>
      <textarea
        id="vlirtz-agent-input"
        ref={textareaRef}
        rows={1}
        value={value}
        maxLength={MAX_LENGTH}
        placeholder="Ask about our AI services…"
        onChange={(event) => {
          setValue(event.target.value);
          resize();
        }}
        onKeyDown={handleKeyDown}
        className="max-h-[120px] flex-1 resize-none bg-transparent px-1 py-1.5 text-sm text-ink outline-none placeholder:text-muted/70"
      />
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        aria-label="Send message"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo text-white transition-colors hover:bg-[#2f3d99] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SendIcon />
      </button>
    </form>
  );
}

/** Paper-plane send glyph. */
function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
    </svg>
  );
}
