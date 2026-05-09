"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientsClient } from "@cuidabox/api";
import type { Step1Values } from "./steps/useStep1";
import type { Step2Values } from "./steps/useStep2";
import type { Step3Values } from "./steps/useStep3";

interface CreateInput {
  step1: Step1Values;
  step2: Step2Values;
  step3: Step3Values;
}

function toISODate(date: Date | null | undefined): string | undefined {
  if (!date) return undefined;
  return date.toISOString().split("T")[0];
}

export function useCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ step1, step2, step3 }: CreateInput) =>
      patientsClient.create({
        name: step1.name,
        ...(toISODate(step1.birthdate) && {
          birthdate: toISODate(step1.birthdate),
        }),
        ...(step1.relationship?.value && {
          relationship: step1.relationship.value,
        }),
        ...(step2.gender?.value && { gender: step2.gender.value }),
        ...(step2.blood_type?.value && { blood_type: step2.blood_type.value }),
        ...(step2.notes && { notes: step2.notes }),
        ...(step3.insurance_provider && {
          insurance_provider: step3.insurance_provider,
        }),
        ...(step3.insurance_policy_number && {
          insurance_policy_number: step3.insurance_policy_number,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      router.push("/");
    },
    onError: () => setServerError("generic"),
  });

  const submit = (input: CreateInput) => {
    setServerError(null);
    mutate(input);
  };

  return { submit, isPending, serverError };
}
