"use client";

import { useTranslations } from "next-intl";
import { Plus, Lock, HeartPulse, UserRound, LogOut } from "lucide-react";
import { Skeleton } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import { PhoneFrame } from "@/shared/components";
import { useMain } from "./useMain";
import { PatientCard } from "./components/PatientCard";

export default function SelectorMain() {
  const t = useTranslations("modules-selector-pages-Main");
  const { patients, isLoading, handleSelect, handleLogout } = useMain();

  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-grid place-items-center size-10 rounded-[14px] bg-gradient-to-br from-primary-600 to-primary-500 text-cream shadow-sage">
            <HeartPulse className="size-5" />
          </span>
          <span className="font-display text-xl text-primary-700">
            CuidaBox
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          aria-label={t("logout")}
          title={t("logout")}
          className="size-9 rounded-full grid place-items-center text-ink-400 hover:text-primary-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-primary-300 transition-colors"
        >
          <LogOut className="size-4" />
        </button>
      </header>

      <section className="px-6 pt-2 pb-6">
        <p className="font-display-italic text-[18px] text-coral-600">
          {t("greeting")}
        </p>
        <h1 className="mt-1 font-display text-[40px] leading-[1.05] tracking-tight text-primary-700">
          {t("question")}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600 max-w-[280px]">
          {t("subtitle")}
        </p>
      </section>

      <section className="px-6 flex flex-col gap-3 flex-1">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={78}
                className="rounded-md!"
              />
            ))
          : patients.map((p) => (
              <PatientCard key={p.id} patient={p} onSelect={handleSelect} />
            ))}

        {!isLoading && patients.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40">
            <span className="inline-grid place-items-center size-14 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
              <UserRound className="size-6" />
            </span>
            <div className="text-center">
              <p className="text-[15px] font-medium text-primary-700 dark:text-neutral-200">
                {t("emptyTitle")}
              </p>
              <p className="mt-1 text-[13px] text-ink-400 dark:text-neutral-500 max-w-55">
                {t("emptySubtitle")}
              </p>
            </div>
            {/* CTA prominente cuando la lista está vacía */}
            <Link
              href="/patient/create"
              className="mt-2 flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-primary-700 text-cream text-[15px] font-semibold hover:bg-primary-900 transition-colors"
            >
              <Plus className="size-4" />
              {t("addFamily")}
            </Link>
          </div>
        )}

        {/* CTA secundario cuando ya hay pacientes */}
        {!isLoading && patients.length > 0 && (
          <Link
            href="/patient/create"
            className="flex items-center justify-center gap-2 h-14 w-full rounded-md border border-line bg-paper/50 hover:bg-paper text-primary-700 text-[15px] font-semibold mt-2 transition-colors"
          >
            <Plus className="size-4" />
            {t("addFamily")}
          </Link>
        )}
      </section>

      <footer className="px-6 pt-6 pb-10 flex flex-col items-center justify-center gap-2 text-xs text-ink-400">
        <Lock className="size-3.5" />
        <span>{t("secureNote")}</span>
      </footer>
    </PhoneFrame>
  );
}
