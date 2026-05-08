"use client";

import { useTranslations } from "next-intl";
import { Plus, Lock, HeartPulse, UserRound } from "lucide-react";
import { Button, Card, Skeleton } from "fcontreras2-ui";
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
          </div>
        )}

        <Button
          variant="outline"
          size="lg"
          fullWidth
          leftIcon={<Plus className="size-4" />}
          className="!border-line !text-primary-700 !rounded-[18px] !h-14 !bg-paper/50 hover:!bg-paper mt-2"
        >
          {t("addFamily")}
        </Button>
       
      </section>

      <footer className="px-6 pt-6 pb-10 flex flex-col items-center justify-center gap-2 text-xs text-ink-400">
        <Lock className="size-3.5" />
        <span>{t("secureNote")}</span>
         <Button variant="secondary" className="mt-4 w-full" onClick={handleLogout}>
          Logout
        </Button>
      </footer>
    </PhoneFrame>
  );
}
