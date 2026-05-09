"use client";

import { useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { patientsClient, authClient } from "@cuidabox/api";
import type { PatientWithUI } from "@/shared/types";

const AVATAR_COLORS: PatientWithUI["avatarColor"][] = [
  "coral",
  "sky",
  "plum",
  "gold",
  "sage",
];

export function useMain() {
  const router = useRouter();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    staleTime: 5 * 60 * 1000, // 5 min — evita refetch en cada foco de ventana
    queryFn: async () => {
      const { data: raw } = await patientsClient.findAll();
      return raw.map((p, i) => ({
        ...p,
        shortName: p.name.split(" ")[0],
        age: p.birthdate
          ? `${new Date().getFullYear() - new Date(p.birthdate).getFullYear()} años`
          : "",
        avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
      }));
    },
  });

  const handleSelect = (_id: string) => {
    router.push("/dashboard");
  };

  const handleLogout = () => authClient.logout();

  return { patients, isLoading, handleSelect, handleLogout };
}
