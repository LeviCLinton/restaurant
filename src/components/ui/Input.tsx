import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

/**
 * Text input with label, helper text, and error state wired for
 * accessibility (aria-describedby, aria-invalid) — validated inline rather
 * than only on submit where practical.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[0.8125rem] font-medium text-ink-800">
            {label}
            {required && <span className="text-status-error ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "h-11 rounded-[var(--radius-sm)] border bg-paper-50 px-3.5 text-[0.9375rem] text-ink-950",
            "placeholder:text-slate-400 transition-colors duration-[var(--duration-fast)]",
            "focus:outline-none focus:ring-2 focus:ring-brass-500/40 focus:border-brass-500",
            error ? "border-status-error" : "border-paper-300 hover:border-slate-400",
            "disabled:bg-paper-100 disabled:text-slate-400 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-[0.8125rem] text-status-error">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[0.8125rem] text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
