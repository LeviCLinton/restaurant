import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Renders as a bottom sheet on mobile and a centered dialog on desktop.
 * Handles focus-on-open, Escape to close, backdrop click, and returns focus
 * to the trigger element on close.
 */
export function Sheet({ open, onClose, title, children, footer, className }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      const timer = setTimeout(() => panelRef.current?.focus(), 10);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-ink-950/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className={cn(
              "relative flex max-h-[90vh] w-full flex-col rounded-t-[var(--radius-xl)] bg-paper-50 shadow-[var(--shadow-raised)]",
              "sm:max-w-lg sm:rounded-[var(--radius-lg)] sm:mb-0",
              className
            )}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-paper-300 sm:hidden" aria-hidden="true" />
            <div className="flex shrink-0 items-center justify-between border-b border-paper-300 px-5 py-4">
              <h2 id="sheet-title" className="font-display text-lg font-semibold text-ink-950">
                {title}
              </h2>
              <IconButton aria-label="Close" onClick={onClose}>
                <X className="size-5" />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
            {footer && <div className="shrink-0 border-t border-paper-300 px-5 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
