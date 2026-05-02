"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Input, Button } from "fcontreras2-ui";
import { PhoneFrame } from "@/shared/components";
import { useMain } from "./useMain";

export default function SignIn() {
  const t = useTranslations("modules-auth-pages-SignIn");
  const locale = useLocale();
  const { form, onSubmit, serverError } = useMain();
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

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            {...register("email")}
            type="email"
            label={t("email")}
            placeholder="hola@ejemplo.com"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            type="password"
            label={t("password")}
            placeholder="••••••••"
            error={errors.password?.message}
          />

          {serverError && (
            <p className="text-[13px] text-coral-600 text-center">
              {t(`errors.${serverError}`)}
            </p>
          )}

          <Link
            href={`/${locale}/reset-password`}
            className="text-[13px] text-ink-400 hover:text-primary-700 text-right -mt-1"
          >
            {t("forgotPassword")}
          </Link>

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

        <p className="text-center text-[13px] text-ink-400 mt-8">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/sign-up`}
            className="text-primary-700 dark:text-primary-300 font-semibold hover:underline"
          >
            {t("signUp")}
          </Link>
        </p>
      </main>
    </PhoneFrame>
  );
}
