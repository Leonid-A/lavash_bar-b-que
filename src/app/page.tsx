"use client";

import { useMemo } from "react";
import { SearchX } from "lucide-react";
import { CategorySection } from "@/components/CategorySection";
import { menu } from "@/data";
import { useLanguage, useSearch } from "@/hooks";
import type { LocalizedText } from "@/types";
import { filterMenu, getLocalizedText } from "@/utils";

const EMPTY_STATE_MESSAGE: LocalizedText = {
  en: "No menu items found.",
  hy: "Ոչինչ չի գտնվել",
};

const CLEAR_SEARCH_LABEL: LocalizedText = {
  en: "Clear Search",
  hy: "Մաքրել որոնումը",
};

export default function Home() {
  const { language } = useLanguage();
  const { query, setQuery } = useSearch();

  const filteredMenu = useMemo(() => filterMenu(menu, query), [query]);

  if (filteredMenu.categories.length === 0) {
    return (
      <main
        aria-live="polite"
        className="page-container flex flex-1 flex-col items-center justify-center py-24 text-center"
      >
        <div className="animate-fade-in flex flex-col items-center">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-300"
          >
            <SearchX className="h-8 w-8" strokeWidth={1.5} />
          </span>
          <p className="mt-6 max-w-md text-lg text-balance text-stone-600">
            {getLocalizedText(EMPTY_STATE_MESSAGE, language)}
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="focus-ring mt-6 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition-colors duration-200 hover:bg-stone-100 hover:text-stone-900"
          >
            {getLocalizedText(CLEAR_SEARCH_LABEL, language)}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main aria-live="polite" className="page-container flex-1">
      {filteredMenu.categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </main>
  );
}
