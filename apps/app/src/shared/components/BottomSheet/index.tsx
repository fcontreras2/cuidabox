"use client";

import { type ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** When provided, replaces the default close button. */
  trailingHeader?: ReactNode;
  /** Extra classes for the panel container. */
  className?: string;
}

/**
 * Mobile-first bottom sheet. Anchors to the bottom of the nearest
 * positioned ancestor (the PhoneFrame), darkens the rest, and animates in
 * from below. Tap the scrim or close button to dismiss; Escape works too.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  description,
  children,
  trailingHeader,
  className,
}: BottomSheetProps) {
  // Lock scroll + handle Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet-root"
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "auto" }}
          exit={{ pointerEvents: "none" }}
        >
          {/* Scrim */}
          <motion.button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-primary-700/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Panel */}
          <motion.section
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative bg-paper rounded-t-[28px] shadow-[0_-12px_40px_-12px_rgba(45,74,62,0.25)]",
              "border-t border-line max-h-[85%] flex flex-col",
              className,
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            {/* Grabber */}
            <div className="pt-2.5 pb-1 grid place-items-center">
              <span
                aria-hidden
                className="block h-1 w-10 rounded-full bg-line"
              />
            </div>

            {(title || trailingHeader) && (
              <header className="flex items-start gap-3 px-6 pt-3 pb-1">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2 className="font-display text-[22px] leading-tight tracking-tight text-primary-700">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-[13px] text-ink-600 mt-1">{description}</p>
                  )}
                </div>
                {trailingHeader ?? (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="size-9 rounded-full bg-cream grid place-items-center text-primary-700 hover:bg-cream-2 transition-colors shrink-0"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </header>
            )}

            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
              {children}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
