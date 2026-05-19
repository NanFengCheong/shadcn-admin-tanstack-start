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
- Bun

## App Structure

- `src/routes/` contains TanStack Router routes.
- `src/features/` contains feature-level UI and logic.
- `src/components/ui/` contains shared UI primitives.
- `src/components/layout/` contains layout components.
- `src/lib/` contains shared helpers.
- `src/stores/` contains app stores.

## Scripts

- `bun run dev` starts local dev server.
- `bun run build` runs TypeScript build and Vite build.
- `bun run lint` runs Oxlint.
- `bun run test` runs Vitest in browser headless mode.

## Implementation Principles

- Keep tickets independently verifiable.
- Prefer repo-native patterns over new abstractions.
- Add tests when behavior or regressions justify them.
- Do not introduce broad architecture changes from narrow tickets.

## MVP Milestones

TBD.
