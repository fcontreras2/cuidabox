import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Constrain content to the marketing site grid (max 1180px) with horizontal
 * gutters that scale with viewport.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cn(
        "w-full max-w-[1180px] mx-auto px-6 md:px-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
