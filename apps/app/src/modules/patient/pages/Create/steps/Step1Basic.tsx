"use client";

import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import {
  FieldInput,
  FieldsProvider,
  FieldSelect,
  FieldDate,
} from "fcontreras2-ui";
import { useStep1 } from "./useStep1";

interface Props {
  hook: ReturnType<typeof useStep1>;
}

export function Step1Basic({ hook }: Props) {
  const t = useTranslations("modules-patient-pages-Create");
  const { methods, relationshipOptions } = hook;

  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>
        <div className="flex flex-col gap-4">
          <FieldInput name="name" required />
          <FieldDate name="birthdate" maxDate={new Date()} />
          <FieldSelect name="relationship" options={relationshipOptions} />
        </div>
      </FieldsProvider>
    </FormProvider>
  );
}
