# Best Craft Material (BCM)

A single-page marketing landing page (Thai copy) for a building-materials store, built with Next.js (App Router) + Tailwind CSS + TypeScript. It is a fully static, presentational page — there is no backend, database, API, auth, or environment variables.

## Cursor Cloud specific instructions

- Stack: Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v3 + TypeScript. The update script runs `npm install`; dependencies come from `package.json`.
- App entry point is `app/page.tsx`. The repo root also contains a legacy `index.html` which is actually the original Next.js component (mis-named) — it is NOT used by the app and is not served by Next. Edit `app/page.tsx`, not `index.html`.
- Commands (see `package.json` scripts):
  - Dev server: `npm run dev` (serves on http://localhost:3000).
  - Production build: `npm run build`.
  - Lint: `npm run lint`. Note `next lint` was removed in Next 16; linting runs ESLint directly via the flat config in `eslint.config.mjs` (`eslint-config-next/core-web-vitals`).
- No secrets/env setup needed to run, build, or test — it's a static page.
- Tailwind: the page uses two undefined custom utility classes (`font-craft`, `font-sans`) that have no theme mapping; they are cosmetic and safe to ignore unless you intend to add custom fonts in `tailwind.config.ts`.
