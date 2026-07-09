"use client";

import { useEffect, useMemo } from "react";
import { menu } from "@/data";
import { useActiveSection, useLanguage } from "@/hooks";
import { getLocalizedText } from "@/utils";

const SCROLL_OFFSET_PX = 112;

export default function CategoryNavigation() {
  const { language } = useLanguage();
  const categoryIds = useMemo(
    () => menu.categories.map((category) => category.id),
    [],
  );
  const activeId = useActiveSection(
    categoryIds,
    `-${SCROLL_OFFSET_PX}px 0px -60% 0px`,
  );

  useEffect(() => {
    if (!activeId) return;
    document.getElementById(`nav-${activeId}`)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  const handleCategoryClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur"
    >
      <ul className="page-container scrollbar-hide flex list-none gap-2 overflow-x-auto overscroll-x-contain py-3 sm:justify-center sm:gap-3">
        {menu.categories.map((category) => {
          const isActive = category.id === activeId;

          return (
            <li key={category.id} className="shrink-0">
              <button
                id={`nav-${category.id}`}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleCategoryClick(category.id)}
                className={`focus-ring rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {getLocalizedText(category.name, language)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
