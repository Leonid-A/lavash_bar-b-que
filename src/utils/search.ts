import type { LocalizedText, Menu, MenuCategory, MenuItem } from "@/types";

export function filterMenu(menu: Menu, query: string): Menu {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return menu;
  }

  const categories = menu.categories
    .map((category) => filterCategory(category, normalizedQuery))
    .filter((category): category is MenuCategory => category !== null);

  return { categories };
}

function filterCategory(
  category: MenuCategory,
  normalizedQuery: string,
): MenuCategory | null {
  const items = category.items.filter((item) =>
    itemMatchesQuery(item, normalizedQuery),
  );

  if (items.length === 0) {
    return null;
  }

  // Preserve the original reference when nothing was filtered out, so
  // components memoized on `category` can bail out of re-rendering.
  return items.length === category.items.length
    ? category
    : { ...category, items };
}

function itemMatchesQuery(item: MenuItem, normalizedQuery: string): boolean {
  return (
    localizedTextMatches(item.name, normalizedQuery) ||
    localizedTextMatches(item.description, normalizedQuery)
  );
}

function localizedTextMatches(
  text: LocalizedText,
  normalizedQuery: string,
): boolean {
  return Object.values(text).some((value) =>
    value.toLowerCase().includes(normalizedQuery),
  );
}
