"use client";

import { useTranslations } from "next-intl";
import { BookOpenText, BellRing, Sparkles, Users, ArrowRight } from "lucide-react";
import { Button } from "fcontreras2-ui";
import { Container } from "@/shared/components";
import { useMain } from "../useMain";

export function AudienceFamilies() {
  const t = useTranslations("modules-landing-pages-Main.families");
  const { appLoginUrl } = useMain();

  const features = [
    { key: "history", icon: BookOpenText, tone: "primary" },
    { key: "reminders", icon: BellRing, tone: "coral" },
    { key: "voice", icon: Sparkles, tone: "plum" },
    { key: "family", icon: Users, tone: "gold" },
  ] as const;

  const toneMap = {
    primary: "bg-primary-50 text-primary-700 dark:bg-primary-600/40 dark:text-cream",
    coral: "bg-coral-100 text-coral-600 dark:bg-coral-500/20 dark:text-coral-200",
    plum: "bg-plum-100 text-plum-500 dark:bg-plum-500/20 dark:text-plum-100",
    gold: "bg-gold-100 text-[#7A6232] dark:bg-gold-500/20 dark:text-gold-200",
  };

  return (
    <section id="for-families" className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Title side */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] bg-coral-100 dark:bg-coral-500/20 text-coral-600 dark:text-coral-200">
              <span className="size-1.5 rounded-full bg-coral-500" />
              {t("eyebrow")}
            </span>

            <h2 className="mt-5 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.03em] text-primary-700 dark:text-cream">
              {t("title")}
              <br />
              <span className="font-display-italic font-normal text-coral-500">
                {t("titleAccent")}
              </span>
            </h2>

            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-600 dark:text-ink-200 max-w-[460px]">
              {t("subtitle")}
            </p>

            <div className="mt-8">
              <Button
                size="lg"
                className="bg-coral-500! text-paper! rounded-2xl! hover:bg-coral-600! shadow-warm!"
                rightIcon={<ArrowRight className="size-4" />}
                onClick={() => window.open(appLoginUrl, "_blank")}
              >
                {t("cta")}
              </Button>
              <p className="mt-3 text-[12.5px] text-ink-600 dark:text-ink-400">
                {t("ctaSub")}
              </p>
            </div>
          </div>

          {/* Features grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map(({ key, icon: Icon, tone }) => (
              <article
                key={key}
                className="rounded-3xl bg-paper dark:bg-primary-700/40 border border-line dark:border-primary-600 p-6 hover:border-coral-200 dark:hover:border-coral-500 transition-colors"
              >
                <span
                  className={`inline-grid place-items-center size-12 rounded-2xl ${toneMap[tone]}`}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[20px] leading-tight text-primary-700 dark:text-cream">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-600 dark:text-ink-200">
                  {t(`features.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
