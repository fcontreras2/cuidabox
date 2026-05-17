"use client";

import { useTranslations } from "next-intl";
import { Pill, Thermometer, Clock } from "lucide-react";

/**
 * Mock visual del app móvil dentro del hero. No es un componente real
 * de la app — recrea el lenguaje visual con HTML/SVG para mostrar
 * cómo se ve el producto, sin importar la app real.
 */
export function PhoneMockup() {
  const t = useTranslations("modules-landing-pages-Main.hero");
  return (
    <div className="relative aspect-[10/19] rounded-[34px] bg-[#0E1A14] border-[10px] border-[#0E1A14] shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[20px] bg-[#0E1A14] rounded-b-[14px] z-20" />

      <div className="absolute inset-0 bg-cream dark:bg-cream rounded-[24px] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-7 px-5 flex items-center justify-between text-[10px] font-semibold text-primary-700">
          <span className="mono-num">9:41</span>
          <span className="inline-block w-4 h-2 border border-primary-700 rounded-[1px] relative">
            <span className="absolute inset-[1px] right-[3px] bg-primary-700 rounded-[1px]" />
          </span>
        </div>

        {/* Header */}
        <div className="px-4 pt-3 pb-2">
          <p className="font-display-italic text-[11px] text-coral-500">
            {t("phoneAppName")}
          </p>
          <p className="font-display text-[16px] text-primary-700 leading-tight">
            {t("phonePatient")}
          </p>
        </div>

        {/* Next dose card — coral hero */}
        <div className="mx-4 mt-2 rounded-2xl p-3 bg-gradient-to-br from-coral-500 to-coral-600 text-paper relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-4 -right-4 size-16 rounded-full bg-paper/15 blur-xl"
          />
          <div className="relative">
            <p className="text-[9px] uppercase tracking-[0.16em] font-semibold opacity-90">
              {t("phoneNext")}
            </p>
            <p className="font-display text-[18px] leading-tight mt-0.5">
              {t("phoneMedication")}
            </p>
            <p className="text-[10px] opacity-90 mt-1 inline-flex items-center gap-1">
              <Clock className="size-2.5" />
              {t("phoneTime")}
            </p>
          </div>
        </div>

        {/* Mini timeline */}
        <div className="px-4 mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-xl bg-paper border border-line px-2.5 py-1.5">
            <span className="size-6 rounded-lg bg-coral-100 text-coral-600 grid place-items-center">
              <Thermometer className="size-3" />
            </span>
            <span className="font-display text-[11px] text-primary-700 flex-1 leading-tight">
              {t("phoneFever")}
            </span>
            <span className="text-[9px] text-ink-400 mono-num">13:40</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-paper border border-line px-2.5 py-1.5">
            <span className="size-6 rounded-lg bg-gold-100 text-[#7A6232] grid place-items-center">
              <Pill className="size-3" />
            </span>
            <span className="font-display text-[11px] text-primary-700 flex-1 leading-tight">
              Amoxicilina 7ml
            </span>
            <span className="text-[9px] text-ink-400 mono-num">12:30</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Home indicator */}
        <div className="pb-2 grid place-items-center">
          <span className="w-12 h-1 rounded-full bg-primary-700/40" />
        </div>
      </div>
    </div>
  );
}
