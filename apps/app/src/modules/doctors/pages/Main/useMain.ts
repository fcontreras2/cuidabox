"use client";

import { useMemo } from "react";
import type { Doctor } from "@/shared/types";

const MOCK_DOCTORS: Doctor[] = [
  {
    id: "mendoza",
    name: "Dra. Carmen Mendoza",
    specialty: "Pediatra de cabecera",
    hospital: "Centro Salud Norte",
    phone: "+56 9 8765 4321",
    nextAppointment: "Mañana · 10:30",
    avatarColor: "sky",
    isPrimary: true,
  },
  {
    id: "rojas",
    name: "Dr. Andrés Rojas",
    specialty: "Otorrino",
    hospital: "Clínica Las Condes",
    nextAppointment: "12 may · 16:00",
    avatarColor: "plum",
  },
  {
    id: "navarro",
    name: "Dra. Paula Navarro",
    specialty: "Dermatóloga",
    hospital: "Clínica Alemana",
    avatarColor: "gold",
  },
  {
    id: "torres",
    name: "Dr. Felipe Torres",
    specialty: "Nutriólogo infantil",
    hospital: "Centro Médico Sur",
    avatarColor: "sage",
  },
];

export function useMain() {
  const doctors = useMemo(() => MOCK_DOCTORS, []);
  const primary = doctors.find((d) => d.isPrimary);
  const others = doctors.filter((d) => !d.isPrimary);
  return { doctors, primary, others };
}
