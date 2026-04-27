"use client";

import { useState, useCallback } from "react";
import type { QuickExample } from "@/shared/types";

const EXAMPLES: QuickExample[] = [
  { id: "1", icon: "thermometer", text: "Tuvo fiebre anoche a las 2am" },
  { id: "2", icon: "pill", text: "Le di paracetamol 5ml a las 20:00" },
  { id: "3", icon: "stethoscope", text: "El pediatra recetó 5 días de amoxicilina" },
  { id: "4", icon: "moon", text: "Durmió mal, se despertó 3 veces" },
];

export function useMain() {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [parsed, setParsed] = useState<null | {
    type: string;
    drug?: string;
    fever?: string;
    time?: string;
  }>(null);

  const useExample = useCallback((example: QuickExample) => {
    setText(example.text);
  }, []);

  const toggleRecording = useCallback(() => {
    setRecording((r) => !r);
  }, []);

  const process = useCallback(() => {
    if (!text.trim()) return;
    setParsed({
      type: "Medicamento + Síntoma",
      drug: "Paracetamol 5 ml",
      fever: "38.2 °C",
      time: "20:00",
    });
  }, [text]);

  const reset = useCallback(() => {
    setText("");
    setParsed(null);
    setRecording(false);
  }, []);

  return {
    text,
    setText,
    recording,
    toggleRecording,
    parsed,
    process,
    reset,
    examples: EXAMPLES,
    useExample,
  };
}
