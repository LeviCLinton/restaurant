import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "dark";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brass-500 text-ink-950 hover:bg-brass-400 active:bg-brass-600 disabled:bg-brass-300 disabled:text-ink-600/60",
  secondary:
    "bg-paper-100 text-ink-900 border border-paper-300 hover:bg-paper-200 active:bg-paper-300 disabled:bg-paper-100 disabled:text-slate-400",
  ghost:
    "bg-transparent text-ink-800 hover:bg-ink-950/[0.05] active:bg-ink-950/[0.08] disabled:text-slate-400",
  danger:
    "bg-status-error text-paper-50 hover:brightness-110 active:brightness-95 disabled:bg-status-error/40",
  dark: "bg-ink-950 text-paper-50 hover:bg-ink-900 active:bg-ink-800 disabled:bg-ink-950/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-11 px-5 text-[0.9375rem] gap-2 rounded-[var(--radius-sm)]",
  lg: "h-12 px-6 text-base gap-2 rounded-[var(--radius-md)]",
};

/**
 * Base button covering every interaction state the design system requires:
 * default, hover, active, focus-visible, disabled, and loading.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center font-medium whitespace-nowrap select-none",
          "transition-[background-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          "disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          fullWidth && "w-full",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
