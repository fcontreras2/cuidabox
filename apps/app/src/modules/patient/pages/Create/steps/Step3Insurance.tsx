"use client";

import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { FieldInput, FieldsProvider } from "fcontreras2-ui";
import { useStep3 } from "./useStep3";

interface Props {
  hook: ReturnType<typeof useStep3>;
}

export function Step3Insurance({ hook }: Props) {
  const t = useTranslations("modules-patient-pages-Create");
  const { methods } = hook;

  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>
        <div className="flex flex-col gap-4">
          <FieldInput name="insurance_provider" />
          <FieldInput name="insurance_policy_number" />
        </div>
      </FieldsProvider>
    </FormProvider>
  );
}
