# Changelog

All notable changes to this project should be documented in this file.

---

# Version 0.1.0

## Added

- Next.js project initialization
- Tailwind CSS
- TypeScript configuration
- Initial project architecture
- Header component
- Footer component
- Sticky category navigation
- Search bar UI
- Dynamic menu rendering
- JSON-based menu data
- Restaurant configuration
- English language support
- Armenian language support
- Language switcher
- Smooth scrolling
- Active category highlighting
- Responsive layout

---

## Improved

- Menu card design
- Responsive behavior
- Typography
- Layout spacing
- Navigation UX

---

## Fixed

- Sticky navigation scrolling offset
- Category highlighting
- Language rendering
- Mobile layout adjustments

---

# Unreleased

## Changed

- Replaced the sample Italian menu content in `src/data/menu.json` with the restaurant's real menu (data synchronization only — no component, styling, or schema changes).
- Categories: removed all 9 placeholder categories (Appetizers, Salads, Soups, Pizza, Pasta, Main Course, Desserts, Coffee, Soft Drinks) and replaced them with the 9 real categories: Appetizers, Salads, Wraps, Burgers, Hot Dishes, Sides, Soups, Drinks, Dessert (91 items total).
- Corrected obvious spelling/formatting issues from the source list while preserving intended dish names (e.g. "Humus" → "Hummus", "Miniral Water" → "Mineral Water", "Armenian Coffe" → "Armenian Coffee", "Cheesburger" → "Cheeseburger", "Fried Lever" → "Fried Liver", "Mexsican Coke" → "Mexican Coke", "Taragon Lemonade" → "Tarragon Lemonade", "Kompot (IL)" → "Kompot (1L)", "* DESERT *" → "Dessert").
- Armenian (`hy`) translations were not provided for the new menu; all new items and categories keep the bilingual schema with `hy` left as an empty string, matching the existing data model.
- No images existed for any old item, so all new items use `image: null`; no labels were specified in the source, so all new items use `labels: []`.
- Populated the `hy` field for 90 of the 91 menu item names using the provided Armenian translations, matched by dish identity to each item's `id` (e.g. `hy: ""` on `assorted-fish-plate` → `"Ձկան տեսականի"`). No `en` values, ids, prices, categories, descriptions, images, labels, or ordering were changed. Category-level `hy` names remain empty since no category translations were provided. The `ostri` item has no translation available and keeps `hy: ""`.

## Fixed

- Production build was crashing during static page prerendering (`Cannot read properties of undefined (reading 'en')`) because `src/data/menu.json` uses allergen labels (`contains-seafood`, `contains-dairy`, `contains-nuts`) not present in the `MenuItemLabel` type, and `src/data/menu.ts` casts the JSON with `as Menu` instead of a checked parse, so TypeScript didn't catch the mismatch. Extended `MenuItemLabel` (`src/types/menu.ts`) and `MenuCard`'s `LABEL_TEXT` map (`src/components/MenuCard/MenuCard.tsx`) with bilingual (EN/HY) entries for all three allergen labels. Verified with a clean `npm run build` and in-browser.

---

# Future Versions

Version 0.2.0

- Reserved

Version 0.3.0

- Reserved

Version 1.0.0

- Reserved

---

## Update Rules

After every completed feature:

- Add a new version entry.
- Summarize added features.
- List improvements.
- List bug fixes.
- Keep entries chronological.