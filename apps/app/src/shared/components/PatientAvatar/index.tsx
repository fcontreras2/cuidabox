"use client";

import { Avatar } from "fcontreras2-ui";
import { cn } from "@/shared/lib/cn";

const COLORS = {
  coral: "!bg-coral-100 !text-coral-600",
  sky: "!bg-sky-100 !text-sky-500",
  plum: "!bg-plum-100 !text-plum-500",
  gold: "!bg-gold-100 !text-gold-500",
  sage: "!bg-primary-100 !text-primary-600",
} as const;

export interface PatientAvatarProps {
  name: string;
  src?: string;
  color?: keyof typeof COLORS;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PatientAvatar({
  name,
  src,
  color = "coral",
  size = "md",
  className,
}: PatientAvatarProps) {
  return (
    <Avatar
      src={src}
      name={name}
      size={size}
      className={className}
      classNames={{
        fallback: cn("!font-display !font-medium", COLORS[color]),
      }}
    />
  );
}
