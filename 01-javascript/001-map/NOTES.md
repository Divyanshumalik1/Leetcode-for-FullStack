# Notes — Implement `map`

## Attempts
<!-- Filled in by `npm run log`. -->

| # | Date | Time | Result | Missed |
|---|---|---|---|---|
| 1 | 2026-10-08 | 18 min | 🟡 partial | forgot holes; used this.length inside the loop |
<!-- attempts -->

## Requirements I missed in my spec
<!-- After attempt 1, compare your spec with an outside source (MDN, lodash docs, a known prompt) and list what you didn't think of. -->

## Mistakes I keep making

## How I'd explain it out loud
Copy the length up front so pushes during iteration aren't visited; i in this skips holes; call binds thisArg.