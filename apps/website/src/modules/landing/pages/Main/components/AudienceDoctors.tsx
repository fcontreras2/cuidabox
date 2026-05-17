"use client";

import { useTranslations } from "next-intl";
import {
  CalendarDays,
  FileText,
  ClipboardCheck,
  NotebookPen,
  ArrowRight,
} from "lucide-react";
import { Button } from "fcontreras2-ui";
import { Container } from "@/shared/components";
import { useMain } from "../useMain";

export function AudienceDoctors() {
  const t = useTranslations("modules-landing-pages-Main.doctors");
  const { docLoginUrl } = useMain();

  const features = [
    { key: "agenda", icon: CalendarDays },
    { key: "records", icon: FileText },
    { key: "treatments", icon: ClipboardCheck },
    { key: "notes", icon: NotebookPen },
  ] as const;

  return (
    <section id="for-doctors" className="py-20 md:py-28 relative">
      {/* Section in sage tone — inverted aesthetic */}
      <div
        aria-hidden
        className="absolute inset-x-6 md:inset-x-10 inset-y-8 rounded-[32px] bg-primary-700 dark:bg-primary-900"
      />
      <Container className="relative">
        <div className="rounded-[32px] py-16 md:py-20 px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Features grid first on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-3xl bg-primary-600/40 backdrop-blur-sm border border-primary-500/40 p-6 hover:border-coral-300/60 transition-colors"
              >
                <span className="inline-grid place-items-center size-12 rounded-2xl bg-coral-500/20 text-coral-200">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[20px] leading-tight text-cream">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream/75">
                  {t(`features.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          {/* Title side */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] bg-cream/10 text-cream">
              <span className="size-1.5 rounded-full bg-coral-300" />
              {t("eyebrow")}
            </span>

            <h2 className="mt-5 font-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.03em] text-cream">
              {t("title")}
              <br />
              <span className="font-display-italic font-normal text-coral-300">
                {t("titleAccent")}
              </span>
            </h2>

            <p className="mt-5 text-[15.5px] leading-relaxed text-cream/80 max-w-[460px]">
              {t("subtitle")}
            </p>

            <div className="mt-8">
              <Button
                size="lg"
                className="bg-cream! text-primary-700! rounded-2xl! hover:bg-coral-100!"
                rightIcon={<ArrowRight className="size-4" />}
                onClick={() => window.open(docLoginUrl, "_blank")}
              >
                {t("cta")}
              </Button>
              <p className="mt-3 text-[12.5px] text-cream/70">{t("ctaSub")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
