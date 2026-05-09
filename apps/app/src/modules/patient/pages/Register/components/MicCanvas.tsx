"use client";

import { Mic, Square } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function MicCanvas({
  recording,
  onToggle,
}: {
  recording: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <div
        aria-hidden
        className={cn(
          "absolute size-44 rounded-full bg-coral-500/15 blur-2xl transition-opacity",
          recording ? "opacity-100 animate-pulse" : "opacity-50",
        )}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={recording ? "Detener" : "Empezar a grabar"}
        className={cn(
          "relative size-28 rounded-full grid place-items-center transition-all",
          "shadow-warm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-200",
          recording
            ? "bg-gradient-to-br from-coral-600 to-coral-500 scale-95"
            : "bg-gradient-to-br from-coral-500 to-coral-600 hover:scale-105",
        )}
      >
        {recording ? (
          <Square className="size-9 text-paper fill-paper" />
        ) : (
          <Mic className="size-10 text-paper" strokeWidth={1.8} />
        )}
        {recording && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full ring-4 ring-coral-500/30 animate-ping"
          />
        )}
      </button>
      <p className="mt-5 font-display-italic text-[16px] text-coral-600">
        {recording ? "Te escucho..." : "Toca y cuéntame"}
      </p>
    </div>
  );
}
