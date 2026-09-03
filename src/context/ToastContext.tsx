import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { IconButton } from "@/components/ui";

interface Toast {
  id: string;
  message: string;
  variant: "success" | "error";
}

interface ToastValue {
  showToast: (message: string, variant?: Toast["variant"]) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: Toast["variant"] = "success") => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
              role="status"
              className="pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-[var(--radius-md)] border border-paper-300 bg-ink-950 px-4 py-3 text-paper-50 shadow-[var(--shadow-raised)]"
            >
              {toast.variant === "success" ? (
                <CheckCircle2 className="size-5 shrink-0 text-status-ready" aria-hidden="true" />
              ) : (
                <XCircle className="size-5 shrink-0 text-status-attention" aria-hidden="true" />
              )}
              <p className="flex-1 text-sm">{toast.message}</p>
              <IconButton
                aria-label="Dismiss"
                onClick={() => dismiss(toast.id)}
                className="size-7 text-paper-200 hover:bg-paper-50/10"
              >
                <X className="size-3.5" />
              </IconButton>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
