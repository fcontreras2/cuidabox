"use client";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BLOOD_TYPE_OPTIONS } from "@cuidabox/components";
import type { SelectOption } from "@cuidabox/components";

const schema = yup.object({
  gender: yup.mixed<SelectOption>().nullable().optional(),
  blood_type: yup.mixed<SelectOption>().nullable().optional(),
  notes: yup.string().max(500).optional(),
});

export type Step2Values = yup.InferType<typeof schema>;

export function useStep2() {
  const methods = useForm<Step2Values>({
    resolver: yupResolver(schema) as Resolver<Step2Values>,
  });

  const genderOptions: SelectOption[] = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femenino" },
    { value: "other", label: "Otro" },
  ];

  const onSubmit = (): Promise<boolean> =>
    new Promise((resolve) => {
      methods.handleSubmit(
        () => resolve(true),
        () => resolve(false),
      )();
    });

  return {
    methods,
    onSubmit,
    genderOptions,
    bloodTypeOptions: BLOOD_TYPE_OPTIONS,
  };
}
