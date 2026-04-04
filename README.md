# Rovel Grupp Door Worksheet MVP

Internal order-entry and production worksheet tool for door orders. The MVP is desktop-first, single-page, and focused on constrained door configuration plus a print-friendly production worksheet.

## What this MVP includes

- 6-step internal order flow
- 4 supported door types:
  - Exterior door
  - Interior door
  - Alpi door
  - Heritage / milieu door
- JSON-driven catalog and rule constraints
- Automatic reset of incompatible selections when door type changes
- Live summary sidebar with validation state
- Review / printable worksheet view
- Local draft persistence in `localStorage`

## Stack

- React
- Vite
- TypeScript
- Plain CSS

## Run locally

Requirements:

- Node.js 20+
- npm

Install and start:

```bash
npm install
npm run dev
```

Open the app at the local Vite URL shown in the terminal, typically `http://localhost:5173`.

## Production check

Build the app:

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

## MVP behavior

- Door type controls allowed materials, finishes, thickness, locks, hardware, thresholds, and veneer choices.
- Alpi doors are fixed to `73 mm`.
- Heritage / milieu doors are fixed to `62 mm`.
- Exterior doors default to `Double seal`.
- Threshold type is required only when threshold is enabled.
- Worksheet readiness states:
  - `Ready for worksheet generation`
  - `Missing required fields`
  - `Invalid configuration`

## Project structure

- `src/data/doorCatalog.ts` contains the catalog and defaults.
- `src/lib/doorRules.ts` applies type-driven sanitization and persistence helpers.
- `src/lib/validation.ts` contains worksheet validation.
- `src/components/` contains the summary and printable worksheet presentation.
- `src/App.tsx` contains the wizard flow and local state wiring.

## Out of scope

- Authentication
- Backend persistence
- Database
- Pricing engine
- Server-side PDF generation
- Windows configurator
- Stairs configurator
- Customer portal
