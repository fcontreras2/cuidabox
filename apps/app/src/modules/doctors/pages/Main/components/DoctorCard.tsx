"use client";

import { Phone, MapPin, Calendar, Star } from "lucide-react";
import { Card } from "fcontreras2-ui";
import { PatientAvatar } from "@/shared/components";
import type { Doctor } from "@/shared/types";

export function DoctorCard({
  doctor,
  featured = false,
}: {
  doctor: Doctor;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <article className="rounded-[24px] bg-gradient-to-br from-primary-700 to-primary-500 text-cream p-6 shadow-sage relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-12 -right-10 size-44 rounded-full bg-paper/10 blur-2xl"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold bg-paper/15 px-2.5 py-1 rounded-full mb-4">
            <Star className="size-3 fill-current" />
            Médico de cabecera
          </span>
          <div className="flex items-start gap-4">
            <PatientAvatar
              name={doctor.name.replace(/^(Dra?\.\s*)/, "")}
              color={doctor.avatarColor}
              size="lg"
              className="ring-4 ring-paper/20"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-[22px] leading-tight">{doctor.name}</h3>
              <p className="text-[14px] opacity-90 mt-0.5">{doctor.specialty}</p>
            </div>
          </div>
          {doctor.nextAppointment && (
            <div className="mt-4 flex items-center gap-2 text-[14px]">
              <Calendar className="size-4 opacity-80" />
              <span className="opacity-80">Próxima cita</span>
              <span className="font-display-italic text-coral-200">
                {doctor.nextAppointment}
              </span>
            </div>
          )}
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              className="flex-1 h-11 rounded-full bg-paper text-primary-700 text-[14px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-cream transition-colors"
            >
              <Phone className="size-4" />
              Llamar
            </button>
            <button
              type="button"
              className="size-11 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors"
              aria-label="Ver ubicación"
            >
              <MapPin className="size-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <Card
      padding="none"
      shadow="none"
      className="!border-line bg-paper !rounded-[18px] p-4 hover:border-coral-200 hover:shadow-sage transition-all"
    >
      <div className="flex items-start gap-3">
        <PatientAvatar
          name={doctor.name.replace(/^(Dra?\.\s*)/, "")}
          color={doctor.avatarColor}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-[17px] leading-tight text-primary-700">
            {doctor.name}
          </h4>
          <p className="text-[13px] text-ink-600 mt-0.5">{doctor.specialty}</p>
          {doctor.hospital && (
            <p className="text-[12px] text-ink-400 mt-1.5 flex items-center gap-1">
              <MapPin className="size-3" />
              {doctor.hospital}
            </p>
          )}
          {doctor.nextAppointment && (
            <p className="text-[12px] mt-1.5 inline-flex items-center gap-1 text-coral-600 font-medium">
              <Calendar className="size-3" />
              {doctor.nextAppointment}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
