"use client";

import { useTranslations } from "next-intl";
import { HeartPulse } from "lucide-react";
import { Button, FieldInput, FieldsProvider } from "fcontreras2-ui";
import { FormProvider } from "react-hook-form";
import { PhoneFrame } from "@/shared/components";
import { Link } from "@/i18n/navigation";
import { useSignIn } from "./useSignIn";

export default function SignIn() {
  const t = useTranslations("modules-auth-pages-SignIn");
  const { methods, onSubmit, serverError } = useSignIn();
  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <PhoneFrame>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-cream dark:bg-neutral-950 pt-16 pb-20 px-7">
        {/* Atmospheric orbs */}
        <div className="absolute -top-24 -right-16 size-72 rounded-full bg-coral-100 blur-[80px] opacity-90 dark:bg-coral-500 dark:opacity-10" />
        <div className="absolute top-8 -left-24 size-56 rounded-full bg-primary-100 blur-[64px] dark:bg-primary-600 dark:opacity-8" />
        {/* Decorative ring */}
        <div className="absolute bottom-10 right-7 size-11 rounded-full border border-coral-200/70 dark:border-coral-700/30" />
        <div className="absolute bottom-6 right-3 size-5 rounded-full border border-coral-100 dark:border-coral-800/20" />

        <div className="relative">
          <span className="inline-grid place-items-center size-[60px] rounded-[20px] bg-gradient-to-br from-primary-600 to-primary-500 text-cream shadow-sage mb-5">
            <HeartPulse className="size-7" />
          </span>
          <p className="font-display-italic text-[17px] text-coral-600 leading-none mb-2">
            CuidaBox
          </p>
          <h1 className="font-display text-[46px] leading-[1.0] tracking-tight text-primary-700 dark:text-primary-300">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* ── Form card ── */}
      <div
        className="flex-1 bg-paper dark:bg-neutral-900 rounded-t-[36px] -mt-10 px-7 pt-6 pb-10 flex flex-col
          shadow-[0_-8px_32px_-4px_rgba(45,74,62,0.09)]
          dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]
          animate-fade-up"
      >
        {/* Sheet handle */}
        <div className="w-10 h-1 rounded-full bg-line dark:bg-neutral-700 mx-auto mb-7" />

        <p
          className="text-[14.5px] text-ink-600 dark:text-ink-400 mb-7"
          style={{ animationDelay: "60ms" }}
        >
          {t("subtitle")}
        </p>

        <FormProvider {...methods}>
          <FieldsProvider t={t}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div
                className="animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                <FieldInput name="email" type="email" />
              </div>

              <div
                className="animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                <FieldInput name="password" type="password" />
                <div className="flex justify-end mt-2">
                  <Link
                    href="/reset-password"
                    className="text-[12.5px] text-ink-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
              </div>

              {serverError && (
                <div className="px-3.5 py-2.5 rounded-xl bg-coral-100 dark:bg-coral-600/10 border border-coral-200 dark:border-coral-600/20">
                  <p className="text-[13px] text-coral-600 font-medium">
                    {t(`errors.${serverError}`)}
                  </p>
                </div>
              )}

              <div
                className="animate-fade-up mt-2"
                style={{ animationDelay: "220ms" }}
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
          className="text-center text-[13px] text-ink-400 dark:text-ink-500 mt-8 animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          {t("noAccount")}{" "}
          <Link
            href="/sign-up"
            className="text-primary-700 dark:text-primary-300 font-semibold hover:underline"
          >
            {t("signUp")}
          </Link>
        </p>
      </div>
    </PhoneFrame>
  );
}
