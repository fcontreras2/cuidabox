"use client";

import { useTranslations } from "next-intl";
import { Container, Logo } from "@/shared/components";
import { useMain } from "../useMain";

export function Footer() {
  const t = useTranslations("modules-landing-pages-Main.footer");
  const { appLoginUrl, docLoginUrl, scrollToSection } = useMain();
  const year = new Date().getFullYear();

  const productLinks = [
    {
      key: "linksFamilies",
      onClick: () => scrollToSection("for-families"),
    },
    {
      key: "linksDoctors",
      onClick: () => scrollToSection("for-doctors"),
    },
    {
      key: "linksHow",
      onClick: () => scrollToSection("how-it-works"),
    },
  ];

  return (
    <footer className="border-t border-line dark:border-primary-600/40 pt-16 pb-10 bg-paper/60 dark:bg-primary-900/40">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="mt-4 font-display-italic text-[18px] text-primary-700 dark:text-cream max-w-[400px] leading-snug">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <nav className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400 mb-3">
                {t("linksProduct")}
              </p>
              <ul className="flex flex-col gap-2">
                {productLinks.map((l) => (
                  <li key={l.key}>
                    <button
                      type="button"
                      onClick={l.onClick}
                      className="text-[14px] text-ink-600 dark:text-ink-200 hover:text-coral-500 transition-colors"
                    >
                      {t(l.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400 mb-3">
                {t("linksLegal")}
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#"
                    className="text-[14px] text-ink-600 dark:text-ink-200 hover:text-coral-500 transition-colors"
                  >
                    {t("linksPrivacy")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[14px] text-ink-600 dark:text-ink-200 hover:text-coral-500 transition-colors"
                  >
                    {t("linksTerms")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[14px] text-ink-600 dark:text-ink-200 hover:text-coral-500 transition-colors"
                  >
                    {t("linksContact")}
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Entry shortcuts */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <a
              href={appLoginUrl}
              target="_blank"
              rel="noopener"
              className="rounded-2xl px-4 py-3 bg-coral-500 text-paper text-[14px] font-semibold hover:bg-coral-600 transition-colors text-center"
            >
              {t("linksFamilies")}
            </a>
            <a
              href={docLoginUrl}
              target="_blank"
              rel="noopener"
              className="rounded-2xl px-4 py-3 bg-paper dark:bg-primary-700 text-primary-700 dark:text-cream border border-line dark:border-primary-600 text-[14px] font-semibold hover:border-coral-200 transition-colors text-center"
            >
              {t("linksDoctors")}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line/70 dark:border-primary-600/30 text-[12.5px] text-ink-400">
          {t("copyright", { year })}
        </div>
      </Container>
    </footer>
  );
}
