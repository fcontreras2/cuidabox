"use client";

import { useRouter } from "next/navigation";
import { usePatients } from "@/shared/hooks/usePatients";

export function useMain() {
  const router = useRouter();
  const { patients, selectPatient } = usePatients();

  const handleSelect = (id: string) => {
    selectPatient(id);
    router.push("/dashboard");
  };

  return { patients, handleSelect };
}
