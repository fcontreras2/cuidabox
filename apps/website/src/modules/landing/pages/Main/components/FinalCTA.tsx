"use client";

import { useTranslations } from "next-intl";
import { HeartPulse, Stethoscope, ArrowRight } from "lucide-react";
import { Container } from "@/shared/components";
import { useMain } from "../useMain";

export function FinalCTA() {
  const t = useTranslations("modules-landing-pages-Main.finalCta");
  const { appLoginUrl, docLoginUrl } = useMain();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] bg-paper dark:bg-primary-700/60 text-primary-700 dark:text-cream border border-line dark:border-primary-600">
            <span className="size-1.5 rounded-full bg-coral-500" />
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 font-display text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-primary-700 dark:text-cream">
            {t("title")}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600 dark:text-ink-200">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Families card */}
          <a
            href={appLoginUrl}
            target="_blank"
            rel="noopener"
            className="group rounded-3xl p-8 bg-coral-500 text-paper shadow-warm hover:bg-coral-600 transition-colors relative overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute -top-12 -right-12 size-48 rounded-full bg-paper/15 blur-3xl"
            />
            <div className="relative">
              <span className="inline-grid place-items-center size-12 rounded-2xl bg-paper/20 backdrop-blur">
                <HeartPulse className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-[26px] leading-tight">
                {t("familiesTitle")}
              </h3>
              <p className="mt-2 text-[14px] opacity-90 leading-relaxed max-w-[340px]">
                {t("familiesBody")}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-6 text-[14px] font-semibold">
                {t("familiesCta")}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>

          {/* Doctors card */}
          <a
            href={docLoginUrl}
            target="_blank"
            rel="noopener"
            className="group rounded-3xl p-8 bg-primary-700 dark:bg-primary-900 text-cream hover:bg-primary-600 transition-colors relative overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute -bottom-16 -left-12 size-48 rounded-full bg-coral-500/25 blur-3xl"
            />
            <div className="relative">
              <span className="inline-grid place-items-center size-12 rounded-2xl bg-cream/15">
                <Stethoscope className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-[26px] leading-tight">
                {t("doctorsTitle")}
              </h3>
              <p className="mt-2 text-[14px] opacity-80 leading-relaxed max-w-[340px]">
                {t("doctorsBody")}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-6 text-[14px] font-semibold text-coral-300">
                {t("doctorsCta")}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
