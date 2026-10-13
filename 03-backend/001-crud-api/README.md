# CRUD API

> Section 9 · template: backend · **guided** — the spec and tests are provided; you write `src/app.js`.

## Prompt
"Build a REST API for a to-do list. Users can create, list, read, update and delete tasks. Keep the data in memory — no database for now. You have 45 minutes."

## Clarifying questions (and the answers we're going with)
- **What does a task look like?** `{ id, title, done, createdAt, updatedAt }`
- **Who creates the id?** The server. Use `crypto.randomUUID()`.
- **Database?** No, an in-memory store. Each `createApp()` call gets its own empty store, so tests don't affect each other.
- **Update with PUT or PATCH?** PATCH: the client sends only the fields that change.
- **Filtering?** Only `GET /tasks?done=true|false`.
- **Error format?** Always JSON: `{ "error": { "message": "..." } }`.

## Requirements
- [ ] `POST /tasks` creates a task and returns **201** with the full task
- [ ] `title` is required: a string, 1–200 characters after trimming. The stored title is trimmed.
- [ ] `done` is optional on create (default `false`) and must be a boolean if given
- [ ] `GET /tasks` returns **200** with `{ data: [...] }` in creation order
- [ ] `GET /tasks?done=true` / `?done=false` filters; any other value is **400**
- [ ] `GET /tasks/:id` returns **200** with the task, or **404**
- [ ] `PATCH /tasks/:id` updates `title` and/or `done` (same validation as create) and bumps `updatedAt`; `createdAt` and `id` never change
- [ ] `PATCH` with no `title` or `done` in the body is **400**; an unknown id is **404**
- [ ] `DELETE /tasks/:id` returns **204** with no body, or **404**
- [ ] Malformed JSON in a request body is **400**, not a crash or a 500
- [ ] Unknown routes return **404** in the same JSON error format

## API contract
| Method | Path | Request body | Success | Errors |
|---|---|---|---|---|
| POST | /tasks | `{ title, done? }` | `201` task | `400` |
| GET | /tasks | – (query: `done`) | `200 { data: [task] }` | `400` |
| GET | /tasks/:id | – | `200` task | `404` |
| PATCH | /tasks/:id | `{ title?, done? }` | `200` task | `400`, `404` |
| DELETE | /tasks/:id | – | `204` | `404` |

Dates are ISO strings, e.g. `"2026-10-08T14:00:00.000Z"` (use `new Date().toISOString()`).

## Edge cases
- Title that's only spaces → 400
- Title of exactly 200 characters → OK; 201 characters → 400
- `done: "true"` (a string) → 400
- Extra fields like `{ title: "x", id: "hack" }` → ignored; the server picks the id
- Deleting the same task twice → the second call is 404

## Follow-ups (for attempt 3)
- Swap the in-memory store for Postgres (`npm run db:up`)
- Add pagination: `GET /tasks?limit=20&cursor=...`
- Add search: `GET /tasks?q=milk`
- Two clients PATCH the same task at once — how do you stop one overwriting the other? (Hint: a `version` field.)

## Tradeoffs
<!-- Fill in after attempt 1: why a Map, why PATCH, what changes with a real database. -->