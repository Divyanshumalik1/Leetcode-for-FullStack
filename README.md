# 🧑‍💻 Full-Stack LeetCode

> A LeetCode-style practice bank for **frontend, backend and full-stack engineering** — built for FAANG **SDE-2 / senior full-stack** interview prep.

LeetCode trains algorithms. This repo trains the other half of the interview: **machine coding, polyfills, APIs, concurrency, system design and production engineering** — the "blank editor → working system" muscle.

<!-- badges:start -->
![Questions](https://img.shields.io/badge/questions-0-blue)
![Started](https://img.shields.io/badge/started-0-orange)
![Mastered](https://img.shields.io/badge/mastered-0%2F0-brightgreen)
<!-- badges:end -->

---

## 📌 How to use this repo

**Don't try to solve everything.** Pick ~150–200 problems as your core curriculum (start with the [⭐ Highest-Value 100](#-27-the-highest-value-100)) and treat the rest as variation drills and interview prompts.

### The 3-attempt rule (for every problem)

| Attempt | Rules | Goal |
|---|---|---|
| **1** | No solution, no AI, no Google. Timed. Build from memory. | Find out what you actually know |
| **2** | Fix the architecture, edge cases and speed. Look things up now. | Close the gaps |
| **3** | Blank repo, timed again, explain every decision out loud. | Interview-ready |

### ✅ Definition of "Mastered"

You can **implement it from a blank editor**, **test it**, **explain the tradeoffs**, and **adapt when the interviewer changes the requirements**.

That's the frontend/backend equivalent of solving a LeetCode medium cold.

### Legend

| Mark | Meaning |
|---|---|
| `[x]` | Mastered — ticked automatically (see below) |
| 📂 | Link to your solution folder |
| ⚪ 🔴 🟡 🟢 | Not attempted yet / last attempt failed / partial / passed |
| ⭐ | In the Highest-Value 100 |
| 🆕 | Added beyond the original list |

> **Don't edit the checkboxes by hand.** GitHub doesn't make checkboxes clickable in repository files (only in issues and PRs), so the tracker ticks them for you: `npm run log` updates this README every time you log an attempt, and a GitHub Action re-syncs it on every push.

---

## ⚙️ Setup & daily workflow

### One-time setup

```bash
git clone <your-repo-url> && cd fullstack-leetcode
npm install            # Node 20+
npm run today          # shows what to do first
```

Backend problems that need Postgres or Redis: `npm run db:up` (Docker).

### The loop for every problem

```bash
npm run new   -- debounce          # 1. scaffold a folder from the question in this README
                                   # 2. write the spec in its README.md, then the tests
npm run t     -- debounce          # 3. tests in watch mode while you build (timer on!)
npm run play  -- autocomplete      #    UI → opens it in the browser · backend → runs the server
npm run log   -- debounce --result partial --time 28 --missed "no cancel(), lost this"
                                   # 4. logs the attempt, updates NOTES.md, PROGRESS.md and this README
npm run reset -- debounce          # 5. before the next attempt: archives your code, gives you blank files
npm run today                      # what's due today (spaced repetition) and what to start next
```

- **Finding a question:** `npm run new` takes any words from the question. If several match, it lists them so you can add a word.
- **Spacing:** attempt 2 is due 2 days after attempt 1; attempt 3 is due 7 days after attempt 2.
- **Mastered:** a `pass` on attempt 3 or later. That ticks the checkbox here.
- **Wrong template?** Add `--type js|ui|backend|fullstack|design|concept` to `npm run new`.

### Repository structure

Folders are created only when you start a problem.

```
fullstack-leetcode/
├── 01-javascript/        sections 3, 4, 26
├── 02-frontend/          sections 1, 2, 5–8
├── 03-backend/           sections 9–14, 16, 17
├── 04-fullstack/         section 18
├── 05-concurrency/       section 15
├── 06-distributed/       section 20
├── 07-testing/           section 22
├── 08-production/        section 23
├── 09-system-design/     sections 19, 21, 24, 25
├── 10-drills/            sections 28–30
├── _templates/           one template per problem type
├── scripts/              the tracker (fl.mjs) and the UI preview app
├── PROGRESS.md           every attempt you've logged
└── README.md             this file — checkboxes and progress update automatically
```

### What each problem folder looks like

| Template | Used for | Files |
|---|---|---|
| `js` | JS utilities, polyfills, from-scratch builds | `solution.js`, `solution.test.js` |
| `ui` | Components, hooks, DOM, CSS | `App.jsx`, `App.test.jsx` |
| `backend` | APIs, patterns, concurrency, distributed pieces | `src/app.js`, `src/server.js`, `tests/app.test.js` |
| `fullstack` | Full-stack apps | `client/App.jsx`, `server/app.js`, `tests/` |
| `design` | System design | `design.md` (API, data model, diagram, tradeoffs) |
| `concept` | Explain-it, debugging and behavioral questions | `answer.md`, `playground.js` |

Every folder also gets `README.md` (your spec), `NOTES.md` (attempt log and mistakes) and `meta.json` (used by the tracker). After `npm run reset`, earlier attempts live in `attempts/attempt-N/`.

---

## 📚 Table of contents

**Frontend**
1. [HTML / DOM](#1-html--dom)
2. [CSS / UI implementation](#2-css--ui-implementation)
3. [JavaScript implementation](#3-javascript-implementation)
4. [JavaScript reasoning](#4-javascript-reasoning)
5. [React machine coding](#5-react-machine-coding)
6. [React internals / architecture](#6-react-internals--architecture)
7. [Frontend performance](#7-frontend-performance)
8. [Frontend networking](#8-frontend-networking)

**Backend**

9. [REST / API machine coding](#9-backend-rest--api-machine-coding)
10. [Production patterns](#10-backend-production-patterns)
11. [Authentication / security](#11-authentication--security)
12. [Databases](#12-databases)
13. [Redis](#13-redis)
14. [Queues / async backend](#14-queues--asynchronous-backend)
15. [Concurrency](#15-backend-concurrency)
16. [File / storage systems](#16-file--storage-systems)
17. [Real-time systems](#17-real-time-systems)

**Full-stack & systems**

18. [Full-stack applications](#18-full-stack-applications)
19. [Serious full-stack systems](#19-serious-full-stack-systems)
20. [Distributed backend implementation](#20-distributed-backend-implementation)
21. [Backend architecture](#21-backend-architecture)
22. [Testing](#22-testing)
23. [DevOps / production](#23-devops--production)
24. [Frontend system design](#24-frontend-system-design)
25. [Advanced frontend systems](#25-advanced-frontend-systems)
26. [Build it from scratch](#26-build-it-from-scratch)
27. [⭐ The Highest-Value 100](#-27-the-highest-value-100)
28. [🆕 Debugging & incident drills](#-28-debugging--incident-drills)
29. [🆕 Code review drills](#-29-code-review-drills)
30. [🆕 SDE-2 behavioral prompts](#-30-sde-2-behavioral-prompts)

[🗓️ Study plan](#️-12-week-study-plan) · [📈 Progress tracker](#-progress-tracker) · [🔗 Resources](#-resources)

---

# 🎨 Frontend

## 1. HTML / DOM

- [ ] Build a semantic webpage
- [ ] Build an accessible form
- [ ] Implement keyboard navigation
- [ ] Implement focus trapping
- [ ] Implement a custom dropdown
- [ ] Implement a custom checkbox
- [ ] Implement a custom radio group
- [ ] Implement tabs using ARIA
- [ ] Implement an accessible modal
- [ ] Implement nested menus
- [ ] Implement event delegation
- [ ] Implement DOM tree traversal
- [ ] Implement DOM diffing
- [ ] Implement DOM element cloning
- [ ] Implement dynamic element creation
- [ ] Build a MutationObserver demo
- [ ] Build an IntersectionObserver demo
- [ ] Build a ResizeObserver demo
- [ ] Build an infinite-scroll container
- [ ] 🆕 Implement `getElementsByClassName` / `querySelectorAll` polyfill
- [ ] 🆕 Find the common ancestor of two DOM nodes
- [ ] 🆕 Find the corresponding node in an identical DOM tree
- [ ] 🆕 Build a sortable list with the native Drag & Drop API
- [ ] 🆕 Implement a custom select with type-ahead search

## 2. CSS / UI implementation

- [ ] Responsive navbar
- [ ] Hamburger menu
- [ ] Popover (HTML/CSS only)
- [ ] Accordion (HTML/CSS only)
- [ ] Context menu (HTML/CSS only)
- [ ] Toast notification (HTML/CSS only)
- [ ] Progress bar (HTML/CSS only)
- [ ] Circular progress indicator
- [ ] Skeleton loader
- [ ] Responsive card grid
- [ ] Masonry layout
- [ ] Image gallery
- [ ] Image carousel (HTML/CSS only)
- [ ] Responsive dashboard
- [ ] Pricing cards
- [ ] Login page
- [ ] Signup page
- [ ] Checkout page
- [ ] Responsive sidebar
- [ ] Multi-column layout
- [ ] Sticky header
- [ ] Sticky sidebar
- [ ] CSS-only tooltip
- [ ] CSS animation loader
- [ ] Dark / light theme
- [ ] Responsive table
- [ ] 🆕 Holy-grail layout with CSS Grid
- [ ] 🆕 Center an element 5 different ways (and explain when to use each)
- [ ] 🆕 Multi-line text truncation with "Read more"
- [ ] 🆕 Reduced-motion–aware animations (`prefers-reduced-motion`)
- [ ] 🆕 Container-query–driven responsive card

## 3. JavaScript implementation

### Arrays & objects
- [ ] Implement `map` ⭐
- [ ] Implement `filter`
- [ ] Implement `reduce` ⭐
- [ ] Implement `forEach`
- [ ] Implement `find`
- [ ] Implement `some`
- [ ] Implement `every`
- [ ] Implement `flat` ⭐
- [ ] Implement `flatMap`
- [ ] Implement `groupBy` ⭐
- [ ] Implement `chunk`
- [ ] Implement `unique`
- [ ] Implement `deepClone` ⭐
- [ ] Implement `deepEqual` ⭐
- [ ] Implement `flattenObject`
- [ ] Implement `get(object, path)`
- [ ] Implement `set(object, path, value)`
- [ ] Implement `merge`
- [ ] Implement `pick`
- [ ] Implement `omit`
- [ ] 🆕 Implement `JSON.stringify`
- [ ] 🆕 Implement `JSON.parse`
- [ ] 🆕 Implement `classnames()` utility
- [ ] 🆕 Implement `instanceof`
- [ ] 🆕 Implement `Object.create` and the `new` operator

### Functions
- [ ] Implement `bind`
- [ ] Implement `call`
- [ ] Implement `apply`
- [ ] Implement currying ⭐
- [ ] Implement partial application
- [ ] Implement function composition
- [ ] Implement `pipe`
- [ ] Implement memoization ⭐
- [ ] Implement `once`
- [ ] Implement `debounce` ⭐
- [ ] Implement `throttle` ⭐
- [ ] Implement `retry` ⭐
- [ ] Implement `timeout`
- [ ] Implement `sleep`
- [ ] Implement cancellation
- [ ] 🆕 Implement `debounce` with `leading`, `trailing` and `flush/cancel`

### Promises / async
- [ ] Implement `Promise.all` ⭐
- [ ] Implement `Promise.allSettled`
- [ ] Implement `Promise.race` ⭐
- [ ] Implement `Promise.any`
- [ ] Implement a Promise from scratch
- [ ] Implement a task queue ⭐
- [ ] Implement concurrency limiting ⭐
- [ ] Implement exponential backoff
- [ ] Implement request cancellation
- [ ] Implement request deduplication
- [ ] Implement priority task scheduling
- [ ] Implement sequential promise execution
- [ ] Implement parallel promise execution
- [ ] Implement async memoization
- [ ] 🆕 Implement `promisify`
- [ ] 🆕 Implement an `AbortController`-aware `fetch` wrapper with timeout
- [ ] 🆕 Implement an async iterator over a paginated API (`for await`)

## 4. JavaScript reasoning

- [ ] Explain closures
- [ ] Predict closure output
- [ ] Explain hoisting
- [ ] Predict `var` / `let` behavior
- [ ] Explain lexical scope
- [ ] Explain `this`
- [ ] Predict `this` output
- [ ] Implement inheritance
- [ ] Explain the prototype chain
- [ ] Explain the event loop ⭐
- [ ] Predict microtask / macrotask ordering ⭐
- [ ] `setTimeout` vs Promise ordering
- [ ] `process.nextTick` vs `setImmediate`
- [ ] Explain garbage collection
- [ ] Identify a memory leak
- [ ] Explain shallow vs deep copy
- [ ] Explain equality operators
- [ ] Explain type coercion
- [ ] Explain ES modules vs CommonJS
- [ ] 🆕 Explain generators and iterators
- [ ] 🆕 Explain `WeakMap`, `WeakSet` and `WeakRef`
- [ ] 🆕 Explain `Proxy` and `Reflect` (build a reactive object)
- [ ] 🆕 Explain Node.js internals: libuv, thread pool, worker threads, cluster
- [ ] 🆕 Explain Node.js streams and backpressure

## 5. React machine coding

### Basic
- [ ] Counter
- [ ] Counter with step
- [ ] Countdown timer
- [ ] Stopwatch
- [ ] Accordion ⭐
- [ ] Tabs ⭐
- [ ] Modal ⭐
- [ ] Tooltip
- [ ] Popover
- [ ] Toast system ⭐
- [ ] Progress bar
- [ ] Star rating
- [ ] Image carousel ⭐
- [ ] Theme switcher
- [ ] OTP input
- [ ] Password strength indicator
- [ ] Chips input
- [ ] Tag selector
- [ ] Color picker
- [ ] Dropdown
- [ ] 🆕 Tic-tac-toe (with N×N board and winner detection)
- [ ] 🆕 Traffic light
- [ ] 🆕 Poll / voting widget

### Intermediate
- [ ] Todo application
- [ ] Todo with persistence
- [ ] Pagination ⭐
- [ ] Infinite scrolling ⭐
- [ ] Autocomplete ⭐
- [ ] Search with debounce
- [ ] Search with cancellation
- [ ] Sortable table
- [ ] Filterable table
- [ ] Data table ⭐
- [ ] File upload ⭐
- [ ] Drag-and-drop upload
- [ ] Multi-step form ⭐
- [ ] Form validation
- [ ] Shopping cart ⭐
- [ ] Product catalog
- [ ] Checkout flow
- [ ] Context menu
- [ ] Notification center
- [ ] Nested comments ⭐
- [ ] 🆕 Date picker / date-range picker
- [ ] 🆕 Transfer list (move items between two lists)
- [ ] 🆕 Image cropper
- [ ] 🆕 Snake / Connect Four game

### Advanced
- [ ] Tree / folder explorer ⭐
- [ ] Recursive checkbox tree ⭐
- [ ] Kanban board ⭐
- [ ] Calendar ⭐
- [ ] Calendar with events
- [ ] Email client
- [ ] Chat UI ⭐
- [ ] Slack clone UI
- [ ] Command palette ⭐
- [ ] Virtualized list ⭐
- [ ] Virtualized table
- [ ] Spreadsheet
- [ ] Rich-text editor
- [ ] Markdown editor
- [ ] Code editor UI
- [ ] Drag-and-drop page builder
- [ ] Nested drag-and-drop tree
- [ ] Collaborative editor
- [ ] Infinite social feed
- [ ] 🆕 Drawing canvas with undo / redo
- [ ] 🆕 Gantt / timeline chart

## 6. React internals / architecture

- [ ] Implement `useState`
- [ ] Implement `useEffect`
- [ ] Implement `useMemo`
- [ ] Implement `useCallback`
- [ ] Implement `useRef`
- [ ] Implement `usePrevious`
- [ ] Implement `useDebounce`
- [ ] Implement `useThrottle`
- [ ] Implement `useFetch`
- [ ] Implement `useLocalStorage`
- [ ] Implement `useClickOutside`
- [ ] Implement `useIntersectionObserver`
- [ ] Implement `useMediaQuery`
- [ ] Implement `useUndoRedo`
- [ ] Implement pub/sub ⭐
- [ ] Implement a Redux-like store
- [ ] Implement middleware
- [ ] Implement selector subscriptions
- [ ] 🆕 Implement `useReducer`
- [ ] 🆕 Build a store on top of `useSyncExternalStore`
- [ ] 🆕 Implement an Error Boundary with retry
- [ ] 🆕 Explain reconciliation, keys and the Fiber architecture
- [ ] 🆕 Explain Suspense, transitions and concurrent rendering

## 7. Frontend performance

- [ ] Optimize a slow React component
- [ ] Find unnecessary renders
- [ ] Fix stale closures
- [ ] Fix infinite `useEffect` loops
- [ ] Implement virtualization
- [ ] Implement lazy loading
- [ ] Implement code splitting
- [ ] Implement route-level splitting
- [ ] Implement image lazy loading
- [ ] Implement image optimization
- [ ] Implement request caching
- [ ] Implement client-side cache invalidation
- [ ] Implement optimistic updates
- [ ] Implement offline-first UI
- [ ] Implement service-worker caching
- [ ] Implement prefetching
- [ ] Implement infinite-scroll optimization
- [ ] Optimize a 100k-row table
- [ ] Diagnose a slow page
- [ ] 🆕 Measure and improve Core Web Vitals (LCP, INP, CLS)
- [ ] 🆕 Analyze and shrink a bundle (tree-shaking, duplicate deps)
- [ ] 🆕 Move heavy computation to a Web Worker

## 8. Frontend networking

- [ ] REST client
- [ ] API client wrapper
- [ ] Request interceptor
- [ ] Response interceptor
- [ ] Retry failed requests
- [ ] Request batching
- [ ] Polling
- [ ] Long polling
- [ ] Server-Sent Events client
- [ ] WebSocket client
- [ ] WebSocket reconnection
- [ ] WebSocket heartbeat
- [ ] Connection state management
- [ ] Offline request queue
- [ ] Network-aware UI
- [ ] API error boundary
- [ ] 🆕 GraphQL client with normalized cache
- [ ] 🆕 HTTP caching with `ETag` / `Cache-Control` / `stale-while-revalidate`
- [ ] 🆕 Auth-token refresh interceptor (queue requests during refresh)

---

# ⚙️ Backend

## 9. Backend REST / API machine coding

> Real-world example: a 30-minute round asking for a Journal CRUD API with filtering by date and mood.

- [ ] CRUD API ⭐
- [ ] User API
- [ ] Product API
- [ ] Order API
- [ ] Journal API
- [ ] Blog API
- [ ] Comment API
- [ ] File API
- [ ] Search API ⭐
- [ ] Pagination API ⭐
- [ ] Cursor pagination ⭐
- [ ] Filtering
- [ ] Sorting
- [ ] Full-text search
- [ ] API versioning
- [ ] API validation
- [ ] Centralized error handling
- [ ] Authentication API ⭐
- [ ] Authorization middleware
- [ ] Role-based access control ⭐
- [ ] 🆕 Bulk create / update endpoints with partial failures
- [ ] 🆕 Streaming CSV export endpoint
- [ ] 🆕 Webhook receiver with signature verification ⭐
- [ ] 🆕 GraphQL API with DataLoader batching
- [ ] 🆕 gRPC service with streaming

## 10. Backend production patterns

- [ ] Rate limiter ⭐
- [ ] Token bucket
- [ ] Leaky bucket
- [ ] Sliding-window limiter
- [ ] API quota system
- [ ] Idempotency middleware ⭐
- [ ] Distributed idempotency
- [ ] Retry middleware ⭐
- [ ] Circuit breaker ⭐
- [ ] Bulkhead pattern
- [ ] Request timeout
- [ ] Graceful shutdown
- [ ] Health-check endpoint
- [ ] Readiness endpoint
- [ ] Liveness endpoint
- [ ] Request logging
- [ ] Structured logging
- [ ] Metrics endpoint
- [ ] API audit logging
- [ ] 🆕 Request-ID propagation across services
- [ ] 🆕 Feature-flag middleware
- [ ] 🆕 Load shedding under overload

## 11. Authentication / security

- [ ] JWT authentication
- [ ] Session authentication
- [ ] Refresh tokens
- [ ] Token rotation
- [ ] OAuth flow
- [ ] ABAC
- [ ] API keys
- [ ] API-key rotation
- [ ] Password hashing
- [ ] Password reset
- [ ] Email verification
- [ ] MFA flow
- [ ] CSRF protection
- [ ] CORS configuration
- [ ] XSS prevention
- [ ] SQL-injection prevention
- [ ] Rate-limit login
- [ ] Account lockout
- [ ] Secret management
- [ ] 🆕 Content Security Policy (CSP) headers
- [ ] 🆕 SSRF prevention
- [ ] 🆕 HMAC request signing
- [ ] 🆕 Multi-tenant data isolation

## 12. Databases

### SQL
- [ ] CRUD queries
- [ ] Joins
- [ ] Self joins
- [ ] Aggregations
- [ ] `GROUP BY`
- [ ] `HAVING`
- [ ] Window functions
- [ ] Ranking
- [ ] Running totals
- [ ] Pagination queries
- [ ] Keyset (cursor) pagination queries
- [ ] Deduplication
- [ ] Upsert
- [ ] Transactions
- [ ] Isolation levels
- [ ] Deadlocks (detection & prevention)
- [ ] Optimistic locking
- [ ] Pessimistic locking
- [ ] Index design
- [ ] Composite indexes
- [ ] Query optimization (read an `EXPLAIN` plan)
- [ ] N+1 problem
- [ ] Connection pooling
- [ ] Database migrations
- [ ] Read replicas
- [ ] 🆕 Soft deletes
- [ ] 🆕 Zero-downtime schema migration (expand / contract)
- [ ] 🆕 Recursive CTE (org chart / comment tree)
- [ ] 🆕 Partitioning and sharding strategy

### NoSQL
- [ ] MongoDB CRUD
- [ ] MongoDB aggregation
- [ ] Document modeling
- [ ] Embedded vs referenced data
- [ ] MongoDB indexing
- [ ] DynamoDB partition design
- [ ] DynamoDB sort keys
- [ ] DynamoDB single-table design
- [ ] Cassandra data modeling
- [ ] Eventual consistency
- [ ] 🆕 Time-series data modeling

## 13. Redis

- [ ] Basic caching ⭐
- [ ] Cache-aside
- [ ] Write-through cache
- [ ] Write-behind cache
- [ ] Cache invalidation
- [ ] TTL
- [ ] Distributed lock ⭐
- [ ] Redis rate limiter
- [ ] Redis pub/sub
- [ ] Redis streams
- [ ] Redis sorted sets
- [ ] Leaderboards
- [ ] Session storage
- [ ] Distributed counters
- [ ] 🆕 Cache stampede prevention (locking, jittered TTL, early refresh)
- [ ] 🆕 Unique visitor counting with HyperLogLog
- [ ] 🆕 "Nearby drivers" with geospatial indexes

## 14. Queues / asynchronous backend

- [ ] Build a job queue ⭐
- [ ] Delayed jobs
- [ ] Priority queue
- [ ] Retry failed jobs with exponential backoff
- [ ] Dead-letter queue
- [ ] Exactly-once discussion
- [ ] At-least-once processing
- [ ] Idempotent consumer
- [ ] Worker pool ⭐
- [ ] Job scheduler ⭐
- [ ] Cron scheduler
- [ ] Distributed scheduler
- [ ] Kafka producer
- [ ] Kafka consumer
- [ ] Consumer groups
- [ ] Partition assignment
- [ ] Offset management
- [ ] Message ordering
- [ ] Poison-message handling
- [ ] 🆕 Backpressure between producer and consumer

## 15. Backend concurrency

> Very high value for SDE-2.

- [ ] Concurrent counter
- [ ] Inventory decrement ⭐
- [ ] Flash-sale purchase
- [ ] Bank transfer
- [ ] Concurrent wallet transactions
- [ ] Seat reservation ⭐
- [ ] Ticket booking
- [ ] Auction bidding
- [ ] Race-safe coupon redemption
- [ ] Concurrent job execution
- [ ] Lease-based locking
- [ ] Atomic database update
- [ ] Compare-and-swap
- [ ] Exactly-once payment handling ⭐
- [ ] Duplicate webhook handling
- [ ] Concurrent file upload
- [ ] 🆕 Bounded producer–consumer buffer
- [ ] 🆕 Read–write lock
- [ ] 🆕 Semaphore / mutex from scratch

## 16. File / storage systems

> Real-world example: design versioned documents considering history lookup, diffing and disk efficiency — alongside the REST API.

- [ ] File upload API ⭐
- [ ] Multipart upload ⭐
- [ ] Resumable upload
- [ ] Upload progress
- [ ] File deduplication
- [ ] Content-addressed storage
- [ ] Image-processing pipeline
- [ ] Video-upload pipeline
- [ ] Object-storage abstraction
- [ ] Signed URLs
- [ ] Download service
- [ ] CDN integration
- [ ] File versioning
- [ ] Document version history
- [ ] Storage quota system
- [ ] 🆕 Stream-process a file larger than memory
- [ ] 🆕 Malware-scan stage in an upload pipeline

## 17. Real-time systems

- [ ] WebSocket server ⭐
- [ ] Chat server
- [ ] Group chat
- [ ] Presence system
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message delivery status
- [ ] Reconnection
- [ ] Heartbeats
- [ ] Notification delivery
- [ ] Live dashboard
- [ ] Live stock ticker
- [ ] Multiplayer game state
- [ ] Collaborative editing
- [ ] 🆕 SSE notification stream with resume (`Last-Event-ID`)
- [ ] 🆕 Scale WebSockets horizontally (sticky sessions + pub/sub fan-out)
- [ ] 🆕 CRDT vs OT for collaborative editing

---

# 🏗️ Full-stack & systems

## 18. Full-stack applications

- [ ] URL shortener ⭐
- [ ] Pastebin
- [ ] Todo application (full-stack, with API + DB)
- [ ] Blog
- [ ] Reddit clone
- [ ] Twitter / X clone
- [ ] Instagram feed
- [ ] Facebook feed
- [ ] LinkedIn feed
- [ ] YouTube
- [ ] Netflix
- [ ] Spotify
- [ ] Amazon
- [ ] E-commerce store ⭐
- [ ] Shopping cart (full-stack, persisted server-side)
- [ ] Checkout system
- [ ] Payment system ⭐
- [ ] Uber
- [ ] DoorDash
- [ ] Airbnb
- [ ] 🆕 Trello
- [ ] 🆕 Calendly
- [ ] 🆕 LeetCode clone (online judge with sandboxed code runner)

## 19. Serious full-stack systems

- [ ] Notification platform ⭐
- [ ] Email platform ⭐
- [ ] Push-notification platform
- [ ] Search engine
- [ ] Autocomplete service
- [ ] Analytics dashboard
- [ ] Feature-flag platform
- [ ] Webhook platform ⭐
- [ ] Payment gateway
- [ ] Subscription billing
- [ ] Invoice system
- [ ] Expense management
- [ ] Appointment booking
- [ ] Calendar system
- [ ] Meeting scheduler
- [ ] Ride matching
- [ ] Food delivery
- [ ] Hotel booking
- [ ] 🆕 Audit-log service
- [ ] 🆕 Public API platform with keys, quotas and usage billing

## 20. Distributed backend implementation

- [ ] Distributed cache
- [ ] Distributed rate limiter
- [ ] Distributed ID generator
- [ ] Snowflake-style ID generator
- [ ] Leader election
- [ ] Consistent hashing
- [ ] Service discovery
- [ ] Load balancer
- [ ] Reverse proxy
- [ ] API gateway
- [ ] Service-mesh concept
- [ ] Configuration service
- [ ] Distributed queue
- [ ] Distributed event bus
- [ ] 🆕 Gossip-based membership
- [ ] 🆕 Vector clocks / conflict detection
- [ ] 🆕 Two-phase commit vs saga
- [ ] 🆕 Simplified Raft log replication

## 21. Backend architecture

- [ ] Design a production REST API
- [ ] Monolith vs microservices
- [ ] Modular monolith
- [ ] Service boundaries
- [ ] Database-per-service
- [ ] Shared-database tradeoffs
- [ ] Synchronous vs asynchronous communication
- [ ] REST vs gRPC
- [ ] REST vs GraphQL
- [ ] Event-driven architecture
- [ ] CQRS
- [ ] Event sourcing
- [ ] Saga pattern
- [ ] Outbox pattern
- [ ] CDC
- [ ] BFF architecture
- [ ] Horizontal scaling
- [ ] Stateless services
- [ ] Graceful degradation
- [ ] 🆕 Multi-tenancy models (shared, schema-per-tenant, DB-per-tenant)
- [ ] 🆕 Strangler-fig migration off a legacy system
- [ ] 🆕 Multi-region active-active vs active-passive

## 22. Testing

- [ ] Unit-test a React component
- [ ] Unit-test a backend service
- [ ] API integration test
- [ ] Database integration test
- [ ] Contract testing
- [ ] Mock an external API
- [ ] Mock Redis
- [ ] Mock a queue
- [ ] End-to-end test
- [ ] Test WebSockets
- [ ] Test race conditions
- [ ] Test retries
- [ ] Test idempotency
- [ ] Test pagination
- [ ] Test authorization
- [ ] Test rate limiting
- [ ] Load testing
- [ ] Stress testing
- [ ] Failure testing
- [ ] Chaos testing
- [ ] 🆕 Accessibility testing (axe, keyboard-only pass)
- [ ] 🆕 Visual regression testing
- [ ] 🆕 Property-based testing
- [ ] 🆕 Testing timers and time-dependent code (fake clocks)

## 23. DevOps / production

- [ ] Dockerize the frontend
- [ ] Dockerize the backend
- [ ] Docker Compose full stack
- [ ] CI pipeline
- [ ] CD pipeline
- [ ] Environment management
- [ ] Blue-green deployment
- [ ] Canary deployment
- [ ] Rolling deployment
- [ ] Kubernetes deployment
- [ ] Horizontal pod autoscaling
- [ ] Logging pipeline
- [ ] Metrics
- [ ] Alerts
- [ ] Distributed tracing
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Incident debugging
- [ ] 🆕 Infrastructure as Code (Terraform)
- [ ] 🆕 Database backup and restore drill
- [ ] 🆕 Rollback strategy for a bad deploy + bad migration
- [ ] 🆕 Define SLIs, SLOs and error budgets

## 24. Frontend system design

- [ ] Design Google Search UI
- [ ] Design autocomplete
- [ ] Design Amazon frontend
- [ ] Design YouTube frontend
- [ ] Design Netflix frontend
- [ ] Design Twitter feed
- [ ] Design Facebook feed
- [ ] Design Instagram feed
- [ ] Design WhatsApp Web
- [ ] Design Slack Web
- [ ] Design Google Docs
- [ ] Design Google Sheets
- [ ] Design Gmail
- [ ] Design Google Maps UI
- [ ] Design Uber frontend
- [ ] Design Airbnb frontend
- [ ] Design a notification center
- [ ] Design a video player
- [ ] Design an image gallery
- [ ] Design a dashboard
- [ ] 🆕 Design Figma (canvas-based design tool)
- [ ] 🆕 Design a web code editor (VS Code for the web)
- [ ] 🆕 Design a checkout flow with payment retries

## 25. Advanced frontend systems

- [ ] Design frontend caching
- [ ] Design an offline application
- [ ] Design offline synchronization
- [ ] Design optimistic UI
- [ ] Design real-time collaboration
- [ ] Design collaborative cursors
- [ ] Design a virtualized feed
- [ ] Design a large data grid
- [ ] Design design-system architecture
- [ ] Design a component library
- [ ] Design micro-frontends
- [ ] Design a frontend monorepo
- [ ] Design SSR architecture
- [ ] Design streaming UI
- [ ] Design React Server Components architecture
- [ ] Design frontend observability
- [ ] Design feature flags
- [ ] Design A/B-testing infrastructure
- [ ] Design internationalization
- [ ] Design accessibility architecture
- [ ] 🆕 Design a PWA
- [ ] 🆕 Design frontend security (CSP, XSS, token storage)
- [ ] 🆕 Design client-side state management for a large app

## 26. Build it from scratch

- [ ] Build React
- [ ] Build a Virtual DOM ⭐
- [ ] Build reconciliation
- [ ] Build a Zustand-like store
- [ ] Build React Router
- [ ] Build an event emitter ⭐
- [ ] Build an observable
- [ ] Build a task scheduler
- [ ] Build a web framework
- [ ] Build Express-like middleware
- [ ] Build an HTTP router
- [ ] Build a logger
- [ ] Build a cache
- [ ] Build an LRU cache ⭐
- [ ] Build a TTL cache
- [ ] Build a queue
- [ ] 🆕 Build a template engine
- [ ] 🆕 Build a JSON parser
- [ ] 🆕 Build a test runner (`describe` / `it` / `expect`)
- [ ] 🆕 Build a mini bundler (dependency graph + module wrapper)
- [ ] 🆕 Build a key-value store with a write-ahead log
- [ ] 🆕 Build a mini GraphQL executor

---

## ⭐ 27. The Highest-Value 100

If the goal is FAANG SDE-2, don't treat everything equally. Start here.

<details open>
<summary><b>Frontend (20)</b></summary>

| # | Problem | # | Problem |
|---|---|---|---|
| 1 | Autocomplete | 11 | File upload |
| 2 | Infinite scroll | 12 | Multi-step form |
| 3 | Pagination | 13 | Nested comments |
| 4 | Data table | 14 | Recursive checkbox |
| 5 | Virtualized list | 15 | Tree explorer |
| 6 | Modal | 16 | Kanban |
| 7 | Toast | 17 | Calendar |
| 8 | Tabs | 18 | Chat |
| 9 | Accordion | 19 | Command palette |
| 10 | Carousel | 20 | Shopping cart |

</details>

<details open>
<summary><b>JavaScript (21)</b></summary>

| # | Problem | # | Problem |
|---|---|---|---|
| 21 | `map` | 32 | `Promise.race` |
| 22 | `reduce` | 33 | retry |
| 23 | `flat` | 34 | concurrency limiter |
| 24 | `groupBy` | 35 | event emitter |
| 25 | deep clone | 36 | pub/sub |
| 26 | deep equal | 37 | task queue |
| 27 | debounce | 38 | virtual DOM |
| 28 | throttle | 39 | event loop |
| 29 | curry | 40 | async output questions |
| 30 | memoization | 41 | 🆕 `JSON.stringify` |
| 31 | `Promise.all` | | |

</details>

<details open>
<summary><b>Backend & full-stack (31)</b></summary>

| # | Problem | # | Problem |
|---|---|---|---|
| 42 | CRUD API | 58 | Webhooks |
| 43 | Authentication | 59 | WebSocket |
| 44 | RBAC | 60 | File upload |
| 45 | Pagination | 61 | Multipart upload |
| 46 | Cursor pagination | 62 | Distributed lock |
| 47 | Search | 63 | Seat reservation |
| 48 | Rate limiter | 64 | Inventory |
| 49 | Cache | 65 | Payment |
| 50 | LRU cache | 66 | Notification |
| 51 | Idempotency | 67 | Email |
| 52 | Retry | 68 | URL shortener |
| 53 | Circuit breaker | 69 | Feed |
| 54 | Job queue | 70 | Chat |
| 55 | Worker pool | 71 | E-commerce |
| 56 | Scheduler | 72 | 🆕 Bank transfer |
| 57 | 🆕 Outbox pattern | | |

</details>

<details open>
<summary><b>🆕 Rounding out to 100 (28)</b></summary>

| # | Problem | # | Problem |
|---|---|---|---|
| 73 | Accessible modal with focus trap | 87 | Fix stale closures |
| 74 | Event delegation | 88 | Optimistic updates |
| 75 | Promise from scratch | 89 | WebSocket reconnection + heartbeat |
| 76 | `bind` / `call` / `apply` | 90 | Auth-token refresh interceptor |
| 77 | Predict `this` output | 91 | Token bucket + sliding window |
| 78 | Custom hooks: `useDebounce`, `useFetch` | 92 | Graceful shutdown |
| 79 | Redux-like store | 93 | JWT + refresh-token rotation |
| 80 | Optimize a 100k-row table | 94 | Window functions |
| 81 | Design autocomplete (FE system design) | 95 | Transactions & isolation levels |
| 82 | Design news feed (FE system design) | 96 | Fix an N+1 query |
| 83 | Design Google Docs (FE system design) | 97 | Cache-aside + invalidation |
| 84 | Consistent hashing | 98 | Dead-letter queue + idempotent consumer |
| 85 | Snowflake ID generator | 99 | Saga pattern |
| 86 | Test race conditions | 100 | Docker Compose full stack + CI |

</details>

---

## 🆕 28. Debugging & incident drills

Senior interviews increasingly include "here's a broken system, fix it." Practice with intentionally broken code.

- [ ] A React list re-renders 1,000 items on every keystroke — find and fix it
- [ ] A `useEffect` fetch shows stale data after fast navigation (race condition)
- [ ] Memory grows steadily in a long-lived SPA — find the leak
- [ ] An API endpoint got 10× slower after a deploy — find the cause
- [ ] Duplicate orders appear when users double-click "Pay"
- [ ] A Node.js service blocks the event loop under load
- [ ] Intermittent 502s behind a load balancer (keep-alive / timeout mismatch)
- [ ] A cron job runs twice when scaled to two instances
- [ ] Cache returns another user's data
- [ ] Database connection pool exhaustion during traffic spikes
- [ ] Timezone bug: events show on the wrong day for some users
- [ ] A queue consumer is stuck on one message forever

## 🆕 29. Code review drills

Review a PR as if you were the senior on the team. Write the comments you'd leave.

- [ ] Review a React component with prop drilling, missing keys and effect bugs
- [ ] Review an Express handler with no validation and SQL built by string concatenation
- [ ] Review a "retry everything forever" HTTP client
- [ ] Review a schema migration that locks a large table
- [ ] Review an auth middleware that trusts client-supplied roles
- [ ] Review a PR that adds caching without an invalidation strategy

## 🆕 30. SDE-2 behavioral prompts

Prepare a STAR story for each. Senior loops weigh these heavily.

- [ ] A project you led end-to-end — scope, tradeoffs, outcome
- [ ] A time you disagreed with a technical decision
- [ ] A production incident you owned
- [ ] A time you mentored or unblocked another engineer
- [ ] A time you cut scope to hit a deadline
- [ ] A decision you made with incomplete data
- [ ] A time you improved a process or developer experience for the team
- [ ] Your biggest technical mistake and what changed afterward
- [ ] A time you pushed back on a product requirement
- [ ] How you handled competing priorities across teams

---

## 🗓️ 12-week study plan

Roughly 150–200 problems as the core curriculum; everything else is variation drills.

| Weeks | Focus | Sections |
|---|---|---|
| 1–2 | JavaScript foundations & async | 3, 4, 26 (event emitter, Promise) |
| 3–4 | React machine coding (basic → intermediate) | 1, 2, 5, 6 |
| 5 | Advanced React + performance + networking | 5 (advanced), 7, 8 |
| 6–7 | Backend APIs, auth, databases | 9, 11, 12 |
| 8 | Production patterns, Redis, queues | 10, 13, 14 |
| 9 | Concurrency, files, real-time | 15, 16, 17 |
| 10 | Full-stack builds + testing | 18, 22, 23 |
| 11 | System design (frontend + backend + distributed) | 19, 20, 21, 24, 25 |
| 12 | Mock interviews, debugging, behavioral, re-do weak problems | 27, 28, 29, 30 |

---

## 📈 Progress tracker

Generated by the tracker — don't edit by hand. The full attempt history is in [PROGRESS.md](PROGRESS.md).

<!-- progress:start -->

| Area | Total | Started | Attempt 1 | Attempt 2 | Mastered | Progress |
|---|---|---|---|---|---|---|
| JavaScript (3, 4, 26) | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| Frontend (1, 2, 5–8) | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| Backend (9–17) | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| Full-stack & systems (18–25) | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| Drills & behavioral (28–30) | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| ⭐ Starred questions | 0 | 0 | 0 | 0 | 0 | ░░░░░░░░░░ 0% |
| **Total** | **0** | **0** | **0** | **0** | **0** | ░░░░░░░░░░ 0% |

_Last synced 2026-10-08 by `npm run sync`._

<!-- progress:end -->

---

## 🔗 Resources

Public collections this bank draws on (add links in your fork):

- **Frontend Interview Questions handbook** — machine coding, JS, React, performance, system design, DSA
- **React Machine Coding Challenges** — the classic React UI problem set
- **Backend Interview Questions** — Node.js, APIs, databases, Redis, queues, security, scaling
- **Machine Coding + LLD Problems** — concurrency, inventory, seat allocation, scheduling, rate limiting
- **Real company take-homes** — e.g. Barstool Sports' backend challenge and Reedsy's Node.js challenge

---

## 🤝 Contributing

Want to add a question? Open a PR that:

1. Adds it to the right section (avoid duplicates — search first).
2. Marks it 🆕 if it's new.
3. Optionally adds a problem folder with `README.md` (statement, requirements, follow-ups) and tests.

---

> **The point isn't collecting GitHub stars or folders. It's being able to open a blank editor and ship a working, tested system — then explain why you built it that way.**

⭐ Star the repo if it helps, and happy grinding!
