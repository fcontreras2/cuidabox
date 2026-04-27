"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Thermometer,
  Pill,
  Stethoscope,
  Syringe,
  FlaskConical,
  Moon,
  NotebookPen,
  Pencil,
  Trash2,
  Share2,
  Paperclip,
  FileText,
  Camera,
  Mic,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PhoneFrame,
  PatientAvatar,
  SectionTitle,
  BackButton,
} from "@/shared/components";
import type { TimelineEventType } from "@/shared/types";
import { useDetail } from "./useDetail";

interface Props {
  id: string;
}

const ICONS: Record<TimelineEventType, LucideIcon> = {
  fever: Thermometer,
  medication: Pill,
  appointment: Stethoscope,
  vaccine: Syringe,
  exam: FlaskConical,
  sleep: Moon,
  note: NotebookPen,
};

const HEADER_BG: Record<TimelineEventType, string> = {
  fever: "from-coral-500 to-coral-600",
  medication: "from-gold-500 to-coral-500",
  appointment: "from-sky-500 to-primary-500",
  vaccine: "from-plum-500 to-primary-500",
  exam: "from-gold-500 to-primary-500",
  sleep: "from-plum-500 to-sky-500",
  note: "from-primary-500 to-primary-700",
};

const ATTACHMENT_ICON = {
  doc: FileText,
  photo: Camera,
  audio: Mic,
} as const;

export default function EventDetail({ id }: Props) {
  const t = useTranslations("modules-history-pages-Detail");
  const result = useDetail(id);

  if (!result.event) {
    return (
      <PhoneFrame>
        <div className="flex-1 grid place-items-center px-8 text-center">
          <div>
            <h1 className="font-display text-[24px] text-primary-700">
              {t("notFoundTitle")}
            </h1>
            <p className="text-[14px] text-ink-600 mt-2">
              {t("notFoundSubtitle")}
            </p>
            <Link
              href="/history"
              className="inline-flex mt-6 h-12 items-center px-5 rounded-full bg-coral-500 text-paper text-[14px] font-semibold hover:bg-coral-600 transition-colors"
            >
              {t("notFoundCta")}
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const { event, extras, doctor, related } = result;
  const Icon = ICONS[event.type];

  return (
    <PhoneFrame>
      <header
        className={`relative px-6 pt-12 pb-7 bg-gradient-to-br ${HEADER_BG[event.type]} text-paper overflow-hidden`}
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/15 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <BackButton variant="dark" fallbackHref="/history" />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t("edit")}
              className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label={t("delete")}
              className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-5">
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] font-semibold opacity-90">
            <span className="size-7 rounded-full bg-paper/20 grid place-items-center">
              <Icon className="size-3.5" />
            </span>
            {event.type}
          </div>
          <h1 className="font-display text-[28px] leading-tight mt-3">
            {event.title}
          </h1>
          <p className="font-display-italic text-[15px] mt-1 opacity-95">
            {event.dateLabel} · {event.timeLabel}
          </p>
          {event.meta && (
            <span className="inline-block mt-3 text-[11px] uppercase tracking-[0.14em] font-semibold bg-paper/20 px-2.5 py-1 rounded-full">
              {event.meta}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-7">
        {/* Long description */}
        {(extras?.longDescription || event.description) && (
          <section>
            <SectionTitle>{t("longDescriptionTitle")}</SectionTitle>
            <p className="text-[14.5px] text-ink-600 leading-relaxed">
              {extras?.longDescription ?? event.description}
            </p>
          </section>
        )}

        {/* Measurements */}
        {extras?.measurements && extras.measurements.length > 0 && (
          <section>
            <SectionTitle>{t("measurementsTitle")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {extras.measurements.map((m) => (
                <div
                  key={m.label}
                  className="rounded-[18px] bg-paper border border-line p-3.5"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
                    {m.label}
                  </p>
                  <p className="font-display text-[20px] text-primary-700 mt-1.5 leading-tight mono-num">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Attachments */}
        {extras?.attachments && extras.attachments.length > 0 && (
          <section>
            <SectionTitle hint={`${extras.attachments.length}`}>
              <span className="inline-flex items-center gap-2">
                <Paperclip className="size-4 text-primary-600" />
                {t("attachmentsTitle")}
              </span>
            </SectionTitle>
            <div className="flex flex-col gap-2">
              {extras.attachments.map((att) => {
                const AttIcon = ATTACHMENT_ICON[att.kind];
                return (
                  <button
                    key={att.id}
                    type="button"
                    className="flex items-center gap-3 rounded-[16px] bg-paper border border-line px-4 py-3 hover:border-coral-200 transition-colors text-left"
                  >
                    <span className="size-10 rounded-2xl bg-primary-50 grid place-items-center text-primary-600 shrink-0">
                      <AttIcon className="size-[18px]" />
                    </span>
                    <span className="flex-1 min-w-0 font-display text-[15px] text-primary-700">
                      {att.label}
                    </span>
                    <ChevronRight className="size-4 text-ink-400" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Doctor */}
        {doctor && (
          <section>
            <SectionTitle>{t("doctorTitle")}</SectionTitle>
            <Link
              href="/doctors"
              className="flex items-center gap-3 rounded-[18px] bg-paper border border-line p-4 hover:border-coral-200 hover:shadow-sage transition-all"
            >
              <PatientAvatar
                name={doctor.name.replace(/^(Dra?\.\s*)/, "")}
                color={doctor.avatarColor}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display text-[16px] text-primary-700 leading-tight">
                  {doctor.name}
                </p>
                <p className="text-[12.5px] text-ink-600 mt-0.5">
                  {doctor.specialty}
                </p>
              </div>
              <ChevronRight className="size-4 text-ink-400" />
            </Link>
          </section>
        )}

        {/* Related events */}
        {related.length > 0 && (
          <section>
            <SectionTitle>{t("relatedTitle")}</SectionTitle>
            <div className="flex flex-col gap-2">
              {related.map((r) => {
                const RelIcon = ICONS[r.type];
                return (
                  <Link
                    key={r.id}
                    href={`/history/${r.id}`}
                    className="flex items-center gap-3 rounded-[16px] bg-paper border border-line px-4 py-3 hover:border-coral-200 transition-colors"
                  >
                    <span className="size-9 rounded-full bg-cream grid place-items-center text-primary-600 shrink-0">
                      <RelIcon className="size-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-[15px] text-primary-700 leading-tight truncate">
                        {r.title}
                      </span>
                      <span className="block text-[12px] text-ink-400 mt-0.5">
                        {r.dateLabel} · {r.timeLabel}
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-ink-400" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <button
          type="button"
          className="w-full h-13 inline-flex items-center justify-center gap-2 rounded-[18px] border border-line bg-paper text-primary-700 font-medium hover:border-coral-200 transition-colors py-3"
        >
          <Share2 className="size-4" />
          {t("shareWithDoctor")}
        </button>
      </main>
    </PhoneFrame>
  );
}
