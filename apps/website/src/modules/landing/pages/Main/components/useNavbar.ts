"use client";

import { useState, useEffect, useCallback } from "react";
import { useMain } from "../useMain";

const NAV_SECTIONS = ["for-families", "for-doctors", "how-it-works"] as const;
const NAV_OFFSET = 96;

export function useNavbar() {
  const { scrollToSection, appLoginUrl, docLoginUrl } = useMain();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      let current = "";
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - NAV_OFFSET <= y) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = useCallback(
    (id: string) => {
      scrollToSection(id);
      setOpen(false);
    },
    [scrollToSection],
  );

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((o) => !o), []);

  return {
    open,
    scrolled,
    activeSection,
    appLoginUrl,
    docLoginUrl,
    handleLinkClick,
    closeMenu,
    toggleMenu,
  };
}
