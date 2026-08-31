"use client";

import { useId, useState } from "react";
import { homeFaq } from "@/lib/faq";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Homepage FAQ accordion. One answer opens at a time; content height is
 * animated with a CSS grid-rows trick so no JS measurement is needed.
 * Paired with FAQPage JSON-LD on the page itself.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-fog py-20">
      <Container className="max-w-3xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="These come up in almost every first conversation. If yours is more specific, just ask."
          />
          <div className="mt-6">
            <Button href="/contact" variant="secondary">
              Ask us directly
            </Button>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {homeFaq.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

type FaqRowProps = {
  item: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Single accordion row: question button plus an animated, collapsible answer.
 */
function FaqRow({ item, index, isOpen, onToggle }: FaqRowProps) {
  const panelId = useId();

  return (
    <div
      data-reveal
      data-delay={String(index % 3)}
      className="rounded-3xl bg-white ring-1 ring-line"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-navy sm:text-lg">
          {item.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </span>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-6 text-muted sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 1v10M1 6h10" />
    </svg>
  );
}
