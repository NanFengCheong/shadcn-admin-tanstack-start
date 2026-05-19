# Manual Verification Guide

Use this guide to verify each ticket beyond build success.

## Baseline App Check

1. Run `pnpm install` if dependencies changed or node_modules is missing.
2. Run `pnpm dev`.
3. Open the local app URL printed by Vite.
4. Confirm the app loads.
5. Confirm the expected route or UI section appears.
6. Check browser console for errors.
7. Run `pnpm build`.
8. Confirm build succeeds.

## UI Ticket Check

1. Navigate through the user-visible flow affected by the ticket.
2. Confirm empty, loading, success, and error states when relevant.
3. Confirm layout works at desktop and mobile widths when relevant.
4. Confirm keyboard and focus behavior for forms, dialogs, and menus when relevant.

## Data/Auth Ticket Check

1. Verify expected API/config/env path is used.
2. Verify failure handling is visible and does not leave the UI stuck.
3. Verify no unrelated auth or route behavior changed.

## Completion Evidence

Record:

- Commands run
- Manual steps completed
- Browser/dev-server URL if used
- Any console/runtime errors
- Remaining risks

