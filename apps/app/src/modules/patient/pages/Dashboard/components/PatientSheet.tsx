"use client";

import { useRouter } from "@/i18n/navigation";
import { Users, AlertTriangle, Droplet, Cake } from "lucide-react";
import { BottomSheet } from "@/shared/components";

interface Props {
  open: boolean;
  onClose: () => void;
  patientName: string;
  age: string;
  bloodType: string | null;
  allergiesCount: number;
}

export function PatientSheet({
  open,
  onClose,
  patientName,
  age,
  bloodType,
  allergiesCount,
}: Props) {
  const router = useRouter();

  const handleChangePatient = () => {
    onClose();
    router.push("/patient");
  };

  return (
    <BottomSheet open={open} onClose={onClose} title={patientName}>
      <div className="flex flex-col gap-5">
        {/* Info chips */}
        <div className="flex flex-wrap gap-2">
          {age && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-[13px] font-medium">
              <Cake className="size-3.5" />
              {age}
            </span>
          )}
          {bloodType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-50 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400 text-[13px] font-medium">
              <Droplet className="size-3.5" />
              {bloodType}
            </span>
          )}
          {allergiesCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-100 dark:bg-coral-900/40 text-coral-600 dark:text-coral-400 text-[13px] font-medium">
              <AlertTriangle className="size-3.5" />
              {allergiesCount} alergia{allergiesCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Change patient CTA */}
        <button
          type="button"
          onClick={handleChangePatient}
          className="flex items-center justify-center gap-2 h-13 w-full rounded-[18px] bg-primary-700 hover:bg-primary-900 text-cream text-[15px] font-semibold transition-colors"
        >
          <Users className="size-4" />
          Cambiar de paciente
        </button>
      </div>
    </BottomSheet>
  );
}
