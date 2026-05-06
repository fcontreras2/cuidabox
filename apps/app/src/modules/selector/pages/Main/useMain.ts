"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { patientsClient } from "@cuidabox/api";
import type { Patient } from "@/shared/types";

const AVATAR_COLORS: Patient["avatarColor"][] = ["coral", "sky", "plum", "gold", "sage"];

export function useMain() {
  const router = useRouter();
  const locale = useLocale();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const dtos = await patientsClient.findAll();
      return dtos.map((dto, i): Patient => ({
        id: dto.id,
        name: dto.name,
        shortName: dto.name.split(" ")[0],
        age: `${dto.age} años`,
        gender: "M",
        avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
        status: "",
      }));
    },
  });

  const handleSelect = (_id: string) => {
    router.push(`/${locale}/dashboard`);
  };

  return { patients, isLoading, handleSelect };
}
