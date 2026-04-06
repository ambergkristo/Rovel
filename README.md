# Rovel Grupp Storefront

Customer-facing ecommerce storefront foundation for Rovel Grupp, focused on timber doors, windows, stairs, and custom woodwork for the Estonian market.

This iteration continues the earlier storefront sprint and hardens it in two areas:

- Estonian-first localization with English and Russian support
- richer merchandising, catalog structure, and more concrete ecommerce presentation

## Current scope

Implemented:

- homepage with stronger category merchandising and featured/popular product sections
- category overview page at `/products`
- category listing pages at `/products/doors`, `/products/windows`, and `/products/stairs`
- localized product detail pages at `/product/:slug`
- localized cart drawer and `/cart` page
- persisted cart in `localStorage`
- customer-facing custom-order entry page at `/custom-order`
- typed mock catalog with localized content and 18 products across doors, windows, and stairs
- reusable filtering and sorting on listing pages
- shared storefront design system in plain CSS

Still stubbed:

- real checkout and payment flow
- backend, CMS, ERP, shipping, and auth integrations
- live inventory and pricing sync
- full quote-request workflow for custom projects
- advanced configurators beyond the modeled option groups

## Localization

Default locale:

- `et`

Supported locales:

- `et`
- `en`
- `ru`

Behavior:

- first load opens in Estonian
- language can be switched from the header
- selected locale persists in `localStorage`
- major storefront UI strings are localized
- product content is localized for names, descriptions, badges, options, and specification labels

Localization structure:

- `src/i18n/messages.ts` contains typed UI translation dictionaries
- `src/context/LocaleContext.tsx` provides the locale provider
- `src/context/locale-context.ts` holds the locale context shape
- `src/context/useLocale.ts` exposes the locale hook
- `src/lib/localization.ts` contains locale helpers and persistence logic
- `src/data/catalog/*` and `src/data/storefront.ts` store localized catalog and merchandising content

## Stack

- React 19
- Vite
- TypeScript
- React Router
- plain CSS

## Run locally

Requirements:

- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint the code:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Routes

- `/`
- `/products`
- `/products/doors`
- `/products/windows`
- `/products/stairs`
- `/product/:slug`
- `/cart`
- `/custom-order`

## Project structure

- `src/data/catalog/` contains localized mock products by category
- `src/data/storefront.ts` contains category content, trust blocks, custom-order tracks, and shared site info
- `src/lib/shop.ts` contains catalog, pricing, cart-item, and filter helpers
- `src/lib/localization.ts` contains locale helpers and locale persistence
- `src/context/` contains cart and locale state
- `src/components/` contains reusable storefront UI pieces
- `src/pages/` contains route-level pages
- `src/index.css` contains the shared design system and layout styling

## Sprint intent

This repository now behaves like a more concrete storefront layer instead of a generic shell:

- Estonian-first market fit
- richer product cards and product detail pages
- clearer category merchandising
- a stronger sample catalog for doors, windows, and stairs
- a visible path from standard products into custom-order consultation

The next sensible sprint is not a rebuild. It is either:

- quote-request form and lead capture
- richer search and collection logic
- backend-backed catalog and checkout integration
