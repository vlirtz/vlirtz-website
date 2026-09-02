"use client";

import { useCallback, useRef, useState } from "react";
import { decodeAgentEvent } from "@/lib/agent/events";

/**
 * Client state machine for the sales agent conversation.
 *
 * Owns the request lifecycle, incremental parsing of the NDJSON event stream,
 * and the derived UI state the widget renders (streaming reply, live tool
 * indicators, lead-captured flag).
 */

export type ToolActivityStatus = "running" | "done" | "failed";

/** One tool invocation, shown as a status row inside the assistant bubble. */
export type ToolActivity = {
  id: string;
  name: string;
  label: string;
  status: ToolActivityStatus;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Tools the agent ran while producing this message. */
  activities: ToolActivity[];
};

export type ChatStatus = "idle" | "streaming" | "error";

/** Endpoint that runs the agentic loop. */
const CHAT_ENDPOINT = "/api/agent/chat";

/** Creates a unique id for a rendered message. */
function messageId(): string {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Manages a streaming conversation with the Vlirtz sales agent.
 *
 * @returns Conversation state plus `sendMessage` and `reset` actions.
 */
export function useAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const sessionIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /** Applies a partial update to the in-flight assistant message. */
  const updateAssistant = useCallback(
    (id: string, update: (message: ChatMessage) => ChatMessage) => {
      setMessages((current) =>
        current.map((message) => (message.id === id ? update(message) : message)),
      );
    },
    [],
  );

  /**
   * Applies one decoded event to the assistant message being built.
   */
  const applyEvent = useCallback(
    (assistantId: string, event: ReturnType<typeof decodeAgentEvent>) => {
      if (!event) return;

      switch (event.type) {
        case "session":
          sessionIdRef.current = event.sessionId;
          break;

        case "token":
          updateAssistant(assistantId, (message) => ({
            ...message,
            content: message.content + event.value,
          }));
          break;

        case "tool_start":
          updateAssistant(assistantId, (message) => ({
            ...message,
            activities: [
              ...message.activities,
              {
                id: event.id,
                name: event.name,
                label: event.label,
                status: "running",
              },
            ],
          }));
          break;

        case "tool_end":
          updateAssistant(assistantId, (message) => ({
            ...message,
            activities: message.activities.map((activity) =>
              activity.id === event.id
                ? { ...activity, status: event.ok ? "done" : "failed" }
                : activity,
            ),
          }));
          break;

        case "lead_saved":
          setLeadCaptured(true);
          break;

        case "error":
          setError(event.message);
          setStatus("error");
          break;

        default:
          break;
      }
    },
    [updateAssistant],
  );

  /**
   * Sends a visitor message and streams the reply.
   *
   * Ignored while a response is already streaming, so a double-tap on send
   * cannot start two overlapping runs.
   */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming") return;

      setError(null);
      setStatus("streaming");

      const assistantId = messageId();

      // Snapshot the history before adding the new turns, so the server gets
      // the conversation as it was, plus `message` separately.
      //
      // Placeholder assistant bubbles are dropped: one is inserted empty and
      // filled by the token stream, so a run that errored or was aborted leaves
      // a turn with no content behind. The endpoint requires every turn to be
      // non-empty and rejects the whole request, which would make one failure
      // poison the rest of the conversation.
      const history = messages
        .filter((message) => message.content.trim().length > 0)
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));

      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "user",
          content: trimmed,
          activities: [],
        },
        { id: assistantId, role: "assistant", content: "", activities: [] },
      ]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: trimmed,
            history,
            // `undefined` rather than the ref's `null`: JSON.stringify drops an
            // undefined value but serialises null, and the endpoint treats the
            // field as optional, not nullable. Sending null on the first message
            // fails validation before the agent is ever reached.
            sessionId: sessionIdRef.current ?? undefined,
            sourceUrl:
              typeof window === "undefined" ? undefined : window.location.href,
          }),
        });

        if (!response.ok || !response.body) {
          const detail = await response
            .json()
            .then((body: { error?: string }) => body.error)
            .catch(() => null);
          throw new Error(detail ?? "The agent is unavailable right now.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // NDJSON: everything before the last newline is complete; the remainder
        // is a partial line held back until the next chunk arrives.
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            applyEvent(assistantId, decodeAgentEvent(line));
          }
        }

        if (buffer.trim()) {
          applyEvent(assistantId, decodeAgentEvent(buffer));
        }

        setStatus((current) => (current === "error" ? current : "idle"));
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") {
          setStatus("idle");
          return;
        }

        setStatus("error");
        setError(
          caught instanceof Error
            ? caught.message
            : "Could not reach the agent. Email info@vlirtz.com instead.",
        );
      } finally {
        abortRef.current = null;
      }
    },
    [applyEvent, messages, status],
  );

  /** Cancels the in-flight request and clears the conversation. */
  const reset = useCallback(() => {
    abortRef.current?.abort();
    sessionIdRef.current = null;
    setMessages([]);
    setStatus("idle");
    setError(null);
    setLeadCaptured(false);
  }, []);

  return {
    messages,
    status,
    error,
    leadCaptured,
    sendMessage,
    reset,
    isStreaming: status === "streaming",
  };
}
