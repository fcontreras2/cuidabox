"use client";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  insurance_provider: yup.string().max(100).optional(),
  insurance_policy_number: yup.string().max(50).optional(),
});

export type Step3Values = yup.InferType<typeof schema>;

export function useStep3() {
  const methods = useForm<Step3Values>({
    resolver: yupResolver(schema) as Resolver<Step3Values>,
  });

  const onSubmit = (): Promise<boolean> =>
    new Promise((resolve) => {
      methods.handleSubmit(
        () => resolve(true),
        () => resolve(false),
      )();
    });

  return { methods, onSubmit };
}
