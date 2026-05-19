# AGENTS.md

## Project

This repo is a TanStack Start + React + TypeScript admin app using shadcn/ui, TanStack Router, TanStack Query, Tailwind CSS, Vitest, Playwright browser testing, and Cloudflare Wrangler.

## Default Workflow

Implement one ticket at a time. Do not freestyle architecture, add future-ticket features, or refactor unrelated systems.

Before coding, review:

- `docs/Full_Design_Document.md`
- `docs/MVP_Technical_Design.md`
- `docs/Tickets.md`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Known_Issues_And_Followups.md`

## Ticket Guardrails

Each implementation request should define:

- Ticket ID and title
- Goal
- Dependencies
- Allowed areas
- Do not touch
- Requirements
- Non-goals
- Acceptance criteria
- Manual verification

Follow the ticket boundaries exactly. If something outside scope looks wrong, record it in `docs/Known_Issues_And_Followups.md` instead of fixing it.

## Code Rules

- Keep changes small, focused, and reviewable.
- Match existing style and project structure.
- Use strict TypeScript patterns.
- Prefer existing libraries and helpers already in the repo.
- Avoid new dependencies unless the ticket explicitly requires one.
- Do not edit generated files manually unless that is the repo's normal workflow for the change.
- Keep route changes aligned with TanStack Router conventions.
- Keep UI built from existing shadcn/Radix/lucide/Tailwind patterns where practical.
- Do not mix runtime objects with persisted project/data formats unless explicitly designed.

## Verification

Run the narrowest useful checks for the ticket. Prefer:

- `pnpm lint`
- `pnpm build`
- `pnpm test`
- Manual browser verification for user-facing UI changes

If a check cannot run, report why and list remaining risk.

## Completion Report

Every ticket run should end with:

- Summary of changes
- Files changed
- Commands run
- Build/test results
- Manual verification performed
- Docs updated or docs still needed
- Risks
- Follow-up tickets

## Git Hygiene

- Use a branch per ticket when practical, for example `feature/t0001-project-skeleton`.
- Preserve unrelated dirty work.
- Stage only files that belong to the ticket.
- Do not rewrite history, reset, clean, or discard changes unless the user explicitly asks.

