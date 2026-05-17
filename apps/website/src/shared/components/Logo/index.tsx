import { cn } from "@/shared/lib/cn";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** When true, use a single ink color (for monochrome contexts). */
  mono?: "sage" | "cream" | "ink";
};

const SIZE_MAP = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
} as const;

/**
 * Wordmark editorial (propuesta 01) — Fraunces 500 sage + Fraunces italic 400 coral.
 * Pasa `mono` para versiones monocromáticas (impresión BW, fondos sage, etc.).
 */
export function Logo({ size = "md", className, mono }: LogoProps) {
  const monoColor =
    mono === "sage"
      ? "text-primary-700"
      : mono === "cream"
        ? "text-cream"
        : mono === "ink"
          ? "text-ink-900"
          : null;

  return (
    <span
      aria-label="cuidabox"
      className={cn(
        "font-display font-medium tracking-tight inline-flex items-baseline leading-none",
        SIZE_MAP[size],
        className,
      )}
    >
      <span className={cn(monoColor ?? "text-primary-700 dark:text-cream")}>
        cuida
      </span>
      <span
        className={cn(
          "font-display-italic font-normal",
          monoColor ?? "text-coral-500",
        )}
      >
        box
      </span>
    </span>
  );
}

type LogoMarkProps = {
  size?: number;
  className?: string;
  variant?: "sage" | "coral" | "cream" | "ink";
};

/**
 * Isotipo — la `c` de Fraunces en cuadrado redondeado con punto coral abajo derecha.
 * Para favicon, app icon, watermark.
 */
export function LogoMark({
  size = 48,
  className,
  variant = "sage",
}: LogoMarkProps) {
  const styles = {
    sage: { bg: "bg-primary-700", fg: "text-cream", dot: "bg-coral-500" },
    coral: { bg: "bg-coral-500", fg: "text-cream", dot: "bg-primary-700" },
    cream: { bg: "bg-cream-2", fg: "text-primary-700", dot: "bg-coral-500" },
    ink: { bg: "bg-ink-900", fg: "text-cream", dot: "bg-coral-500" },
  }[variant];

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-grid place-items-center rounded-[14px]",
        styles.bg,
        styles.fg,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span
        className="font-display font-medium leading-none"
        style={{
          fontSize: size * 0.58,
          transform: "translate(-1px, -1px)",
          letterSpacing: "-0.04em",
        }}
      >
        c
      </span>
      <span
        className={cn("absolute rounded-full", styles.dot)}
        style={{
          width: size * 0.15,
          height: size * 0.15,
          right: size * 0.15,
          bottom: size * 0.15,
        }}
      />
    </span>
  );
}
