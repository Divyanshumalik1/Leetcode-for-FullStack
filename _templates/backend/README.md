# {{TITLE}}

> Section {{SECTION}} · template: {{TYPE}} · started {{DATE}}

Write this spec **before** any code — the way an interviewer would hand it to you, plus the questions you'd ask back.

## Prompt
<!-- One or two lines, exactly how an interviewer would say it. -->

## Clarifying questions I'd ask
-

## Requirements (my assumptions)
- [ ]

## API contract
| Method | Path | Request | Response | Errors |
|---|---|---|---|---|
| GET | /health | – | `200 { ok: true }` | – |

## Data model
<!-- Tables / collections / Redis keys, with indexes. -->

## Edge cases and failure modes
<!-- Concurrency, retries, duplicates, timeouts, bad input. -->
-

## Follow-ups (the interviewer changes the rules)
-

## Tradeoffs
<!-- Fill in after attempt 1. -->

---

Need Postgres or Redis? `npm run db:up` starts both (see `docker-compose.yml`):
`DATABASE_URL=postgres://dev:dev@localhost:5432/dev` · `REDIS_URL=redis://localhost:6379`
