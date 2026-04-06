# Rovel Grupp Storefront MVP

Customer-facing ecommerce foundation for Rovel Grupp, focused on timber doors, windows, and stairs.

This sprint replaces the earlier internal worksheet-oriented MVP with a storefront shell that is credible for first customer exposure while staying intentionally mock-data driven.

## What is implemented

- Homepage with hero, category paths, trust sections, featured products, and custom-solution CTA
- Product overview page at `/products`
- Reusable category listing flow for:
  - `/products/doors`
  - `/products/windows`
  - `/products/stairs`
- Reusable product detail page at `/product/:slug`
- Cart drawer and `/cart` page
- LocalStorage cart persistence
- Typed mock catalog with 12 products across doors, windows, and stairs
- Reusable filtering and sorting for listing pages
- Custom solution entry page at `/custom-order`
- Shared storefront design system in plain CSS

## What is intentionally stubbed

- Checkout and payment processing
- Backend, CMS, ERP, shipping, and auth integrations
- Real inventory syncing
- Full quote/request workflow for custom projects
- Full product configurators beyond the modeled option groups

## Stack

- React 19
- Vite
- TypeScript
- React Router
- Plain CSS

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

- `src/data/storefront.ts` contains category content, mock products, and generated product imagery
- `src/lib/shop.ts` contains catalog, pricing, cart-item, and filter helpers
- `src/context/` contains cart state and hooks
- `src/components/` contains reusable storefront UI pieces
- `src/pages/` contains route-level pages
- `src/index.css` contains the shared design system and layout styling

## Sprint intent

This repository now behaves like the first real storefront iteration:

- polished customer-facing merchandising
- reusable ecommerce page architecture
- mock catalog realistic enough for credible browsing
- cart behavior that works end-to-end without backend dependencies

The next sensible sprint is checkout and quote-request integration, not another internal worksheet pass.
