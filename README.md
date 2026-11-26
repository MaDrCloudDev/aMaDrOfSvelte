<div align="center">

<img src="static/madr-logo.png" alt="" width="88" height="88" />

# aMaDrOfSvelte

**A small, decisive full-stack SvelteKit starter.**
GitHub sign-in, a typed database and a component kit, already wired together.

[Live demo](https://amadrofsvelte.madr.io) · [Quick start](#quick-start) · [Deploy](#deploy)

![SvelteKit 3](https://img.shields.io/badge/SvelteKit-3-ff3e00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5_runes-ff3e00?logo=svelte&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

</div>

> [!NOTE]
> **This repository is archived.** It's finished and frozen, not abandoned. It was last updated in
> November 2026 to SvelteKit 3, Vite 8 and current versions of everything else, with CI green.
> Fork it or click **Use this template**. Issues and PRs are closed.

## What you get

|                |                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Auth**       | [Better Auth](https://better-auth.com) with GitHub OAuth, cookie sessions, server-side route guards                |
| **Database**   | [Drizzle ORM](https://orm.drizzle.team) on libSQL: a local SQLite file in dev, [Turso](https://turso.tech) in prod |
| **UI**         | Tailwind CSS 4 + [shadcn-svelte](https://shadcn-svelte.com), light/dark mode without a flash                       |
| **Framework**  | SvelteKit 3, Svelte 5 runes, TypeScript 6, env vars validated at startup                                           |
| **Offline**    | Native SvelteKit service worker + installable PWA manifest                                                         |
| **Accessible** | WCAG AA colour contrast in both themes, skip link, visible focus, reduced motion, axe-clean pages                  |
| **Tooling**    | Bun, Vitest + Testing Library, ESLint, Prettier, GitHub Actions CI                                                 |
| **Deploy**     | Vercel adapter out of the box; swap one line for Node, Cloudflare or Netlify                                       |

Pages: a landing page, `/auth` (sign-in with friendly OAuth errors), `/dashboard` (protected, with
live Drizzle queries), `/components` (playground) and `/about`.

## Quick start

You need [Bun](https://bun.sh) 1.4+ and Node 22.17+.

```bash
bunx degit MaDrCloudDev/aMaDrOfSvelte my-app   # or "Use this template" on GitHub
cd my-app
bun install
cp .env.example .env
```

Fill in `.env`:

1. **`BETTER_AUTH_SECRET`**: run `openssl rand -base64 32`.
2. **`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`**: [create a GitHub OAuth app](https://github.com/settings/developers)
   with homepage `http://localhost:5173` and callback
   `http://localhost:5173/api/auth/callback/github`.
3. **`DATABASE_URL`**: leave it as `file:local.db` to start. No account needed.

Then:

```bash
bun run db:migrate   # create the tables
bun run dev          # http://localhost:5173
```

Every variable is declared in [`src/env.ts`](src/env.ts). If one is missing or invalid, the dev
server and the build stop with a message saying which one.

## Deploy

**Vercel (default):** import the repo, add the env vars from `.env.example`, and deploy. For the
database, create a [Turso](https://turso.tech) database and set `DATABASE_URL=libsql://…` and
`DATABASE_AUTH_TOKEN`. Then run `bun run db:migrate` against it once. Set `BETTER_AUTH_URL` to
your production URL, and add a second GitHub OAuth app (or callback) for that domain.

**Elsewhere:** replace `@sveltejs/adapter-vercel` in [`vite.config.ts`](vite.config.ts) with any
[SvelteKit adapter](https://svelte.dev/docs/kit/adapters).

## Scripts

| Command               | Does                                                         |
| --------------------- | ------------------------------------------------------------ |
| `bun run dev`         | Dev server                                                   |
| `bun run build`       | Production build (`bun run preview` to serve it)             |
| `bun run validate`    | Typecheck, lint, test and build: everything CI runs          |
| `bun run check`       | `svelte-check` type checking                                 |
| `bun run lint`        | Prettier + ESLint (`bun run format` to fix formatting)       |
| `bun run test`        | Vitest in watch mode (`test:run` once, `test:ui` for the UI) |
| `bun run db:generate` | Create a migration from changes to `schema.ts`               |
| `bun run db:migrate`  | Apply migrations                                             |
| `bun run db:push`     | Sync the schema directly (quick local iteration)             |
| `bun run db:studio`   | Open Drizzle Studio                                          |

## Project layout

```text
src/
├─ env.ts                    # every env var, validated at startup
├─ hooks.server.ts           # Better Auth at /api/auth/*, session → locals
├─ service-worker/           # offline app shell
├─ lib/
│  ├─ auth-client.ts         # browser auth client
│  ├─ auth-utils.ts          # sign-in / sign-out with toasts
│  ├─ constants.ts           # routes, URLs, app name
│  ├─ components/            # Navbar, DarkModeToggle, icons
│  │  └─ ui/                 # shadcn-svelte primitives
│  └─ server/
│     ├─ auth.ts             # Better Auth config
│     └─ db/                 # Drizzle client + schema
└─ routes/
   ├─ +page.svelte           # landing (signed-in users go to /dashboard)
   ├─ auth/                  # sign-in page
   ├─ dashboard/             # protected; real DB queries in +page.server.ts
   ├─ components/            # component playground
   └─ about/
drizzle/                     # SQL migrations
tests/                       # Vitest
```

## Extending it

- **Another OAuth provider:** add it under `socialProviders` in `src/lib/server/auth.ts`, and
  declare its env vars in `src/env.ts`.
- **A protected page:** in its `+page.server.ts`, `if (!locals.user) redirect(303, '/')`.
- **A table:** add it to `src/lib/server/db/schema.ts`, then `bun run db:generate && bun run db:migrate`.
- **A UI primitive:** `bunx shadcn-svelte@latest add <component>`.

## SvelteKit 3 notes

Kit 3 is still new, and most tutorials (and a lot of muscle memory) are for v2. Things that differ
here:

- There's no `svelte.config.js`. Kit options go in `sveltekit({...})` in `vite.config.ts`.
- `$lib` is now `#lib`, with file extensions: `import { cn } from '#lib/utils.ts'`.
- Env vars are declared in `src/env.ts` and imported from `$app/env/private` or
  `$app/env/public`. `$env/*` is gone.
- `$app/environment` is now `$app/env`, and `$app/stores` is gone (use `$app/state`).
  `invalidateAll` is now `refreshAll`.
- Internal links and `goto()` targets go through `resolve()` from `$app/paths` (ESLint checks
  this). External links get `rel="external"`.

Full list: [migrating to SvelteKit 3](https://svelte.dev/docs/kit/migrating-to-sveltekit-3).

## License

[MIT](LICENSE.md) © MaDr
