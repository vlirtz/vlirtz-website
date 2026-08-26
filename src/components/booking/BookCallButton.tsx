import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CAL_LINK, CAL_NAMESPACE } from "./calConfig";

type BookCallButtonProps = {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
};

/**
 * Opens the Cal.com booking modal (15 or 30 minute Cal Video call) when
 * clicked. Relies on `CalEmbedInit` having initialized the embed script for
 * this namespace somewhere higher up the tree (see root layout).
 */
export function BookCallButton({
  children = "Book a call",
  variant = "primary",
  className,
}: BookCallButtonProps) {
  return (
    <Button
      variant={variant}
      className={className}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
    >
      {children}
    </Button>
  );
}
