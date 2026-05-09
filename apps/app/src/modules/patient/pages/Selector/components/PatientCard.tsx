"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "fcontreras2-ui";
import { PatientAvatar } from "@/shared/components";
import type { PatientWithUI } from "@/shared/types";

export function PatientCard({
  patient,
  onSelect,
}: {
  patient: PatientWithUI;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("modules-patient-pages-Selector");

  const genderLabel =
    patient.gender && patient.gender in { male: 1, female: 1, other: 1 }
      ? t(`gender.${patient.gender}`)
      : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(patient.id)}
      className="group w-full text-left"
    >
      <Card
        padding="none"
        shadow="none"
        className="!border-line bg-paper rounded-[18px] p-4 transition-all group-hover:shadow-sage group-hover:-translate-y-0.5 group-hover:border-coral-200"
      >
        <div className="flex items-center gap-4">
          <PatientAvatar
            name={patient.shortName}
            color={patient.avatarColor}
            size="lg"
            className="h-10 w-10"
          />
          <div className="flex-1 min-w-0">
            <div className="font-display text-[20px] leading-none text-primary-700">
              {patient.shortName}
            </div>
            <div className="mt-1.5 text-sm text-ink-600 flex items-center gap-1.5">
              {patient.age && (
                <span className="font-display-italic text-coral-600">
                  {patient.age}
                </span>
              )}
              {patient.age && genderLabel && (
                <span className="text-ink-200">·</span>
              )}
              {genderLabel && <span>{genderLabel}</span>}
            </div>
          </div>
          <span className="size-10 rounded-full bg-cream-2 flex items-center justify-center text-ink-400 group-hover:bg-primary-700 group-hover:text-cream transition-colors">
            <ChevronRight className="size-5" />
          </span>
        </div>
      </Card>
    </button>
  );
}
