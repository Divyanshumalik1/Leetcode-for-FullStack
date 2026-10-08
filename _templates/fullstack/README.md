# {{TITLE}}

> Section {{SECTION}} · template: {{TYPE}} · started {{DATE}}

Write this spec **before** any code. Scope it to what you could build in 2–4 hours.

## Prompt
<!-- One or two lines, exactly how an interviewer would say it. -->

## Clarifying questions I'd ask
-

## Core features (in scope)
- [ ]

## Out of scope (say it out loud)
-

## API contract
| Method | Path | Request | Response | Errors |
|---|---|---|---|---|
| GET | /api/health | – | `200 { ok: true }` | – |

## Data model

## UI screens and states

## Edge cases and failure modes
-

## Follow-ups (the interviewer changes the rules)
-

## Tradeoffs
<!-- Fill in after attempt 1. -->

---

`npm run play -- <this folder>` starts the server (port 3000) and the client; the client calls `/api/*`, which is proxied to the server.
Need Postgres or Redis? `npm run db:up`.
