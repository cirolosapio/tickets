# Copilot Instructions for AI Agents

## Project Overview
- **Framework:** Nuxt 4 (Vue 3, TypeScript, Vite)
- **Directory Structure:**
  - `app/` contains all source code:
    - `app/pages/` for route-based pages (e.g., `index.vue`)
    - `app/app.vue` is the root layout
    - `app/assets/css/main.css` for global styles (uses Tailwind and @nuxt/ui)
  - `public/` for static assets
  - `.github/` for project automation and instructions
- **Config Files:**
  - `nuxt.config.ts` — Nuxt app configuration (modules, CSS, etc.)
  - `eslint.config.mjs` — ESLint config, extends Nuxt defaults
  - `tsconfig.json` — TypeScript project references (auto-managed by Nuxt)

## Developer Workflows
- **Install dependencies:** `ni` (uses pnpm)
- **Development server:** `pnpm dev` or `nuxt dev`
- **Build for production:** `pnpm build` or `nuxt build`
- **Static site generation:** `pnpm generate` or `nuxt generate`
- **Preview production build:** `pnpm preview` or `nuxt preview`
- **Linting:** ESLint is auto-configured via Nuxt; custom rules can be added in `eslint.config.mjs`.

## Patterns & Conventions
- **Pages:**
  - Each `.vue` file in `app/pages/` becomes a route.
  - Use `<template>`, `<script setup lang="ts">`, and `<style scoped>` blocks.
- **Styling:**
  - Use Tailwind CSS and @nuxt/ui components. Import global styles in `main.css`.
- **Modules:**
  - Nuxt modules enabled: `@nuxt/eslint`, `@nuxt/image`, `@nuxt/ui` (see `nuxt.config.ts`).
- **TypeScript:**
  - Use TypeScript in all scripts. Nuxt auto-generates type support.
- **No custom composables/components/layouts/plugins yet** — add to `app/` as needed, following Nuxt conventions.

## Integration & Extensibility
- **Add new pages:** Place `.vue` files in `app/pages/`.
- **Add global styles:** Edit `app/assets/css/main.css`.
- **Add Nuxt modules:** Update `nuxt.config.ts` and install via pnpm.
- **ESLint:** Custom config can be appended in `eslint.config.mjs` using the `withNuxt` helper.

## Examples
- See `app/pages/index.vue` for a minimal page example.
- See `app/app.vue` for the root layout and usage of `<UApp>` and `<NuxtPage>`.

## Notes
- No backend/server code present; this is a purely frontend Nuxt app.
- All configuration and code should follow Nuxt 4 and Vue 3 best practices unless otherwise specified.
