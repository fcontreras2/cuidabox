"use client";

import { useTranslations } from "next-intl";
import { UserCheck, PenLine, LineChart } from "lucide-react";
import { Container } from "@/shared/components";

export function HowItWorks() {
  const t = useTranslations("modules-landing-pages-Main.how");

  const steps = [
    { key: "one", icon: UserCheck },
    { key: "two", icon: PenLine },
    { key: "three", icon: LineChart },
  ] as const;

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <Container>
        <div className="max-w-[640px] mx-auto text-center mb-14">
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

        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connector line for desktop */}
          <span
            aria-hidden
            className="hidden md:block absolute top-7 left-[14%] right-[14%] h-px bg-line-soft dark:bg-primary-600/40"
          />

          {steps.map(({ key, icon: Icon }, i) => (
            <li
              key={key}
              className="relative bg-paper dark:bg-primary-700/40 border border-line dark:border-primary-600 rounded-3xl p-6 md:p-7"
            >
              <div className="relative inline-flex items-center gap-3 mb-4">
                <span className="size-14 grid place-items-center rounded-2xl bg-cream dark:bg-primary-600 border border-line dark:border-primary-500 text-primary-700 dark:text-cream">
                  <Icon className="size-6" />
                </span>
                <span className="font-display-italic text-[28px] text-coral-500 font-normal leading-none mono-num">
                  0{i + 1}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400 dark:text-ink-200">
                {t(`steps.${key}.label`)}
              </p>
              <h3 className="mt-1.5 font-display text-[22px] leading-tight text-primary-700 dark:text-cream">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-600 dark:text-ink-200">
                {t(`steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
