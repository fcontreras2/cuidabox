"use client";

import { useCallback } from "react";

/**
 * Lógica del landing. Centraliza las URLs externas (subdominios de las
 * otras apps del ecosistema) y los handlers de navegación interna.
 *
 * Las URLs son configurables vía variables de entorno para que cada
 * ambiente (local / staging / prod) apunte a su propio dominio.
 */
export function useMain() {
  const appLoginUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const docLoginUrl =
    process.env.NEXT_PUBLIC_DOC_URL ?? "http://localhost:3002";

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return {
    appLoginUrl,
    docLoginUrl,
    scrollToSection,
  };
}
