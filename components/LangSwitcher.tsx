"use client";

import { useLanguage, type Language } from "@/app/lib/i18n";

const FLAGS: Record<Language, string> = {
  cn: "🇨🇳",
  en: "🇬🇧",
  jp: "🇯🇵",
};

const ORDER: Language[] = ["cn", "en", "jp"];

export default function LangSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-24 right-8 z-[100] w-12 flex flex-col items-center gap-0.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-full py-1.5 shadow-2xl">
      {ORDER.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
            l === lang ? "scale-110 opacity-100" : "opacity-40 hover:opacity-70"
          }`}
        >
          {FLAGS[l]}
        </button>
      ))}
    </div>
  );
}
