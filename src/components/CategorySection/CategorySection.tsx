"use client";

import { memo } from "react";
import { MenuCard } from "@/components/MenuCard";
import { useLanguage } from "@/hooks";
import type { MenuCategory } from "@/types";
import { getLocalizedText } from "@/utils";

interface CategorySectionProps {
  category: MenuCategory;
}

function CategorySection({ category }: CategorySectionProps) {
  const { language } = useLanguage();
  const headingId = `${category.id}-heading`;

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className="scroll-mt-28 border-b border-stone-100 py-12 last:border-b-0 sm:py-14"
    >
      <h2
        id={headingId}
        className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
      >
        {getLocalizedText(category.name, language)}
      </h2>
      <div
        aria-hidden="true"
        className="mt-3 h-1 w-10 rounded-full bg-stone-900"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default memo(CategorySection);
