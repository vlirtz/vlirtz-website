"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CAL_NAMESPACE, durationOptions } from "./calConfig";

type BookCallButtonProps = {
  label?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
};

/**
 * Header trigger that opens a small "15 min / 30 min" picker, then hands
 * off to the matching Cal.com booking modal for that duration. Relies on
 * `CalEmbedInit` having initialized the embed script for this namespace
 * somewhere higher up the tree (see root layout).
 */
export function BookCallButton({
  label = "Book a call",
  variant = "primary",
  className,
}: BookCallButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant={variant}
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-line"
        >
          {durationOptions.map((option) => (
            <button
              key={option.calLink}
              type="button"
              role="menuitem"
              data-cal-namespace={CAL_NAMESPACE}
              data-cal-link={option.calLink}
              data-cal-config={JSON.stringify({ layout: "month_view" })}
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-navy hover:bg-fog"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
