"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Pencil,
  Cake,
  Droplet,
  Weight,
  Ruler,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  Pill,
  BookOpenText,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Button } from "fcontreras2-ui";
import {
  PhoneFrame,
  PatientAvatar,
  SectionTitle,
  BackButton,
} from "@/shared/components";
import { useDetail } from "./useDetail";

interface Props {
  id: string;
}

const STAT_ICONS = {
  birthDate: Cake,
  bloodType: Droplet,
  weight: Weight,
  height: Ruler,
} as const;

export default function PatientDetail({ id }: Props) {
  const t = useTranslations("modules-patient-pages-Detail");
  const result = useDetail(id);

  if (!result.patient) {
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
              href="/"
              className="inline-flex mt-6 h-12 items-center px-5 rounded-full bg-coral-500 text-paper text-[14px] font-semibold hover:bg-coral-600 transition-colors"
            >
              {t("notFoundCta")}
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const { patient, profile, primaryDoctor, activeMedsCount, lastEvents } = result;

  const stats: Array<{ key: keyof typeof STAT_ICONS; label: string; value: string }> =
    profile
      ? [
          { key: "birthDate", label: t("birthDate"), value: profile.birthDate },
          { key: "bloodType", label: t("bloodType"), value: profile.bloodType },
          { key: "weight", label: t("weight"), value: profile.weight },
          { key: "height", label: t("height"), value: profile.height },
        ]
      : [];

  return (
    <PhoneFrame>
      {/* Header — coral gradient */}
      <header className="relative px-6 pt-12 pb-7 bg-gradient-to-br from-coral-500 to-coral-600 text-paper overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-8 size-40 rounded-full bg-primary-700/30 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <BackButton variant="dark" fallbackHref="/" />
          <button
            type="button"
            aria-label={t("edit")}
            className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        <div className="relative mt-5 flex items-center gap-4">
          <PatientAvatar
            name={patient.shortName}
            color={patient.avatarColor}
            size="xl"
            className="ring-4 ring-paper/25"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-85">
              {patient.gender === "F" ? "Niña" : "Niño"}
            </p>
            <h1 className="font-display text-[28px] leading-tight mt-1">
              {patient.name}
            </h1>
            <p className="font-display-italic text-[14px] text-cream mt-1 opacity-95">
              {patient.age} · {patient.status}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-7">
        {/* Basics grid */}
        {profile && (
          <section>
            <SectionTitle>{t("basics")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {stats.map(({ key, label, value }) => {
                const Icon = STAT_ICONS[key];
                return (
                  <div
                    key={key}
                    className="rounded-[18px] bg-paper border border-line p-3.5"
                  >
                    <div className="flex items-center gap-2 text-ink-400">
                      <Icon className="size-3.5" />
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold">
                        {label}
                      </span>
                    </div>
                    <p className="font-display text-[18px] text-primary-700 mt-1.5 leading-tight">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Allergies */}
        {profile && (
          <section>
            <SectionTitle>
              <span className="inline-flex items-center gap-2">
                <AlertTriangle className="size-4 text-coral-600" />
                {t("allergies")}
              </span>
            </SectionTitle>
            {profile.allergies.length === 0 ? (
              <p className="text-[13.5px] text-ink-400 italic">
                {t("noAllergies")}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full bg-coral-100 text-coral-600 text-[13px] font-medium px-3.5 py-1.5"
                  >
                    <AlertTriangle className="size-3" />
                    {a}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Conditions */}
        {profile && (
          <section>
            <SectionTitle>
              <span className="inline-flex items-center gap-2">
                <HeartPulse className="size-4 text-primary-600" />
                {t("conditions")}
              </span>
            </SectionTitle>
            {profile.conditions.length === 0 ? (
              <p className="text-[13.5px] text-ink-400 italic">
                {t("noConditions")}
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {profile.conditions.map((c) => (
                  <li
                    key={c}
                    className="rounded-[14px] bg-primary-50 border border-primary-100 px-4 py-2.5 text-[14px] text-primary-700"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Primary doctor */}
        {primaryDoctor && (
          <section>
            <SectionTitle>{t("primaryDoctor")}</SectionTitle>
            <Link
              href="/doctors"
              className="flex items-center gap-3 rounded-[18px] bg-paper border border-line p-4 hover:border-coral-200 hover:shadow-sage transition-all"
            >
              <PatientAvatar
                name={primaryDoctor.name.replace(/^(Dra?\.\s*)/, "")}
                color={primaryDoctor.avatarColor}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display text-[16px] text-primary-700 leading-tight">
                  {primaryDoctor.name}
                </p>
                <p className="text-[12.5px] text-ink-600 mt-0.5">
                  {primaryDoctor.specialty}
                </p>
              </div>
              <ChevronRight className="size-4 text-ink-400" />
            </Link>
          </section>
        )}

        {/* Notes */}
        {profile?.notes && (
          <section>
            <SectionTitle>{t("notes")}</SectionTitle>
            <div className="rounded-[18px] bg-cream border border-line/60 px-4 py-3.5">
              <p className="font-display-italic text-[14.5px] text-ink-600 leading-relaxed">
                "{profile.notes}"
              </p>
            </div>
          </section>
        )}

        {/* Shortcuts */}
        <section>
          <SectionTitle>{t("shortcutsTitle")}</SectionTitle>
          <div className="flex flex-col gap-2">
            <ShortcutLink
              href="/history"
              icon={BookOpenText}
              label={t("openHistory")}
              hint={`${lastEvents.length}+ registros`}
              tone="primary"
            />
            <ShortcutLink
              href="/medications"
              icon={Pill}
              label={t("openMedications")}
              hint={`${activeMedsCount} activos`}
              tone="gold"
            />
            <ShortcutLink
              href="/doctors"
              icon={Stethoscope}
              label={t("openDoctors")}
              tone="sky"
            />
          </div>
        </section>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          leftIcon={<Plus className="size-4" />}
          className="!bg-coral-500 hover:!bg-coral-600 !text-paper !rounded-[18px] !h-14 !shadow-warm"
        >
          {t("registerNew")}
        </Button>
      </main>
    </PhoneFrame>
  );
}

function ShortcutLink({
  href,
  icon: Icon,
  label,
  hint,
  tone,
}: {
  href: string;
  icon: typeof Pill;
  label: string;
  hint?: string;
  tone: "primary" | "gold" | "sky";
}) {
  const TONES = {
    primary: "bg-primary-100 text-primary-600",
    gold: "bg-gold-100 text-gold-500",
    sky: "bg-sky-100 text-sky-500",
  } as const;

  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[16px] bg-paper border border-line px-4 py-3 hover:border-coral-200 transition-colors"
    >
      <span
        className={`size-10 rounded-2xl grid place-items-center shrink-0 ${TONES[tone]}`}
      >
        <Icon className="size-[18px]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display text-[15px] text-primary-700 leading-tight">
          {label}
        </span>
        {hint && (
          <span className="block text-[12px] text-ink-400 mt-0.5">{hint}</span>
        )}
      </span>
      <ChevronRight className="size-4 text-ink-400" />
    </Link>
  );
}
