# aMaDrOfSvelte

SvelteKit template with authentication, database, UI components, and PWA support.

## Features

- **SvelteKit** - Full-stack web framework with Svelte 5 runes
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn-svelte** - UI component library
- **Better Auth** - Authentication with GitHub OAuth
- **Drizzle ORM** - Type-safe database queries
- **Turso** - SQLite edge database
- **TypeScript** - Type safety throughout
- **PWA** - Progressive web app with offline support

## Tech Stack

| Technology                                                 | Purpose              | Version |
| ---------------------------------------------------------- | -------------------- | ------- |
| [SvelteKit](https://kit.svelte.dev/)                       | Full-stack framework | ^2.22.0 |
| [Svelte](https://svelte.dev/)                              | Frontend framework   | ^5.0.0  |
| [Tailwind CSS](https://tailwindcss.com/)                   | CSS framework        | ^4.0.0  |
| [shadcn-svelte](https://shadcn-svelte.com/)                | UI components        | bits-ui |
| [Better Auth](https://better-auth.com/)                    | Authentication       | ^1.3.9  |
| [Drizzle ORM](https://orm.drizzle.team/)                   | Database ORM         | ^0.40.0 |
| [Turso](https://turso.tech/)                               | SQLite database      | libSQL  |
| [TypeScript](https://www.typescriptlang.org/)              | Type safety          | ^5.0.0  |
| [Workbox](https://developers.google.com/web/tools/workbox) | PWA service worker   | ^7.0.0  |

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   └── ui/           # shadcn-svelte components
│   ├── server/
│   │   ├── auth.ts       # Better Auth configuration
│   │   └── db/           # Database setup and schema
│   ├── auth-client.ts    # Client-side auth helpers
│   ├── utils.ts          # Utility functions
│   └── pwa.ts            # PWA initialization
├── routes/
│   ├── api/
│   │   └── auth/         # Auth API endpoints
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Protected dashboard
│   └── +layout.svelte    # Root layout
└── app.css               # Global styles with Tailwind
```

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- A GitHub OAuth app
- A Turso database

### 1. Clone and Install

```bash
git clone <repository-url>
cd aMaDrOfSvelte
bun install  # or npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
# Database (Turso)
DATABASE_URL="libsql://your-database-name.turso.io"
DATABASE_AUTH_TOKEN="your-turso-auth-token"

# Authentication
BETTER_AUTH_SECRET="your-super-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:5173"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Environment
NODE_ENV="development"
```

### 3. Database Setup

Create and push your database schema:

```bash
bun run db:generate  # Generate migrations
bun run db:push      # Apply to database
```

Optional: Open Drizzle Studio to view your database:

```bash
bun run db:studio
```

### 4. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App with:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env` file

### 5. Start Development

```bash
bun run dev  # or npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app!

## Database Setup

### Using Turso (Recommended)

1. Install Turso CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

2. Create a database:

```bash
turso db create amadrofsvelte
```

3. Get your database URL and create a token:

```bash
turso db show amadrofsvelte  # Get the URL
turso db tokens create amadrofsvelte  # Create auth token
```

4. Add the URL and token to your `.env` file

### Alternative: Local SQLite

For local development, you can use a local SQLite file:

```env
DATABASE_URL="file:./local.db"
# Remove or leave empty: DATABASE_AUTH_TOKEN=""
```

## Authentication

Authentication flow:

1. **Public Pages** - Home page accessible to everyone
2. **Protected Routes** - Dashboard requires authentication
3. **Auth Redirect** - Unauthenticated users redirected to sign-in
4. **Session Management** - Persistent sessions with Better Auth
5. **Sign Out** - Clean session termination

### Adding More OAuth Providers

Better Auth supports many providers. To add more:

1. Update `src/lib/server/auth.ts`:

```typescript
socialProviders: {
  github: { /* existing config */ },
  google: {
    clientId: env.GOOGLE_CLIENT_ID || '',
    clientSecret: env.GOOGLE_CLIENT_SECRET || ''
  }
}
```

2. Add environment variables to `.env`
3. Update the sign-in UI in `/auth` page

## Progressive Web App

The template includes PWA functionality with:

- **Service Worker** - Workbox for caching and offline support
- **Web Manifest** - App metadata and icon configuration
- **Install Prompt** - Native install prompts for supported browsers
- **Offline Support** - Basic caching for static assets

### PWA Configuration

The PWA is configured through:

- `static/manifest.json` - App manifest with icons and metadata
- `src/pwa.ts` - Service worker registration and management
- `src/lib/components/PWAInstallPrompt.svelte` - Install prompt component

### Customizing PWA Settings

Update `static/manifest.json` for app metadata:

```json
{
	"name": "Your App Name",
	"short_name": "AppName",
	"description": "App description",
	"theme_color": "#your-color",
	"background_color": "#your-bg-color"
}
```

## UI Components

Included components:

- **Button** - Multiple variants and sizes
- **Card** - Content containers
- **Input** - Form inputs
- **Label** - Form labels
- **Alert** - Status messages
- **Badge** - Status indicators
- **Tabs** - Tabbed interfaces
- **Select** - Dropdown selections
- **Switch** - Toggle controls
- **Textarea** - Multi-line inputs
- **Separator** - Visual dividers
- **PWA Install Prompt** - Native app installation

### Adding More Components

Use the shadcn-svelte CLI or copy components manually:

```bash
npx shadcn-svelte add dialog
npx shadcn-svelte add toast
```

## Tailwind CSS 4

Features:

- **Vite Plugin**: No PostCSS configuration needed
- **OKLCH Colors**: Modern color space support
- **Custom Properties**: CSS custom properties for theming
- **Dark Mode**: Built-in dark mode support
- **Modern Features**: `@theme` directive and more

### Color System

Color system:

```css
:root {
	--color-background: oklch(1 0 0);
	--color-foreground: oklch(0.129 0.042 264.695);
	--color-primary: oklch(0.208 0.042 265.755);
	/* ... more colors */
}
```

## Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `bun run dev`         | Start development server     |
| `bun run build`       | Build for production         |
| `bun run preview`     | Preview production build     |
| `bun run check`       | Run type checking            |
| `bun run check:watch` | Type checking in watch mode  |
| `bun run format`      | Format code with Prettier    |
| `bun run lint`        | Check code formatting        |
| `bun run db:generate` | Generate database migrations |
| `bun run db:push`     | Push schema to database      |
| `bun run db:migrate`  | Run database migrations      |
| `bun run db:studio`   | Open Drizzle Studio          |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update `BETTER_AUTH_URL` to your production domain
5. Update GitHub OAuth callback URL

### Other Platforms

Works on any Node.js platform. Update the adapter in `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-node'; // or adapter-vercel, etc.
```

## Customization

### Changing the Theme

Modify colors in `src/app.css`:

```css
:root {
	--color-primary: oklch(0.5 0.2 250); /* Custom blue */
	/* Update other colors as needed */
}
```

### Adding Database Tables

1. Add tables to `src/lib/server/db/schema.ts`
2. Generate migrations: `bun run db:generate`
3. Apply changes: `bun run db:push`

### Custom Components

Create new components in `src/lib/components/`:

```svelte
<!-- src/lib/components/CustomButton.svelte -->
<script lang="ts">
	import { Button } from './ui/button';

	let { children, ...props } = $props();
</script>

<Button {...props}>
	{@render children?.()}
</Button>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `bun run check`
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for component design inspiration
- [Better Auth](https://better-auth.com/) for secure authentication
- [Drizzle](https://orm.drizzle.team/) for type-safe database queries
- [Turso](https://turso.tech/) for edge database hosting

## Documentation

- [SvelteKit](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Better Auth](https://better-auth.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)

---

Built for developers who want to ship fast.
