import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "ghost" | "solid";
}

/** Icon-only button. aria-label is required since there is no visible text. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)] active:scale-[0.96]",
        variant === "ghost"
          ? "text-ink-700 hover:bg-ink-950/[0.06] active:bg-ink-950/[0.1]"
          : "bg-paper-100 text-ink-800 hover:bg-paper-200 active:bg-paper-300",
        "disabled:opacity-40 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  )
);
IconButton.displayName = "IconButton";
