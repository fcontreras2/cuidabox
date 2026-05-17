"use client";

import { useTranslations } from "next-intl";
import { HeartPulse, Stethoscope, ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/shared/components";
import { useMain } from "../useMain";
import { PhoneMockup } from "./PhoneMockup";
import { DesktopMockup } from "./DesktopMockup";

export function Hero() {
  const t = useTranslations("modules-landing-pages-Main.hero");
  const { appLoginUrl, docLoginUrl } = useMain();

  return (
    <section id="top" className="relative pt-12 md:pt-20 pb-20 md:pb-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ── Copy ────────────────────── */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.12em] bg-paper dark:bg-primary-700/60 text-primary-700 dark:text-cream border border-line dark:border-primary-600">
              <span className="size-1.5 rounded-full bg-coral-500" />
              {t("eyebrow")}
            </span>

            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.02] tracking-[-0.035em] text-primary-700 dark:text-cream">
              {t("titleA")}{" "}
              <span className="font-display-italic font-normal text-coral-500">
                {t("titleB")}
              </span>
            </h1>

            <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed text-ink-600 dark:text-ink-200 max-w-[560px]">
              {t("subtitle")}
            </p>

            {/* Dual CTA cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={appLoginUrl}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl p-4 bg-coral-500 text-paper shadow-warm hover:bg-coral-600 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="size-9 rounded-full bg-paper/20 grid place-items-center">
                    <HeartPulse className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-[16px] leading-tight">
                      {t("ctaFamiliesTitle")}
                    </p>
                  </div>
                  <ArrowRight className="size-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[12.5px] opacity-90 mt-2 leading-snug">
                  {t("ctaFamiliesSub")}
                </p>
              </a>

              <a
                href={docLoginUrl}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl p-4 bg-paper dark:bg-primary-700 text-primary-700 dark:text-cream border border-line dark:border-primary-600 hover:border-coral-200 dark:hover:border-coral-500 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="size-9 rounded-full bg-primary-50 dark:bg-primary-600 grid place-items-center text-primary-700 dark:text-cream">
                    <Stethoscope className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-[16px] leading-tight">
                      {t("ctaDoctorsTitle")}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-ink-400 group-hover:translate-x-0.5 group-hover:text-coral-500 transition-all" />
                </div>
                <p className="text-[12.5px] text-ink-600 dark:text-ink-200 mt-2 leading-snug">
                  {t("ctaDoctorsSub")}
                </p>
              </a>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-ink-600 dark:text-ink-200">
              <ShieldCheck className="size-3.5 text-primary-500 dark:text-primary-300" />
              {t("trustNote")}
            </p>
          </div>

          {/* ── Device pair ────────────────────── */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[460px] sm:h-[540px] lg:h-[560px]">
              {/* Desktop floats behind */}
              <div className="absolute top-2 right-0 lg:right-[-30px] w-[88%] sm:w-[78%] lg:w-[110%] opacity-95">
                <DesktopMockup />
              </div>
              {/* Phone in front */}
              <div className="absolute bottom-0 left-0 lg:left-[-10px] w-[44%] sm:w-[40%] lg:w-[52%]">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
