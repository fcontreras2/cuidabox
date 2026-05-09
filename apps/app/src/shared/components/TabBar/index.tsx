"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Home, BookOpenText, Plus, Stethoscope, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

export function TabBar({ active }: { active?: string }) {
  const t = useTranslations("modules-patient-pages-Dashboard");
  const params = useParams();
  const patientId = typeof params?.id === "string" ? params.id : "";

  const ITEMS = [
    { href: `/patient/${patientId}`, icon: Home, key: "home" as const },
    {
      href: `/patient/${patientId}/history`,
      icon: BookOpenText,
      key: "history" as const,
    },
    {
      href: `/patient/${patientId}/register`,
      icon: Plus,
      key: "register" as const,
      fab: true,
    },
    {
      href: `/patient/${patientId}/doctors`,
      icon: Stethoscope,
      key: "doctors" as const,
    },
    { href: `/account`, icon: User, key: "profile" as const },
  ];

  return (
    <nav className="border-t border-line bg-paper/85 backdrop-blur px-4 pt-3 pb-6">
      <div className="grid grid-cols-5 items-center">
        {ITEMS.map((item) => {
          const isActive = active === item.key;
          if (item.fab) {
            return (
              <Link
                key={item.key}
                href={item.href}
                className="justify-self-center size-14 rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 text-paper grid place-items-center shadow-warm hover:scale-105 transition-transform"
                aria-label={t(`tabs.${item.key}`)}
              >
                <item.icon className="size-6" />
              </Link>
            );
          }
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium",
                isActive ? "text-coral-500" : "text-ink-400",
              )}
            >
              <item.icon className="size-5" />
              <span>{t(`tabs.${item.key}`)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
