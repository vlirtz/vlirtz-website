"use client";

import { FormEvent, useState } from "react";

/**
 * Footer newsletter signup. Submissions are emailed to info@vlirtz.com.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  /**
   * Sends the subscriber email to the newsletter API route.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Could not subscribe.");
      }
      form.reset();
      setStatus("success");
      setMessage("You are on the list.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Enter your email address"
        className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-cyan"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-navy hover:bg-ice disabled:opacity-60"
      >
        {status === "sending" ? "Submitting…" : "Submit now"}
      </button>
      {message ? (
        <p className="text-xs text-white/70">{message}</p>
      ) : null}
    </form>
  );
}
