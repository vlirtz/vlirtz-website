import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-indigo text-white hover:bg-[#2f3d99] border-transparent",
  secondary:
    "bg-white text-navy border-line hover:border-indigo hover:text-indigo",
  ghost: "bg-transparent text-navy border-transparent hover:text-indigo",
};

/**
 * Renders a brand button as a link or a native button element.
 */
export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
