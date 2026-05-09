"use client";

import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { FieldTextarea, FieldsProvider, FieldSelect } from "fcontreras2-ui";
import { useStep2 } from "./useStep2";

interface Props {
  hook: ReturnType<typeof useStep2>;
}

export function Step2Medical({ hook }: Props) {
  const t = useTranslations("modules-patient-pages-Create");
  const { methods, genderOptions, bloodTypeOptions } = hook;

  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>
        <div className="flex flex-col gap-4">
          <FieldSelect name="gender" options={genderOptions} isClearable />
          <FieldSelect
            name="blood_type"
            options={bloodTypeOptions}
            isClearable
          />
          <FieldTextarea name="notes" rows={3} />
        </div>
      </FieldsProvider>
    </FormProvider>
  );
}
