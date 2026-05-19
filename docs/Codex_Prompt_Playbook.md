# Codex Prompt Playbook

## Ticket Handoff Prompt

```text
We are working on shadcn-admin-tanstack-start.

Before coding, review:
- AGENTS.md
- docs/Full_Design_Document.md
- docs/MVP_Technical_Design.md
- docs/Tickets.md
- docs/Repo_Current_State.md
- docs/Manual_Verification_Guide.md
- docs/Known_Issues_And_Followups.md

Implement this ticket only.

Ticket:
[Ticket ID - Title]

Branch:
[Suggested branch name]

Goal:
[Goal]

Dependencies:
[Dependencies]

Allowed areas:
[Allowed files/folders]

Do not touch:
[Files/folders/systems to avoid]

Requirements:
[Requirements]

Non-goals:
[Non-goals]

Acceptance criteria:
[Acceptance criteria]

Manual verification:
[Manual steps]

Project rules:
- Implement the requested ticket only.
- Do not implement future-ticket features.
- Do not refactor unrelated code.
- Do not introduce new architecture unless required.
- Avoid unnecessary dependencies.
- Keep changes small and testable.

After implementation, provide:
- Summary of what changed
- Files changed
- Commands run
- Build/test results
- Manual verification steps
- Whether docs need updating
- Any risks or follow-up tickets
```

## Repo State Update Prompt

```text
Update docs/Repo_Current_State.md after the completed ticket.

Include:
- Current branch
- Completed ticket
- Files changed
- Scripts/checks run
- Build/test status
- Known issues
- Next recommended ticket
```

