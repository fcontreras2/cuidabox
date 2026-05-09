"use client";

import { useTranslations } from "next-intl";
import { HeartPulse } from "lucide-react";
import { Button, FieldInput, FieldsProvider } from "fcontreras2-ui";
import { FormProvider } from "react-hook-form";
import { PhoneFrame } from "@/shared/components";
import { Link } from "@/i18n/navigation";
import { useSignUp } from "./useSignUp";

export default function SignUp() {
  const t = useTranslations("modules-auth-pages-SignUp");
  const { methods, onSubmit, serverError } = useSignUp();
  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <PhoneFrame>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-cream dark:bg-neutral-950 pt-14 pb-16 px-7">
        {/* Atmospheric orbs */}
        <div className="absolute -top-20 -right-12 size-64 rounded-full bg-gold-100 blur-[72px] opacity-80 dark:bg-gold-500 dark:opacity-8" />
        <div className="absolute -top-6 -left-20 size-52 rounded-full bg-primary-100 blur-[60px] dark:bg-primary-600 dark:opacity-8" />
        {/* Decorative rings */}
        <div className="absolute bottom-8 right-8 size-14 rounded-full border border-gold-200/50 dark:border-gold-700/20" />
        <div className="absolute bottom-4 right-4 size-6 rounded-full border border-coral-100 dark:border-coral-800/20" />

        <div className="relative">
          <span className="inline-grid place-items-center size-[60px] rounded-[20px] bg-gradient-to-br from-primary-600 to-primary-500 text-cream shadow-sage mb-5">
            <HeartPulse className="size-7" />
          </span>
          <p className="font-display-italic text-[17px] text-coral-600 leading-none mb-2">
            CuidaBox
          </p>
          <h1 className="font-display text-[42px] leading-[1.02] tracking-tight text-primary-700 dark:text-primary-300">
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

        <p className="text-[14.5px] text-ink-600 dark:text-ink-400 mb-6">
          {t("subtitle")}
        </p>

        <FormProvider {...methods}>
          <FieldsProvider t={t}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div
                className="animate-fade-up"
                style={{ animationDelay: "80ms" }}
              >
                <FieldInput name="name" />
              </div>
              <div
                className="animate-fade-up"
                style={{ animationDelay: "140ms" }}
              >
                <FieldInput name="email" type="email" />
              </div>
              <div
                className="animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <FieldInput name="password" type="password" />
              </div>

              {serverError && (
                <div className="px-3.5 py-2.5 rounded-xl bg-coral-100 dark:bg-coral-600/10 border border-coral-200 dark:border-coral-600/20">
                  <p className="text-[13px] text-coral-600 font-medium">
                    {t(`errors.${serverError}`)}
                  </p>
                </div>
              )}

              <div
                className="animate-fade-up mt-1"
                style={{ animationDelay: "260ms" }}
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

        <p
          className="text-center text-[13px] text-ink-400 dark:text-ink-500 mt-7 animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          {t("hasAccount")}{" "}
          <Link
            href="/sign-in"
            className="text-primary-700 dark:text-primary-300 font-semibold hover:underline"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </PhoneFrame>
  );
}
