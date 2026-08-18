# CLAUDE.md

## Purpose

This file provides working context for AI coding assistants.

Before making any code changes, always read:

- docs/01-project-overview.md
- docs/02-development-rules.md
- docs/03-ui-guidelines.md
- docs/04-data-model.md

These documents are the permanent source of truth.

This file should only contain:

- Current implementation status
- Architecture decisions
- Completed features
- Known limitations
- Upcoming work

When completing a task, also update:

- docs/CHANGELOG.md
- CLAUDE.md

## Project Documentation

This project uses the following documentation:

| File | Purpose |
|------|---------|
| docs/01-project-overview.md | Project vision, goals, scope, roadmap |
| docs/02-development-rules.md | Coding standards, architecture, development rules |
| docs/03-ui-guidelines.md | UI design system and visual consistency |
| docs/04-data-model.md | Data structures and JSON models |
| docs/CHANGELOG.md | History of completed work |

Before implementing any feature or making architectural changes, read the relevant documentation from the `docs/` directory.

The files in `docs/` are the permanent source of truth.

This `CLAUDE.md` file contains only the current project state and AI working context.

## Stack

- Next.js 16 (App Router, `src/` directory)
- TypeScript (strict mode)
- Tailwind CSS v4
- ESLint + Prettier (`prettier-plugin-tailwindcss`)
- `lucide-react` for icons

## Current Phase

### Current Version

**v0.1.0**

### Phase

Phase 1 — Digital Restaurant Menu (MVP)

### Status

- ✅ Dynamic menu rendering
- ✅ English / Armenian localization
- ✅ Sticky category navigation
- ✅ Smooth scrolling
- ✅ Active category highlighting
- ✅ Live search
- ✅ Responsive design
- ✅ Restaurant configuration
- ✅ Production polish

### Current Goal

Finalize the Phase 1 MVP and prepare it for production deployment.

### Next Milestone

- Replace placeholder restaurant information
- Add real menu images
- Deploy the application

## AI Working Rules

Before making changes:

1. Read this file (`CLAUDE.md`).
2. Read any relevant documents from the `docs/` folder.
3. Understand the existing implementation before modifying code.
4. Reuse existing components whenever possible.
5. Preserve the current architecture.
6. Modify only what is necessary.
7. Do not rewrite working code without a valid reason.
8. When work is completed:
   - Update `docs/CHANGELOG.md`.
   - Update `CLAUDE.md` if the project state or architecture has changed.
9. If documentation and implementation conflict, ask for clarification instead of making assumptions.
   
## Maintenance Rules

- Keep this file concise.
- Update implementation summaries when major features are completed.
- Avoid documenting every small refactor or bug fix.
- Use `docs/CHANGELOG.md` for release history.
- Keep this file focused on the current project state and architecture.

## Folder Structure

```
Lavash/
├── .claude/launch.json          # dev server config for the Preview tool
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root shell: LanguageProvider > Header, CategoryNavigation, SearchBar, {children}, Footer
│   │   ├── page.tsx             # home page: maps menu.categories -> CategorySection
│   │   └── globals.css          # Tailwind import, fonts, smooth scroll, scrollbar-hide utility
│   ├── components/
│   │   ├── Header/              # logo placeholder, restaurant name/subtitle, LanguageSwitcher
│   │   ├── Footer/               # address/phone/hours/social placeholders
│   │   ├── CategoryNavigation/  # sticky nav, dynamic categories, click-to-scroll, active highlight
│   │   ├── CategorySection/     # renders one category's heading + grid of MenuCard
│   │   ├── MenuCard/            # single menu item card (image optional)
│   │   ├── SearchBar/           # UI-only search input (no logic yet)
│   │   ├── LanguageSwitcher/    # English/Armenian toggle, wired to language context
│   │   └── index.ts             # barrel export for all components
│   ├── hooks/
│   │   ├── useLanguage.tsx      # LanguageProvider + useLanguage() context hook
│   │   ├── useSearch.tsx        # SearchProvider + useSearch() context hook (raw query string)
│   │   ├── useActiveSection.ts  # IntersectionObserver-based scrollspy hook
│   │   └── index.ts
│   ├── types/
│   │   ├── menu.ts              # LocalizedText, MenuItemLabel, MenuItem, MenuCategory, Menu
│   │   ├── language.ts          # SupportedLanguageCode, Language
│   │   ├── restaurant.ts        # Restaurant, RestaurantSocials
│   │   └── index.ts
│   ├── utils/
│   │   ├── localization.ts      # getLocalizedText(text, language)
│   │   ├── search.ts            # filterMenu(menu, query, language) — pure, memoizable
│   │   └── index.ts
│   ├── data/
│   │   ├── menu.json            # the actual bilingual menu content (source of truth)
│   │   ├── menu.ts              # typed accessor: `export const menu: Menu`
│   │   ├── restaurant.json      # restaurant identity/contact config (source of truth)
│   │   ├── restaurant.ts        # typed accessor: `export const restaurant: Restaurant`
│   │   └── index.ts
│   └── assets/                  # empty, reserved for future images/fonts
├── tsconfig.json                 # strict + noUncheckedIndexedAccess, noUnusedLocals, etc.
├── eslint.config.mjs
└── .prettierrc.json
```

## What's Been Done

### 1. Project initialization

- Scaffolded with `create-next-app` (TS, Tailwind, ESLint, App Router, `src/` dir).
- Added Prettier + `eslint-config-prettier` + `prettier-plugin-tailwindcss`.
- Tightened `tsconfig.json` beyond default strict mode.
- Created the full folder skeleton (`components/*`, `hooks`, `types`, `utils`, `data`, `assets`) with placeholder/barrel files, empty `menu.json`.
- No UI implemented yet at this stage — structure only.

### 2. Application shell

- Built `Header` (logo badge, "Bella Italia" / "Authentic Italian Cuisine", `LanguageSwitcher`), `CategoryNavigation` (sticky, placeholder categories), `SearchBar` (UI-only), `Footer` (address/phone/hours/social, no real links), and a centered main placeholder.
- Architecture decision: `Header`/`CategoryNavigation`/`SearchBar`/`Footer` live in `layout.tsx` (persistent chrome across all future routes); `page.tsx` owns only the route-specific content.
- Added Playfair Display as `font-display` for elegant serif branding alongside Geist Sans.
- Verified responsive behavior (mobile/tablet/desktop) via the Preview tool.

### 3. Dynamic menu data model

- Designed the TypeScript model: `LocalizedText = Record<"en"|"hy", string>`, `MenuItemLabel` union (`vegetarian`/`vegan`/`spicy`/`gluten_free`/`new`), `MenuItem`, `MenuCategory`, `Menu`.
- Wrote real sample content into `menu.json`: **9 categories, 39 items**, fully bilingual (English + Armenian) — Appetizers, Salads, Soups, Pizza, Pasta, Main Course, Desserts, Coffee, Soft Drinks.
- Implemented `getLocalizedText` util (defaults to `"en"`).
- Implemented `MenuCard` (image optional — renders a clean text-only card when `image` is `null`) and `CategorySection` (heading + responsive grid), both driven entirely by `menu.json` data.
- `CategoryNavigation` now renders categories dynamically from the same data (no hardcoded list).
- Verified all 39 items round-trip both languages correctly; verified responsive grid (1/2/3 columns) across breakpoints.

### 4. Interactivity: language switching, clickable nav, scroll spy

- Added `LanguageProvider` (`src/hooks/useLanguage.tsx`) — plain React Context holding `language` + `setLanguage`, default `"en"`. Wraps the whole app in `layout.tsx`.
- `LanguageSwitcher`, `CategorySection`, and `MenuCard` became client components consuming `useLanguage()` directly (no prop drilling). Switching language updates all visible text instantly, no reload — verified in-browser.
- `CategoryNavigation` click handler: `document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth", block: "start" })`.
- `CategorySection` has `scroll-mt-24` (96px) so the sticky nav (measured ~61px tall) never covers the section heading when scrolled to.
- Added `useActiveSection` hook (`src/hooks/useActiveSection.ts`) — `IntersectionObserver`-based scrollspy (no scroll event listeners), returns the id of the topmost visible category section; `CategoryNavigation` uses it to highlight the active button (`aria-current="true"`, distinct background/shadow/transition).
- Added `html { scroll-behavior: smooth }` globally as a fallback.
- Verified language switching, click-to-scroll, and active-highlight behavior in-browser (confirmed working end-to-end in a later session — the preview sandbox's scroll support is inconsistent/flaky across sessions, e.g. absolute `window.scrollTo(0, 0)` resets are unreliable there, but element-relative `scrollIntoView()` — what the app actually uses — has been observed working correctly repeatedly).

### 5. Live search, restaurant configuration, dynamic header/footer

- Created `src/data/restaurant.json` + typed accessor `src/data/restaurant.ts` (`Restaurant` type in `src/types/restaurant.ts`): `name` (plain string, not translated), `subtitle`/`address`/`workingHours` (bilingual), `logo`, `phone`, `email`, `socials.instagram`/`socials.facebook` (empty string = not configured).
- `Header` now reads name/subtitle/logo from `restaurant.json`; subtitle is localized reactively. Logo renders via `next/image` with an `onError` fallback back to the icon badge (no real `/logo.png` asset exists yet, so it currently always shows the fallback badge gracefully — no broken image).
- `Footer` now reads address/phone/email/workingHours/socials from `restaurant.json`. Phone is a `tel:` link, email a `mailto:` link. Social icons render only if their URL is non-empty (currently both are empty in the sample config, so the "Follow Us" column and its icons don't render at all, and the grid collapses from 3 to 2 columns to stay balanced).
- Added `filterMenu(menu, query, language)` in `src/utils/search.ts` — pure function, no React: keeps a category only if it has at least one item whose _currently-selected-language_ name or description includes the (trimmed, lowercased) query. No query = returns the menu unchanged.
- Added `SearchProvider`/`useSearch()` (`src/hooks/useSearch.tsx`) — same Context pattern as `useLanguage`, holds the raw query string. Wraps the app in `layout.tsx` alongside `LanguageProvider`.
- `SearchBar` is now a controlled input wired to `useSearch()`.
- `page.tsx` became a client component: computes `useMemo(() => filterMenu(menu, query, language), [query, language])` and renders `CategorySection`s from the filtered result, or an empty-state message + "Clear Search" button (calls `setQuery("")`) when nothing matches. Empty-state message is bilingual ("No menu items found." / "Ոչինչ չի գտնվել"); the "Clear Search" button label is English-only (not specified as needing translation).
- `CategoryNavigation` was **not** touched — it always shows all categories regardless of search state (only the main content area filters).
- Verified in-browser: live filtering on every keystroke, category/item disappearance when no items match within it, language-scoped matching (an English query returns nothing while Armenian is selected and vice versa), empty state + Clear Search round-trip, dynamic header/footer values, and social icons correctly absent when URLs are empty.

### 6. Production polish pass

- **Visual**: bigger, bolder category titles (`text-3xl`/`text-4xl`) with a small accent underline bar; more generous section (`py-12`/`py-14`) and card (`p-6`) spacing throughout; scroll offset constant bumped 96px → 112px to match.
- **MenuCard**: fixed `aspect-[4/3]` image container (was a fixed height) for consistent sizing; added its own `imageFailed` state with an `onError` fallback (`ImageOff` icon on a muted background) for images that are configured but fail to load, distinct from the existing "no image at all" text-only case; labels restyled as small uppercase pills; wrapped in `memo()`.
- **CategorySection**: wrapped in `memo()`. `filterMenu` (in `utils/search.ts`) now preserves the original category object reference when none of its items were filtered out, so `memo()` can actually skip re-rendering categories unaffected by a search query — a real, measured "unnecessary re-render" fix, not just a cosmetic one.
- **CategoryNavigation**: bigger touch targets (`px-5 py-2.5`), `overscroll-x-contain` for cleaner mobile edge behavior, and a new `useEffect` that calls `scrollIntoView({ inline: "center", block: "nearest" })` on the active button whenever `activeId` changes — keeps the highlighted pill visible within its own horizontal scroll strip (previously it could scroll off-screen while browsing). Verified this now working end-to-end via the preview tool.
- **Empty state**: added a muted icon circle (`SearchX`) above the message; bumped message contrast (`stone-500` → `stone-600`).
- **Accessibility**: added `focus-visible` rings to every custom interactive element that didn't already have one (LanguageSwitcher pills, SearchBar input via `focus:ring-2`, Footer social links, Clear Search button); demoted Footer's "Working Hours"/"Follow Us" headings from `h2` to `h3` (brand name stays `h2`) for a more accurate heading hierarchy; added `aria-label`s to the `tel:`/`mailto:` footer links; bumped a few borderline-contrast grays (`stone-500` → `stone-600`, placeholder `stone-400` → `stone-500`).
- **Animation**: added a single `@keyframes fade-in` / `.animate-fade-in` utility (opacity + `translateY(4px)`, 0.4s) applied to `MenuCard` and the empty-state block — subtle, CLS-safe (transform/opacity only). Added a global `prefers-reduced-motion: reduce` override in `globals.css` that collapses all animation/transition durations to ~0 for users who request it.
- **SEO**: `layout.tsx` metadata (`title`, `description`, `openGraph`) now derives from `restaurant.json` instead of being hardcoded. Favicon placeholder already existed (`src/app/favicon.ico`, Next's default file-convention icon) — left as is.
- **Loading states**: reviewed and intentionally skipped — the app has no async/Suspense data fetching (menu/restaurant data are static JSON imports with zero latency), so there is no real loading state to skeleton-ize. Revisit if real data fetching is added later.
- **Footer**: deduplicated the three contact rows (address/phone/email) into a single `contactRows.map(...)` instead of three near-identical `<li>` blocks; grid breakpoints changed from "1 col until `lg`" to "1 col → `sm:grid-cols-2` → `lg:grid-cols-2/3`" for a proper tablet layout.
- Verified no horizontal overflow at 320px/390px/tablet/desktop widths (`document.documentElement.scrollWidth <= clientWidth` checked directly).

### 7. Production build fix, Git init, and Vercel deployment prep

- Real menu content (`src/data/menu.json`) uses allergen labels (`contains-seafood`, `contains-dairy`, `contains-nuts`) that were missing from the `MenuItemLabel` type, causing `npm run build` to crash during static prerendering (`TypeError: Cannot read properties of undefined (reading 'en')` in `MenuCard`'s label lookup). Extended `MenuItemLabel` (`src/types/menu.ts`) and `MenuCard`'s `LABEL_TEXT` map with bilingual entries for all three. Verified with a clean `npm run build` and in-browser.
- Initialized the local git repository (first commit), added `.idea/` to `.gitignore` (JetBrains IDE config, not tracked), and pushed to `git@github.com:Leonid-A/lavash_bar-b-que.git` via SSH.
- In progress: deploying to Vercel (import connected, framework auto-detected as Next.js).

### 8. Real menu import from photographed pages

- Replaced `src/data/menu.json` with the restaurant's actual printed menu, transcribed from 11 photographed pages the owner provided in `Desktop/menu/`. Restructured to 11 categories matching the print menu's own sections: Appetizers, Salads, Soups, Charcoal BBQ Seafood, Charcoal BBQ Plates, Charcoal BBQ Wraps, Signature Sandwiches, Hot Dishes, Sides, Drinks, Desserts (~100 items).
- Added optional `MenuCategory.description` (`src/types/menu.ts`) to carry category-level subtitles present on several print pages (Soups, Charcoal BBQ Plates, Charcoal BBQ Wraps); rendered under the heading in `CategorySection.tsx` when present, otherwise omitted. Fully optional, backward-compatible.
- The photographed pages had English text only; all `hy` translations for this content were authored by the AI assistant, matching the style of the pre-existing bilingual entries.
- Fixed a swapped description on the source (Beef Shawarma Plate ↔ Pork Shawarma Plate had each other's description) using the correctly-paired text from the source's Wraps page. Full details of transcription fixes are in `docs/CHANGELOG.md`.
- `restaurant.json` was not touched (no restaurant contact info in the photographed pages).
- Verified with `npm run build`, `npx tsc --noEmit`, `npm run lint`, and in-browser (both languages, category descriptions, corrected shawarma pairing).
- Follow-up: the source "Drinks" page has no description line under any item (unlike every other category), so the descriptions previously carried over there from old sample data were removed. `MenuItem.description` (`src/types/menu.ts`) is now optional; `MenuCard.tsx` renders the description paragraph only when present, and `utils/search.ts` skips it in matching when absent.
- Follow-up: cleared `labels` to `[]` on all 103 menu items — the auto-assigned dietary/allergen labels (vegetarian, contains-dairy, etc.) were placeholders and are pending manual review by the owner. Confirmed `Footer.tsx`'s phone/email were already clickable `tel:`/`mailto:` links; no code change needed there.

### 9. Dark/gold theme matching the printed menu

- Reskinned the app to match the physical printed menu's look: dark charcoal-brown background (`menu-bg`, `#1c1310`), gold headings/prices/accents (`menu-gold`, `#eec35a`), cream body text (`menu-cream`, `#ddc9a0`), plus `menu-surface`/`menu-border` for cards and dividers. Tokens defined in `src/app/globals.css` via Tailwind v4's `@theme` block; see `docs/03-ui-guidelines.md` for the palette reference.
- Applied across every component that previously used the white/`stone-*` palette: `layout.tsx` (body + `viewport.themeColor`), `Header`, `Footer`, `CategoryNavigation`, `SearchBar`, `LanguageSwitcher`, `CategorySection` (headings now uppercase, matching the print style), `MenuCard` (hover elevation changed from drop-shadow to a gold border glow — shadows don't read on a dark background), and the search empty-state.
- `docs/03-ui-guidelines.md`'s Colors section was rewritten to document the new palette as current source of truth (previously specified a white/neutral theme).
- Intentionally not replicated: the printed menu's decorative gold circular line-art corner ornaments — out of scope for a color/typography pass, revisit if wanted later.
- Verified with `npm run build`, `npx tsc --noEmit`, `npm run lint`, and in-browser at mobile (375px) and desktop widths, both languages — no horizontal overflow, no regressions.
- Follow-up fix: `CategoryNavigation`'s `sm:justify-center` on the scrollable pill list made the first/last categories unreachable on wide viewports where the 11 categories overflow (centering pushes content past `scrollLeft: 0`, which browsers won't scroll past). Changed to `sm:justify-[safe_center]`, which centers only when content fits and otherwise falls back to a fully scrollable start alignment.
- Follow-up: added `cursor-pointer` to the shared `.focus-ring` utility (covers every button/link built on it) plus the two footer `tel:`/`mailto:` links, since native `<button>` elements don't get a pointer cursor by default.

### 10. Clickable Google Map in the footer

- Added a small "Find Us" map to `Footer.tsx` under the address/contact list, using the keyless Google Maps embed (`maps.google.com/maps?q=...&output=embed`, no API key needed), queried from `restaurant.name` + `restaurant.address.en`.
- The whole preview is one `<a target="_blank">` to the Google Maps URL scheme (`google.com/maps/search/?api=1&query=...`) — clicking anywhere opens Google Maps pinned to the address. The embedded iframe has `pointer-events-none` so the anchor captures the click; a small "Open in Google Maps" caption is overlaid for affordance.
- Verified the embed endpoint is live (direct visit correctly errors with "must be used in an iframe"), the iframe's `load` event fires in-app, and a real map tile renders (confirmed via full-page screenshot — a light rectangle against the dark theme, since Google's default tiles aren't dark-themeable without the paid Maps JavaScript API).

## Explicitly NOT Implemented Yet

- Real images for menu items (all `image: null` currently; `MenuCard` already supports `next/image` when a path is provided, including a broken-image fallback) and a real logo asset at `/logo.png`.
- Any backend/CMS — `menu.json`/`restaurant.json` are static, hand-authored.
- Persisting the selected language or search query (e.g. to `localStorage` or URL) — both reset on reload by design so far.
- Debouncing search input — intentionally omitted; dataset is small (~100 items) so instant per-keystroke filtering is cheap and matches the "instant" requirement.
- Loading skeletons — no async loading state exists yet to justify them (see above).

## Upcoming Work

- Consider persisting language choice across reloads.
- Fill in real `restaurant.json` values (actual phone/email/address/social URLs/logo) once available.
- Replace sample menu images once real assets exist.
- If real data fetching (CMS/API) is introduced later, add matching skeleton loading states at that point.

## Session Workflow

At the beginning of every development session:

1. Read this file.
2. Read:
   - docs/01-project-overview.md
   - docs/02-development-rules.md
   - docs/03-ui-guidelines.md
   - docs/04-data-model.md
3. Understand the current architecture before making changes.
4. Implement only the requested feature.
5. Preserve the existing architecture and coding standards.
6. When finished:
   - Update docs/CHANGELOG.md
   - Update CLAUDE.md if the project state or architecture changed.