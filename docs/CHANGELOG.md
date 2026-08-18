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

## Changed — Real Menu Import from Photographed Pages

- Replaced all `src/data/menu.json` content with the restaurant's actual printed menu, transcribed from 11 photographed menu pages supplied by the owner. Restructured from the previous 9 categories into 11 categories matching the printed menu's own sections: Appetizers, Salads, Soups, Charcoal BBQ Seafood, Charcoal BBQ Plates, Charcoal BBQ Wraps, Signature Sandwiches, Hot Dishes, Sides, Drinks, Desserts (~100 items total).
- Added an optional `description` field to `MenuCategory` (`src/types/menu.ts`) to preserve category-level subtitles present on several printed pages (e.g. Soups' "classic Armenian and Eastern European soups..." line, BBQ Plates' "served with rice or fries, salad, and hummus" line, BBQ Wraps' bread/sauce line). `CategorySection.tsx` renders it under the category heading when present; fully optional and backward-compatible.
- The photographed pages contain English text only. All Armenian (`hy`) translations for the new/changed names and descriptions were authored by the AI assistant (no source translations existed), matching the tone of the pre-existing bilingual entries.
- Fixed a data error on the source "Charcoal BBQ Plates" page: the Beef Shawarma Plate and Pork Shawarma Plate descriptions were swapped (Beef's description mentioned pork and vice versa). Corrected using the matching, correctly-paired descriptions from the source "Charcoal BBQ Wraps" page.
- Corrected minor source typos/grammar while transcribing (e.g. "FISHASSORTMENTPLATTER" → "Fish Assortment Platter", "AFRESH ARMENIAN HERBS" → "A fresh selection of Armenian herbs", "TARGGONE LEMONADE" → "Tarragon Lemonade").
- "Sparkling Water" listed two prices on one line ($3.50/$7.99) on the source page; split into two items (`sparkling-water-small`, `sparkling-water-large`) to fit the one-item-one-price data model, consistent with how the prior sample data handled the same drink.
- No dish photography exists yet, so all items keep `image: null`.
- Restaurant identity (`src/data/restaurant.json`) was not touched — the photographed pages were menu content only, no restaurant contact/address information.

---

## Fixed — Descriptions not present on the source Drinks page

- The "Drinks" photo lists only item names and prices with no description line under any item (unlike every other category's photo). Removed the descriptions that had been carried over from the old sample data for all 10 drink items, since they weren't present in the source.
- Made `MenuItem.description` optional (`src/types/menu.ts`); `MenuCard.tsx` now renders the description paragraph only when present. `utils/search.ts` updated to skip the description in its match check when absent.

---

## Changed — Cleared menu item labels; verified contact links

- Cleared `labels` to `[]` on all 103 menu items in `src/data/menu.json` (previously auto-assigned during transcription, e.g. `vegetarian`, `contains-dairy`, `contains-nuts`). These are placeholders until the restaurant owner reviews and re-assigns them manually — no dietary/allergen claims should be inferred from the current data.
- Verified `Footer.tsx`'s phone and email are already clickable (`tel:`/`mailto:` links, present since the "Live search, restaurant configuration" phase) — confirmed against the current `restaurant.json` contact values. No code change was needed.

---

## Changed — Dark/gold theme matching the printed menu

- Reskinned the entire app to match the restaurant's physical printed menu: dark charcoal-brown background with gold headings/prices and cream body text, replacing the previous white/neutral-gray theme.
- Added five reusable Tailwind color tokens to `src/app/globals.css` (`menu-bg`, `menu-surface`, `menu-border`, `menu-gold`, `menu-cream`) via Tailwind v4's `@theme` block, and updated `:root`'s `--background`/`--foreground` to match. Updated the shared `.focus-ring` utility to outline in gold instead of near-black, since a dark outline would be invisible on the new dark background.
- Applied the new tokens across `layout.tsx` (body, plus a matching `viewport.themeColor` for the mobile browser chrome), `Header`, `Footer`, `CategoryNavigation`, `SearchBar`, `LanguageSwitcher`, `CategorySection` (category headings now uppercase, matching the printed menu), `MenuCard` (card hover state changed from a drop shadow to a gold border glow, since shadows aren't visible against a dark page background), and the search empty-state in `page.tsx`.
- Updated `docs/03-ui-guidelines.md`'s "Colors" section, which previously specified a white/neutral palette, to document the new token-based dark/gold palette as the current source of truth.
- Not carried over from the printed menu: the decorative gold circular line-art ornaments in each page's corners. Out of scope for this pass (illustrative asset work, not a color/typography change) — can be revisited if wanted.
- Verified with `npm run build`, `npx tsc --noEmit`, `npm run lint`, and in-browser at mobile (375px) and desktop widths, in both languages — no horizontal overflow, no regressions to search/nav/language-switch behavior.

---

## Fixed — Category nav unreachable at both ends on wide viewports

- `CategoryNavigation.tsx`'s pill list used `sm:justify-center` on a horizontally-scrollable flex container. With 11 categories overflowing the nav width, centering pushed content past what a browser will scroll to (`scrollLeft` can't go negative), permanently hiding the first and last categories with no way to scroll to them — reported as "start and end is cut but scroll is not there."
- Changed to `sm:justify-[safe_center]` (CSS `justify-content: safe center`): centers the nav when it fits, but falls back to start-alignment (fully scrollable) when it overflows. Verified by scrolling the nav to its max `scrollLeft` and confirming the first ("Appetizers") and last ("Desserts") categories are both reachable.

---

## Fixed — Missing pointer cursor on clickable elements

- Native `<button>` elements don't get `cursor: pointer` by default in most browsers (unlike `<a>`, which already did). Added `cursor-pointer` to the shared `.focus-ring` utility (`globals.css`) — used by every interactive button/link in the app (language switcher, category nav pills, Clear Search button, footer social icons) — plus explicitly on the two footer `tel:`/`mailto:` links, which don't use `.focus-ring`. Verified computed `cursor: pointer` on all of them in-browser.

---

## Added — Clickable Google Map in the footer

- Added a small "Find Us" map preview to `Footer.tsx`, directly under the address/contact list. Uses the keyless Google Maps embed (`https://maps.google.com/maps?q=<query>&output=embed`) — no API key required — with the pin query built from `restaurant.name` + `restaurant.address.en` (the English address is always used for the map query regardless of the selected UI language, since it's a real-world address being geocoded, not user-facing text to translate).
- The entire map preview is wrapped in a single `<a target="_blank">` pointing to the official Google Maps URL scheme (`https://www.google.com/maps/search/?api=1&query=<query>`), so clicking anywhere on it opens Google Maps in a new tab, pinned to the address, ready to get directions. The embedded `<iframe>` itself has `pointer-events-none` so it can't intercept the click (and doesn't need its own drag/zoom interaction) — the whole block behaves as one link, with a small "Open in Google Maps" caption overlaid at the bottom for affordance.
- Bilingual labels added (`Find Us` / `Ինչպես գտնել մեզ`, `Open in Google Maps` / `Բացել Google Maps-ում`), consistent with the rest of the app's `LocalizedText` pattern.
- Verified: the embed URL is a live, valid Google Maps Embed API endpoint (confirmed by visiting it directly — it correctly refuses top-level navigation with "must be used in an iframe," which is exactly how it's used here); the iframe's `load` event fires successfully in the running app; the link's `href`/`target` and the iframe's `src`/`title` were all checked via the DOM. Full-page screenshot confirms a real map tile renders (visually distinct light rectangle against the dark theme, expected since Google's default map tiles aren't dark-themeable without the paid Maps JavaScript API).
- `npm run build`, `npx tsc --noEmit`, and `npm run lint` all pass.

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