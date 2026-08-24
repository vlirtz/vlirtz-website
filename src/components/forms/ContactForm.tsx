"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Homepage and contact-page inquiry form. Submissions go to info@vlirtz.com.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  /**
   * Posts the form payload to the contact API route.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks, we will get back to you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not send the message. Email info@vlirtz.com instead.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <label className="grid gap-2 text-sm font-medium text-navy">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-normal text-ink outline-none ring-indigo/30 focus:ring-2"
        />
      </label>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit"}
      </Button>
      {message ? (
        <p
          className={`text-sm ${status === "success" ? "text-indigo" : "text-red-600"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

/**
 * Labeled text input used by the contact form.
 */
function Field({ label, name, type = "text", required }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-navy">
      {label}
      {required ? <span className="sr-only"> required</span> : null}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-normal text-ink outline-none ring-indigo/30 focus:ring-2"
      />
    </label>
  );
}
