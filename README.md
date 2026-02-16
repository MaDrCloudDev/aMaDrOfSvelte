# aMaDrOfSvelte

Production-oriented SvelteKit starter for modern full-stack apps.

It ships with a concrete stack already wired together:

- SvelteKit 2 + Svelte 5 runes
- Better Auth (GitHub OAuth configured)
- Drizzle ORM + Turso/libSQL
- Tailwind CSS 4 + shadcn-svelte components
- PWA support via `vite-plugin-pwa` and Workbox
- TypeScript + Vitest

## Why this template exists

This repo is not a "blank" starter. It gives you a working baseline for the parts that usually take time to wire correctly:

- OAuth sign-in flow + server-side session hydration
- Protected routes and redirect behavior
- Typed database schema and migration setup
- Reusable UI primitives with dark mode support
- Build/deploy path for Vercel Node runtime

## Route overview

- `/`: landing page for signed-out users
- `/auth`: GitHub sign-in page
- `/dashboard`: authenticated page (server-protected)
- `/components`: categorized UI playground (`forms`, `feedback`, `layout`)
- `/about`: architecture and stack summary
- `/api/auth/[...all]`: Better Auth endpoints

## Project structure

```text
src/
├── app.css
├── hooks.server.ts
├── pwa.ts
├── lib/
│   ├── auth-client.ts
│   ├── auth-utils.ts
│   ├── constants.ts
│   ├── theme.ts
│   ├── components/
│   │   ├── Navbar.svelte
│   │   ├── DarkModeToggle.svelte
│   │   ├── PWAInstallPrompt.svelte
│   │   ├── icons/
│   │   └── ui/
│   └── server/
│       ├── auth.ts
│       └── db/
│           ├── index.ts
│           └── schema.ts
└── routes/
```

## Quick start

1. Install dependencies:

```bash
bun install
```

2. Copy env:

```bash
cp .env.example .env
```

3. Fill required env values:

```env
DATABASE_URL="libsql://<db-name>.turso.io"
DATABASE_AUTH_TOKEN="<turso-token>"
BETTER_AUTH_SECRET="<min-32-char-secret>"
BETTER_AUTH_URL="http://localhost:5173"
GITHUB_CLIENT_ID="<github-client-id>"
GITHUB_CLIENT_SECRET="<github-client-secret>"
NODE_ENV="development"
```

4. Apply schema:

```bash
bun run db:push
```

5. Start dev server:

```bash
bun run dev
```

## Scripts

- `bun run dev`: start local dev server
- `bun run build`: production build
- `bun run preview`: preview build locally
- `bun run check`: Svelte + TS checks
- `bun run lint`: Prettier check
- `bun run format`: Prettier write
- `bun run test:run`: run tests once
- `bun run db:generate`: generate migrations
- `bun run db:push`: push schema changes
- `bun run db:migrate`: run migrations
- `bun run db:studio`: open Drizzle Studio

## Notes on auth

- Auth provider configured by default: GitHub.
- Main auth config: `src/lib/server/auth.ts`.
- Session/user are attached to `locals` in `src/hooks.server.ts`.
- To add providers, extend `socialProviders` in `src/lib/server/auth.ts` and add env vars.

## Notes on components

The `/components` page is intentionally organized by usage pattern:

- `Forms`: input, textarea, select, switch, button composition
- `Feedback`: badge + alert state patterns
- `Layout`: card/separator/grid composition

Treat it as a reference surface for building real feature screens.

## Deployment

Configured for Vercel via `@sveltejs/adapter-vercel` in `svelte.config.js` with Node 20 runtime.

If you deploy elsewhere, swap adapter and keep auth URLs/callbacks aligned with your production domain.

## License

MIT (`LICENSE.md`).
