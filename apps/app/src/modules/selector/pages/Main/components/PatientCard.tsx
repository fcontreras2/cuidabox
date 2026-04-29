"use client";

import { ChevronRight } from "lucide-react";
import { Card } from "fcontreras2-ui";
import { PatientAvatar } from "@/shared/components";
import type { Patient } from "@/shared/types";

export function PatientCard({
  patient,
  onSelect,
}: {
  patient: Patient;
  onSelect: (id: string) => void;
}) {
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
            <div className="mt-1.5 text-sm text-ink-600">
              <span className="font-display-italic text-coral-600">
                {patient.age}
              </span>
              <span className="mx-2 text-ink-200">·</span>
              <span>{patient.status}</span>
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
