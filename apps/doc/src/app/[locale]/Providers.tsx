"use client";

import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "fcontreras2-ui";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export function Providers({ children, locale, messages }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ToastProvider position="top-right" autoClose={3000} />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
