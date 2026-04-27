"use client";

import { useRouter } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function BackButton({
  className,
  variant = "light",
  fallbackHref,
}: {
  className?: string;
  variant?: "light" | "dark";
  fallbackHref?: string;
}) {
  const router = useRouter();

  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Atrás"
      className={cn(
        "size-9 rounded-full grid place-items-center transition-colors shrink-0",
        variant === "light"
          ? "bg-paper border border-line text-primary-700 hover:border-coral-200"
          : "bg-paper/15 text-cream hover:bg-paper/25",
        className,
      )}
    >
      <ChevronLeft className="size-5" />
    </button>
  );
}
