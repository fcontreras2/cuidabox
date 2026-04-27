"use client";

import { useTranslations } from "next-intl";
import { Plus, Search } from "lucide-react";
import { Button } from "fcontreras2-ui";
import { PhoneFrame, SectionTitle, TabBar } from "@/shared/components";
import { useMain } from "./useMain";
import { DoctorCard } from "./components/DoctorCard";

export default function DoctorsMain() {
  const t = useTranslations("modules-doctors-pages-Main");
  const { primary, others } = useMain();

  return (
    <PhoneFrame>
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="font-display-italic text-[16px] text-coral-600">
            {t("titleAccent")}
          </p>
          <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700">
            {t("title")}
          </h1>
        </div>
        <button
          type="button"
          aria-label={t("search")}
          className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700 hover:border-coral-200 transition-colors"
        >
          <Search className="size-4" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-2 pb-6">
        {primary && <DoctorCard doctor={primary} featured />}

        {others.length > 0 && (
          <>
            <SectionTitle className="mt-8" hint={`${others.length} ${t("specialists").toLowerCase()}`}>
              {t("specialists")}
            </SectionTitle>
            <div className="flex flex-col gap-3">
              {others.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </>
        )}

        <Button
          variant="outline"
          size="lg"
          fullWidth
          leftIcon={<Plus className="size-4" />}
          className="!border-line !text-primary-700 !rounded-[18px] !h-14 !bg-paper/50 hover:!bg-paper mt-4"
        >
          {t("addDoctor")}
        </Button>
      </main>

      <TabBar active="doctors" />
    </PhoneFrame>
  );
}
