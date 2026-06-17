"use client";

import { LanguageProvider } from "@/app/lib/i18n";
import LangSwitcher from "./LangSwitcher";
import type { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <LangSwitcher />
    </LanguageProvider>
  );
}
