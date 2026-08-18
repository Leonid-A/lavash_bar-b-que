"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useLanguage } from "@/hooks";
import type { LocalizedText, MenuItem, MenuItemLabel } from "@/types";
import { getLocalizedText } from "@/utils";

interface MenuCardProps {
  item: MenuItem;
}

const LABEL_TEXT: Record<MenuItemLabel, LocalizedText> = {
  vegetarian: { en: "Vegetarian", hy: "Բուսակերային" },
  vegan: { en: "Vegan", hy: "Վեգան" },
  spicy: { en: "Spicy", hy: "Կծու" },
  gluten_free: { en: "Gluten Free", hy: "Առանց գլյուտենի" },
  new: { en: "New", hy: "Նոր" },
  "contains-seafood": { en: "Contains Seafood", hy: "Պարունակում է ծովամթերք" },
  "contains-dairy": { en: "Contains Dairy", hy: "Պարունակում է կաթնամթերք" },
  "contains-nuts": { en: "Contains Nuts", hy: "Պարունակում է ընկույզ" },
};

function MenuCard({ item }: MenuCardProps) {
  const { language } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const name = getLocalizedText(item.name, language);
  const showImage = Boolean(item.image) && !imageFailed;
  const showImagePlaceholder = Boolean(item.image) && imageFailed;

  return (
    <article className="animate-fade-in flex flex-col overflow-hidden rounded-2xl border border-menu-border bg-menu-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-menu-gold/50">
      {showImage && item.image ? (
        <div className="relative aspect-[4/3] w-full bg-menu-bg">
          <Image
            src={item.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : showImagePlaceholder ? (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-menu-bg text-menu-gold/30">
          <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-menu-gold">
            {name}
          </h3>
          <span className="shrink-0 text-base font-semibold text-menu-gold tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>
        {item.description ? (
          <p className="text-sm leading-relaxed text-menu-cream/70">
            {getLocalizedText(item.description, language)}
          </p>
        ) : null}
        {item.labels && item.labels.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {item.labels.map((label) => (
              <li
                key={label}
                className={
                  label === "new"
                    ? "rounded-full bg-menu-gold px-2.5 py-1 text-[11px] font-medium tracking-wide text-menu-bg uppercase"
                    : "rounded-full border border-menu-border bg-menu-bg px-2.5 py-1 text-[11px] font-medium tracking-wide text-menu-cream/80 uppercase"
                }
              >
                {getLocalizedText(LABEL_TEXT[label], language)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export default memo(MenuCard);
