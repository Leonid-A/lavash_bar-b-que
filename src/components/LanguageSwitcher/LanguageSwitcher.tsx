"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks";
import type { Language } from "@/types";

const LANGUAGES: Language[] = [
  { code: "en", label: "English" },
  { code: "hy", label: "Armenian" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-full border border-menu-border bg-menu-surface p-1 shadow-sm"
    >
      <Globe
        className="ml-2 h-4 w-4 shrink-0 text-menu-gold/50"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {LANGUAGES.map((option) => (
        <button
          key={option.code}
          type="button"
          aria-pressed={language === option.code}
          onClick={() => setLanguage(option.code)}
          className={`focus-ring rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
            language === option.code
              ? "bg-menu-gold text-menu-bg"
              : "text-menu-cream/70 hover:text-menu-gold"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
