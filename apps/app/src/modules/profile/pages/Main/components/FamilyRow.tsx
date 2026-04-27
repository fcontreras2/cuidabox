"use client";

import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PatientAvatar } from "@/shared/components";
import type { Patient } from "@/shared/types";

export function FamilyRow({ patient }: { patient: Patient }) {
  return (
    <Link
      href={`/patient/${patient.id}`}
      className="flex items-center gap-3 px-4 py-3 rounded-[16px] bg-paper border border-line hover:border-coral-200 hover:shadow-sage transition-all"
    >
      <PatientAvatar
        name={patient.shortName}
        color={patient.avatarColor}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display text-[16px] leading-tight text-primary-700">
          {patient.shortName}
        </p>
        <p className="text-[12px] text-ink-400 mt-0.5 truncate">
          {patient.age} · <span className="italic">{patient.status}</span>
        </p>
      </div>
      <ChevronRight className="size-4 text-ink-400 shrink-0" />
    </Link>
  );
}
