# MVP Technical Design

## Stack

- TanStack Start
- React
- TypeScript
- TanStack Router
- TanStack Query
- shadcn/ui and Radix UI
- Tailwind CSS
- Vitest and Playwright browser mode
- Cloudflare Wrangler

## App Structure

- `src/routes/` contains TanStack Router routes.
- `src/features/` contains feature-level UI and logic.
- `src/components/ui/` contains shared UI primitives.
- `src/components/layout/` contains layout components.
- `src/lib/` contains shared helpers.
- `src/stores/` contains app stores.

## Scripts

- `pnpm dev` starts local dev server.
- `pnpm build` runs TypeScript build and Vite build.
- `pnpm lint` runs ESLint.
- `pnpm test` runs Vitest in browser headless mode.
- `pnpm format:check` checks Prettier formatting.

## Implementation Principles

- Keep tickets independently verifiable.
- Prefer repo-native patterns over new abstractions.
- Add tests when behavior or regressions justify them.
- Do not introduce broad architecture changes from narrow tickets.

## MVP Milestones

TBD.

