"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Input, Button } from "fcontreras2-ui";
import { PhoneFrame } from "@/shared/components";
import { CheckCircle } from "lucide-react";
import { useMain } from "./useMain";

export default function ResetPassword() {
  const t = useTranslations("modules-auth-pages-ResetPassword");
  const locale = useLocale();
  const { form, onSubmit, sent } = useMain();
  const { register, formState: { errors, isSubmitting } } = form;

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
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
              {...register("email")}
              type="email"
              label={t("email")}
              placeholder="hola@ejemplo.com"
              error={errors.email?.message}
            />
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={isSubmitting}
              className="!bg-primary-700 !text-cream !rounded-[16px] hover:!bg-primary-900 mt-2"
            >
              {t("submit")}
            </Button>
          </form>
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
