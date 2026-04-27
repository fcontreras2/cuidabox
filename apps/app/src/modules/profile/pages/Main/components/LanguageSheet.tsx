"use client";

import { Check, Loader2 } from "lucide-react";
import { BottomSheet } from "@/shared/components";
import {
  useLocaleSwitcher,
  LOCALE_LABELS,
  type AppLocale,
} from "@/shared/hooks/useLocaleSwitcher";
import { cn } from "@/shared/lib/cn";

export function LanguageSheet({
  open,
  onClose,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
  const { locale, locales, change, isPending } = useLocaleSwitcher();

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      description={description}
    >
      <ul className="flex flex-col gap-2">
        {locales.map((code) => {
          const meta = LOCALE_LABELS[code as AppLocale];
          const selected = code === locale;
          return (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  change(code as AppLocale);
                  // close after a beat so the user sees the check
                  setTimeout(onClose, 160);
                }}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-[18px] border text-left transition-all",
                  selected
                    ? "border-primary-500 bg-primary-50"
                    : "border-line bg-paper hover:border-coral-200 hover:bg-cream/60",
                  isPending && "opacity-60 cursor-not-allowed",
                )}
              >
                <span
                  aria-hidden
                  className="text-[22px] leading-none w-7 text-center"
                >
                  {meta.flag}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display text-[17px] leading-tight text-primary-700">
                    {meta.native}
                  </span>
                  <span className="block text-[12px] text-ink-400 mt-0.5 uppercase tracking-wider">
                    {code}
                  </span>
                </span>
                {selected ? (
                  isPending ? (
                    <Loader2 className="size-5 text-primary-600 animate-spin" />
                  ) : (
                    <span className="size-7 rounded-full bg-primary-600 grid place-items-center text-cream">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                  )
                ) : (
                  <span aria-hidden className="size-7" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
