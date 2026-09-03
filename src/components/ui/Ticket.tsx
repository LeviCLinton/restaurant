import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * The "ticket" is TABLEFLOW's distinct shape language for anything moving
 * through an operational flow (kitchen chits, order tickets) — a near-square
 * radius and a torn-edge notch, deliberately different from the softer
 * Card used for static content so the eye reads "this is in motion."
 */
export function Ticket({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-xs)] border border-ink-800/10 bg-paper-50 shadow-[var(--shadow-card)]",
        "before:absolute before:-left-1.5 before:top-1/2 before:size-3 before:-translate-y-1/2 before:rounded-full before:bg-paper-200",
        "after:absolute after:-right-1.5 after:top-1/2 after:size-3 after:-translate-y-1/2 after:rounded-full after:bg-paper-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
