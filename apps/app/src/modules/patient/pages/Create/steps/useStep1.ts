"use client";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SelectOption } from "@cuidabox/components";

const schema = yup.object({
  name: yup.string().trim().min(2).max(100).required(),
  birthdate: yup.date().nullable().optional(),
  relationship: yup.mixed<SelectOption>().nullable().optional(),
});

export type Step1Values = yup.InferType<typeof schema>;

export function useStep1() {
  const methods = useForm<Step1Values>({
    resolver: yupResolver(schema) as Resolver<Step1Values>,
    defaultValues: {
      relationship: { value: "parent", label: "Padre / Madre" },
    },
  });

  const relationshipOptions: SelectOption[] = [
    { value: "parent", label: "Padre / Madre" },
    { value: "guardian", label: "Tutor/a" },
    { value: "self", label: "Yo mismo/a" },
    { value: "other", label: "Otro" },
  ];

  const onSubmit = (): Promise<boolean> =>
    new Promise((resolve) => {
      methods.handleSubmit(
        () => resolve(true),
        () => resolve(false),
      )();
    });

  return { methods, onSubmit, relationshipOptions };
}
