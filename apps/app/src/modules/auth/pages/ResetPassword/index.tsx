"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button, FieldInput, FieldsProvider } from "fcontreras2-ui";
import { FormProvider } from "react-hook-form";
import { PhoneFrame } from "@/shared/components";
import { CheckCircle } from "lucide-react";
import { useResetPassword } from "./useResetPassword";

export default function ResetPassword() {
  const t = useTranslations("modules-auth-pages-ResetPassword");
  const locale = useLocale();
  const { methods, onSubmit, sent } = useResetPassword();
  const { formState: { isSubmitting } } = methods;

  return (
    <PhoneFrame>
      <main className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mb-10">
          <p className="font-display-italic text-[18px] text-coral-600">CuidaBox</p>
          <h1 className="mt-1 font-display text-[36px] leading-tight text-primary-700 dark:text-primary-300">
            {t("title")}
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-600 dark:text-ink-400">
            {t("subtitle")}
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle className="size-14 text-primary-500" />
            <p className="text-[15px] text-ink-600 dark:text-ink-400">
              {t("success")}
            </p>
          </div>
        ) : (
          <FormProvider {...methods}>
            <FieldsProvider t={t}>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <FieldInput name="email" type="email" />
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  className="bg-primary-700! text-cream! rounded-2xl! hover:bg-primary-900! mt-2"
                >
                  {t("submit")}
                </Button>
              </form>
            </FieldsProvider>
          </FormProvider>
        )}

        <Link
          href={`/${locale}/sign-in`}
          className="text-center text-[13px] text-ink-400 hover:text-primary-700 mt-8"
        >
          {t("back")}
        </Link>
      </main>
    </PhoneFrame>
  );
}
