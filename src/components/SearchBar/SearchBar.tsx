"use client";

import { Search } from "lucide-react";
import { useLanguage, useSearch } from "@/hooks";
import type { LocalizedText } from "@/types";
import { getLocalizedText } from "@/utils";

const SEARCH_LABEL: LocalizedText = {
  en: "Search menu",
  hy: "Փնտրել ընտրացանկում",
};

const SEARCH_PLACEHOLDER: LocalizedText = {
  en: "Search menu...",
  hy: "Փնտրել ընտրացանկում...",
};

export default function SearchBar() {
  const { language } = useLanguage();
  const { query, setQuery } = useSearch();

  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="page-container py-6">
        <div className="relative mx-auto max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <label htmlFor="menu-search" className="sr-only">
            {getLocalizedText(SEARCH_LABEL, language)}
          </label>
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={getLocalizedText(SEARCH_PLACEHOLDER, language)}
            className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pr-4 pl-12 text-sm text-stone-900 shadow-sm transition-all duration-200 placeholder:text-stone-500 focus:border-stone-400 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-stone-900/10 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
