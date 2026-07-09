"use client";

import { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { restaurant } from "@/data";
import { useLanguage } from "@/hooks";
import { getLocalizedText } from "@/utils";

export default function Header() {
  const { language } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogoImage = Boolean(restaurant.logo) && !logoFailed;

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="page-container flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between sm:gap-6 sm:py-7">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-stone-900 text-white shadow-sm sm:h-14 sm:w-14"
          >
            {showLogoImage ? (
              <Image
                src={restaurant.logo}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <UtensilsCrossed className="h-6 w-6" strokeWidth={1.5} />
            )}
          </span>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              {restaurant.name}
            </h1>
            <p className="text-[11px] font-medium tracking-[0.15em] text-stone-500 uppercase sm:text-sm sm:tracking-[0.2em]">
              {getLocalizedText(restaurant.subtitle, language)}
            </p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
