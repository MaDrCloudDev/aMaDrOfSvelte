# aMaDrOfSvelte

Production-oriented SvelteKit starter with a real auth/data/UI baseline:

- SvelteKit 2 + Svelte 5 (runes)
- Better Auth (GitHub OAuth)
- Drizzle ORM + Turso/libSQL
- Tailwind CSS 4 + shadcn-svelte
- Vite PWA (Workbox)
- Bun-first scripts for check/lint/test/build

## Why this template

This repo is meant to remove setup churn for full-stack SvelteKit projects. It ships with auth wiring, typed DB access, reusable UI primitives, and route protection already integrated.

## Included stack

- Framework: `@sveltejs/kit`, `svelte`, `typescript`
- Auth: `better-auth` + `better-auth/svelte-kit`
- DB: `drizzle-orm`, `drizzle-kit`, `@libsql/client` (Turso/libSQL)
- UI: `tailwindcss@4`, `tailwind-variants`, `bits-ui`, shadcn-svelte-style components
- PWA: `vite-plugin-pwa`, `workbox-window`
- Testing: `vitest`, `@testing-library/svelte`
- Adapter: `@sveltejs/adapter-vercel` (Node 20 runtime)

## Quick start

1. Install dependencies:

```bash
bun install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Set required env vars in `.env`:

```env
DATABASE_URL="libsql://<your-db>.turso.io"
DATABASE_AUTH_TOKEN="<your-turso-token>"
BETTER_AUTH_SECRET="<long-random-secret>"
BETTER_AUTH_URL="http://localhost:5173"
GITHUB_CLIENT_ID="<github-client-id>"
GITHUB_CLIENT_SECRET="<github-client-secret>"
```

4. Run DB schema push:

```bash
bun run db:push
```

5. Start dev server:

```bash
bun run dev
```

## GitHub OAuth setup

Create a GitHub OAuth app with:

- Homepage URL: `http://localhost:5173`
- Callback URL: `http://localhost:5173/api/auth/callback/github`

Use the generated client ID/secret in `.env`.

## Scripts

- `bun run dev` - start dev server
- `bun run build` - production build
- `bun run preview` - preview production build
- `bun run check` - Svelte + TypeScript checks
- `bun run lint` - Prettier check
- `bun run format` - Prettier write
- `bun run test:run` - run Vitest once
- `bun run db:generate` - generate Drizzle migration
- `bun run db:push` - push schema to DB
- `bun run db:migrate` - apply migrations
- `bun run db:studio` - open Drizzle Studio

## Project layout

```text
src/
  hooks.server.ts                 # session hydration into locals
  pwa.ts                          # service worker registration helpers
  lib/
    auth-client.ts                # Better Auth client
    auth-utils.ts                 # shared client auth actions
    constants.ts                  # route + external constants
    server/
      auth.ts                     # Better Auth config (GitHub provider)
      db/
        index.ts                  # DB client
        schema.ts                 # Drizzle schema
    components/
      Navbar.svelte               # responsive nav + auth actions
      PWAInstallPrompt.svelte
      ui/                         # reusable UI primitives
  routes/
    +layout.svelte                # global shell
    +layout.server.ts             # pass user to layout
    +page.svelte                  # signed-out landing
    +page.server.ts               # redirect logged-in users to dashboard
    auth/+page.svelte             # dedicated sign-in page
    dashboard/+page.svelte        # protected dashboard
    components/+page.svelte       # organized UI playground
    about/+page.svelte            # architecture/stack page
    api/auth/[...all]/+server.ts  # Better Auth endpoint
```

## Auth and route protection

- `src/hooks.server.ts` resolves session/user and sets `event.locals`.
- `src/routes/dashboard/+page.server.ts` redirects to `/` when unauthenticated.
- `src/routes/+page.server.ts` redirects authenticated users to `/dashboard`.
- UI actions call helpers in `src/lib/auth-utils.ts`.

## Validation before commit

```bash
bun run check
bun run lint
bun run test:run
bun run build
```

## Deployment note

`adapter-vercel` is configured in `svelte.config.js` with `nodejs20.x` runtime.
