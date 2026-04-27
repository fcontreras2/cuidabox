"use client";

import { useTranslations } from "next-intl";
import {
  Bell,
  Globe2,
  Moon,
  ShieldCheck,
  Download,
  HelpCircle,
  Info,
  LogOut,
  Pencil,
  Users,
} from "lucide-react";
import { Button } from "fcontreras2-ui";
import { PhoneFrame, PatientAvatar, SectionTitle, TabBar } from "@/shared/components";
import { useLocale } from "next-intl";
import { useMain } from "./useMain";
import { SettingsItem, SettingsGroup } from "./components/SettingsItem";
import { FamilyRow } from "./components/FamilyRow";
import { LanguageSheet } from "./components/LanguageSheet";
import { LOCALE_LABELS, type AppLocale } from "@/shared/hooks/useLocaleSwitcher";

export default function ProfileMain() {
  const t = useTranslations("modules-profile-pages-Main");
  const { caregiver, patients, stats, openSheet, openLanguageSheet, closeSheet } = useMain();
  const locale = useLocale() as AppLocale;
  const currentLanguage = LOCALE_LABELS[locale]?.native ?? t("items.languageDesc");

  return (
    <PhoneFrame>
      {/* Header band — sage gradient with caregiver identity */}
      <header className="relative px-6 pt-12 pb-7 bg-gradient-to-br from-primary-700 to-primary-500 text-cream overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-8 size-40 rounded-full bg-coral-500/20 blur-3xl"
        />
        <div className="relative flex items-start justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-80">
            {t("header")}
          </p>
          <button
            type="button"
            aria-label={t("edit")}
            className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        <div className="relative mt-4 flex items-center gap-4">
          <PatientAvatar
            name={caregiver.shortName}
            color={caregiver.avatarColor}
            size="xl"
            className="ring-4 ring-paper/20"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[26px] leading-tight">
              {caregiver.name}
            </h1>
            <p className="font-display-italic text-[14px] text-coral-200 mt-0.5">
              {t("caregiverRole")}
            </p>
            <p className="text-[12px] opacity-80 mt-0.5 truncate">
              {caregiver.email}
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative mt-6 grid grid-cols-3 gap-2">
          {[
            { value: stats.family, label: t("stats.family") },
            { value: stats.registers, label: t("stats.registers") },
            { value: stats.years, label: t("stats.years") },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-paper/10 backdrop-blur px-3 py-3 text-center"
            >
              <p className="font-display text-[24px] leading-none">{s.value}</p>
              <p className="text-[11px] opacity-80 mt-1.5 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-7">
        {/* Family in your care */}
        <section>
          <SectionTitle hint={t("familyHint")}>{t("familyTitle")}</SectionTitle>
          <div className="flex flex-col gap-2.5">
            {patients.map((p) => (
              <FamilyRow key={p.id} patient={p} />
            ))}
          </div>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            leftIcon={<Users className="size-4" />}
            className="!border-line !text-primary-700 !rounded-[16px] !h-12 !bg-paper/50 hover:!bg-paper mt-3"
          >
            {t("manageFamily")}
          </Button>
        </section>

        {/* Preferences */}
        <section>
          <SectionTitle>{t("preferencesTitle")}</SectionTitle>
          <SettingsGroup>
            <SettingsItem
              icon={Bell}
              iconBg="bg-coral-100"
              iconColor="text-coral-600"
              label={t("items.notifications")}
              description={t("items.notificationsDesc")}
            />
            <SettingsItem
              icon={Globe2}
              iconBg="bg-sky-100"
              iconColor="text-sky-500"
              label={t("items.language")}
              description={currentLanguage}
              onClick={openLanguageSheet}
            />
            <SettingsItem
              icon={Moon}
              iconBg="bg-plum-100"
              iconColor="text-plum-500"
              label={t("items.theme")}
              description={t("items.themeDesc")}
            />
          </SettingsGroup>
        </section>

        {/* Settings */}
        <section>
          <SectionTitle>{t("settingsTitle")}</SectionTitle>
          <SettingsGroup>
            <SettingsItem
              icon={ShieldCheck}
              iconBg="bg-primary-100"
              iconColor="text-primary-600"
              label={t("items.privacy")}
              description={t("items.privacyDesc")}
            />
            <SettingsItem
              icon={Download}
              iconBg="bg-gold-100"
              iconColor="text-gold-500"
              label={t("items.export")}
              description={t("items.exportDesc")}
            />
            <SettingsItem
              icon={HelpCircle}
              iconBg="bg-sky-100"
              iconColor="text-sky-500"
              label={t("items.help")}
              description={t("items.helpDesc")}
            />
            <SettingsItem
              icon={Info}
              iconBg="bg-neutral-100"
              iconColor="text-ink-600"
              label={t("items.about")}
              description={t("items.aboutDesc")}
            />
          </SettingsGroup>
        </section>

        {/* Logout — standalone destructive */}
        <section>
          <SettingsGroup>
            <SettingsItem
              icon={LogOut}
              iconBg="bg-coral-100"
              iconColor="text-coral-600"
              label={t("items.logout")}
              tone="danger"
              trailing={<span className="size-4" aria-hidden />}
            />
          </SettingsGroup>
        </section>

        <p className="text-center text-[11px] text-ink-400 pt-2">
          <span className="font-display-italic">{t("footerNote")}</span>
          <span className="mx-2">·</span>
          {t("version")}
        </p>
      </main>

      <TabBar active="profile" />

      <LanguageSheet
        open={openSheet === "language"}
        onClose={closeSheet}
        title={t("items.language")}
        description={t("languageSheetDescription")}
      />
    </PhoneFrame>
  );
}
