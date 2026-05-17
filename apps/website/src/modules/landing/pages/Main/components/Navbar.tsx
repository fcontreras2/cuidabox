"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "fcontreras2-ui";
import { Container, Logo, ThemeToggle } from "@/shared/components";
import { useNavbar } from "./useNavbar";
import { cn } from "@/shared/lib/cn";

export function Navbar() {
  const t = useTranslations("modules-landing-pages-Main.nav");
  const {
    open,
    scrolled,
    activeSection,
    appLoginUrl,
    docLoginUrl,
    handleLinkClick,
    closeMenu,
    toggleMenu,
  } = useNavbar();

  const links = [
    { id: "for-families", label: t("families") },
    { id: "for-doctors", label: t("doctors") },
    { id: "how-it-works", label: t("howItWorks") },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 backdrop-blur-md bg-cream/80 dark:bg-[#111816]/80 border-b border-line/60 dark:border-primary-600/40 transition-shadow duration-300",
          scrolled && "shadow-sage",
        )}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center"
            aria-label="CuidaBox — volver al inicio"
          >
            <Logo size="md" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleLinkClick(l.id)}
                className={cn(
                  "relative px-3.5 py-2 rounded-full text-[14px] font-medium transition-colors",
                  activeSection === l.id
                    ? "text-primary-700 dark:text-cream bg-paper dark:bg-primary-600/40"
                    : "text-ink-600 dark:text-ink-200 hover:text-primary-700 dark:hover:text-cream hover:bg-paper dark:hover:bg-primary-600/40",
                )}
              >
                {l.label}
                {activeSection === l.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-coral-500" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="md"
              className="rounded-full! border-line! text-primary-700! hover:bg-paper! dark:text-cream! dark:border-primary-600!"
              onClick={() => window.open(docLoginUrl, "_blank")}
            >
              {t("ctaDoctors")}
            </Button>
            <Button
              size="md"
              className="rounded-full! bg-coral-500! text-paper! hover:bg-coral-600! shadow-warm!"
              onClick={() => window.open(appLoginUrl, "_blank")}
            >
              {t("ctaFamilies")}
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={toggleMenu}
            className="md:hidden size-10 rounded-full border border-line dark:border-primary-600 bg-paper dark:bg-primary-700 text-primary-700 dark:text-cream grid place-items-center"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>

        {/* Mobile drawer */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-line/60 dark:border-primary-600/40",
            open ? "max-h-[420px]" : "max-h-0",
          )}
        >
          <Container className="py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleLinkClick(l.id)}
                className={cn(
                  "text-left py-3 px-3 rounded-xl text-[15px] font-medium transition-colors",
                  activeSection === l.id
                    ? "text-primary-700 dark:text-cream bg-paper dark:bg-primary-600/30 font-semibold"
                    : "text-ink-900 dark:text-cream hover:bg-paper dark:hover:bg-primary-600/30",
                )}
              >
                {l.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button
                variant="outline"
                size="md"
                fullWidth
                className="rounded-full! border-line! text-primary-700! dark:text-cream! dark:border-primary-600!"
                onClick={() => window.open(docLoginUrl, "_blank")}
              >
                {t("ctaDoctors")}
              </Button>
              <Button
                size="md"
                fullWidth
                className="rounded-full! bg-coral-500! text-paper! hover:bg-coral-600!"
                onClick={() => window.open(appLoginUrl, "_blank")}
              >
                {t("ctaFamilies")}
              </Button>
            </div>
            <div className="mt-2 pt-3 border-t border-line-soft dark:border-primary-600/30 flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-400">
                {t("audiences")}
              </span>
              <ThemeToggle />
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile backdrop — closes drawer on outside tap */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-30 bg-ink-900/20 backdrop-blur-sm transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
