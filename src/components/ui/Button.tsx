import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const variants = {
  primary:
    "bg-indigo text-white hover:bg-[#2f3d99] border-transparent",
  secondary:
    "bg-white text-navy border-line hover:border-indigo hover:text-indigo",
  ghost: "bg-transparent text-navy border-transparent hover:text-indigo",
  outline:
    "bg-transparent text-white border-white/70 hover:bg-white/10 hover:border-white",
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
  onClick,
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
