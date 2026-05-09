"use client";

import { useTranslations } from "next-intl";
import { HeartPulse, MailCheck, ChevronLeft } from "lucide-react";
import { Button, FieldInput, FieldsProvider } from "fcontreras2-ui";
import { FormProvider } from "react-hook-form";
import { PhoneFrame } from "@/shared/components";
import { Link } from "@/i18n/navigation";
import { useResetPassword } from "./useResetPassword";

export default function ResetPassword() {
  const t = useTranslations("modules-auth-pages-ResetPassword");
  const { methods, onSubmit, sent } = useResetPassword();
  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <PhoneFrame>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-cream dark:bg-neutral-950 pt-14 pb-16 px-7">
        {/* Atmospheric orbs */}
        <div className="absolute -top-20 -right-14 size-64 rounded-full bg-sky-100 blur-[72px] opacity-80 dark:bg-sky-600 dark:opacity-8" />
        <div className="absolute top-6 -left-20 size-52 rounded-full bg-primary-100 blur-[60px] dark:bg-primary-600 dark:opacity-8" />
        {/* Decorative rings */}
        <div className="absolute bottom-8 right-8 size-12 rounded-full border border-sky-100/80 dark:border-sky-800/20" />

        <div className="relative">
          <span className="inline-grid place-items-center size-[60px] rounded-[20px] bg-gradient-to-br from-primary-600 to-primary-500 text-cream shadow-sage mb-5">
            <HeartPulse className="size-7" />
          </span>
          <p className="font-display-italic text-[17px] text-coral-600 leading-none mb-2">
            CuidaBox
          </p>
          <h1 className="font-display text-[40px] leading-[1.04] tracking-tight text-primary-700 dark:text-primary-300">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* ── Form card ── */}
      <div
        className="flex-1 bg-paper dark:bg-neutral-900 rounded-t-[36px] -mt-8 px-7 pt-6 pb-10 flex flex-col
          shadow-[0_-8px_32px_-4px_rgba(45,74,62,0.09)]
          dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]
          animate-fade-up"
      >
        {/* Sheet handle */}
        <div className="w-10 h-1 rounded-full bg-line dark:bg-neutral-700 mx-auto mb-7" />

        {sent ? (
          /* ── Success state ── */
          <div className="flex-1 flex flex-col items-center justify-center text-center pb-8 animate-fade-up">
            <div className="relative mb-6">
              <div className="size-24 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center ring-8 ring-primary-50/60 dark:ring-primary-900/10">
                <MailCheck className="size-11 text-primary-600 dark:text-primary-400" />
              </div>
              {/* Pulse rings */}
              <div
                className="absolute inset-0 rounded-full bg-primary-100/40 dark:bg-primary-800/10 scale-125 animate-ping"
                style={{ animationDuration: "2.4s" }}
              />
            </div>

            <h2 className="font-display text-[28px] leading-tight text-primary-700 dark:text-primary-300 mb-3">
              {t("successTitle")}
            </h2>
            <p className="text-[14.5px] text-ink-600 dark:text-ink-400 leading-relaxed max-w-[260px]">
              {t("success")}
            </p>

            <Link
              href="/sign-in"
              className="mt-10 inline-flex items-center gap-2 text-[14px] font-semibold text-primary-700 dark:text-primary-300 hover:text-primary-900 transition-colors"
            >
              <ChevronLeft className="size-4" />
              {t("back")}
            </Link>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <p className="text-[14.5px] text-ink-600 dark:text-ink-400 mb-7">
              {t("subtitle")}
            </p>

            <FormProvider {...methods}>
              <FieldsProvider t={t}>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: "80ms" }}
                  >
                    <FieldInput name="email" type="email" />
                  </div>

                  <div
                    className="animate-fade-up mt-2"
                    style={{ animationDelay: "140ms" }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      loading={isSubmitting}
                      className="bg-primary-700! text-cream! rounded-2xl! hover:bg-primary-900! h-14!"
                    >
                      {t("submit")}
                    </Button>
                  </div>
                </form>
              </FieldsProvider>
            </FormProvider>

            <Link
              href="/sign-in"
              className="mt-8 inline-flex items-center justify-center gap-1.5 text-[13px] text-ink-400 dark:text-ink-500 hover:text-primary-700 dark:hover:text-primary-300 transition-colors animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <ChevronLeft className="size-3.5" />
              {t("back")}
            </Link>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
