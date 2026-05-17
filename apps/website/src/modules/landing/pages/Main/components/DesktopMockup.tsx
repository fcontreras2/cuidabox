"use client";

import { useTranslations } from "next-intl";
import { Calendar, Search } from "lucide-react";

/**
 * Mock visual del portal médico dentro del hero. Recrea el lenguaje
 * visual de un dashboard sin importar nada real.
 */
export function DesktopMockup() {
  const t = useTranslations("modules-landing-pages-Main.hero");

  const rows = [
    { name: t("desktopPatientA"), time: t("desktopTimeA"), accent: "coral" },
    { name: t("desktopPatientB"), time: t("desktopTimeB"), accent: "sky" },
    { name: t("desktopPatientC"), time: t("desktopTimeC"), accent: "plum" },
  ] as const;

  const accentMap = {
    coral: "bg-coral-500",
    sky: "bg-sky-500",
    plum: "bg-plum-500",
  };

  return (
    <div className="rounded-[18px] bg-[#0E1A14] p-3 shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 pb-2.5">
        <span className="size-2.5 rounded-full bg-[#E8896B]" />
        <span className="size-2.5 rounded-full bg-[#C9A35A]" />
        <span className="size-2.5 rounded-full bg-[#4A6E5E]" />
        <span className="ml-3 text-[10px] font-medium text-cream/60 font-display-italic">
          {t("desktopAppName")}
        </span>
      </div>

      <div className="bg-cream rounded-xl p-4 flex flex-col gap-3 min-h-[260px]">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display-italic text-[11px] text-coral-500">
              {t("desktopGreeting")}
            </p>
            <p className="font-display text-[18px] text-primary-700 leading-tight">
              {t("desktopHeader")}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-7 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
              <Search className="size-3" />
            </span>
            <span className="size-7 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
              <Calendar className="size-3" />
            </span>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: "12", lbl: "Citas" },
            { val: "4", lbl: "Recetas" },
            { val: "98%", lbl: "Asistencia" },
          ].map((k) => (
            <div
              key={k.lbl}
              className="rounded-xl bg-paper border border-line p-2.5"
            >
              <p className="font-display text-[18px] text-primary-700 leading-none mono-num">
                {k.val}
              </p>
              <p className="text-[9.5px] text-ink-400 mt-1 uppercase tracking-[0.1em] font-semibold">
                {k.lbl}
              </p>
            </div>
          ))}
        </div>

        {/* Patient rows */}
        <div className="flex flex-col gap-1.5">
          {rows.map((r, i) => (
            <div
              key={r.name + i}
              className="flex items-center gap-2.5 rounded-xl bg-paper border border-line px-3 py-2"
            >
              <span
                className={`size-1.5 rounded-full ${accentMap[r.accent]}`}
              />
              <span className="font-display text-[12px] text-primary-700 flex-1">
                {r.name}
              </span>
              <span className="font-display-italic text-[10px] text-coral-500 mono-num">
                {r.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
