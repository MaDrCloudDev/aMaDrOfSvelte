# aMaDrOfSvelte - AI Agent Context

This document provides AI agents with comprehensive information about the aMaDrOfSvelte application structure, patterns, and implementation details.

## Application Overview

**aMaDrOfSvelte** is a production-ready SvelteKit template featuring modern authentication, database integration, UI components, and PWA support. It demonstrates current best practices for Svelte 5 and SvelteKit applications.

### Core Technology Stack

- **SvelteKit 2.22.0** - Full-stack framework with file-based routing
- **Svelte 5.0.0** - Frontend framework with modern runes syntax
- **Tailwind CSS 4.0.0** - Utility-first CSS with native CSS support
- **Better Auth 1.3.9** - Authentication library with OAuth providers
- **Drizzle ORM 0.40.0** - Type-safe database queries
- **Turso** - SQLite edge database with global distribution
- **TypeScript 5.0.0** - Full type safety throughout the application
- **Workbox 7.0.0** - Service worker and PWA functionality

## Architecture Patterns

### 1. Svelte 5 Runes (CRITICAL)

This application uses **Svelte 5 runes syntax** exclusively. Never use legacy Svelte patterns:

#### ✅ Current Patterns (Use These)

```javascript
// State management
let count = $state(0);
let user = $state({ name: '', email: '' });

// Props
let { data, title = 'Default' } = $props();

// Derived state
let doubled = $derived(count * 2);
let isEmpty = $derived(items.length === 0);

// Effects
$effect(() => {
  console.log('Count changed:', count);
});

// Component children
{@render children?.()}
```

#### ❌ Legacy Patterns (Do Not Use)

```javascript
// DON'T use these legacy patterns:
export let data; // Use $props() instead
let doubled; // Use $derived() instead
$: doubled = count * 2; // Use $derived() instead
$: console.log(count); // Use $effect() instead
<slot />; // Use {@render children?.()} instead
```

### 2. Authentication Flow

**Better Auth** handles all authentication:

- **Entry Point**: `/src/lib/server/auth.ts` - Server configuration
- **Client Helpers**: `/src/lib/auth-client.ts` - Client-side auth functions
- **Server Hooks**: `/src/hooks.server.ts` - Session handling
- **Route Protection**: Server-side in `+page.server.ts` files

#### Authentication Pattern:

```javascript
// In +page.server.ts (protected routes)
import { auth } from '$lib/server/auth';

export async function load({ request }) {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		redirect(302, '/auth');
	}
	return { user: session.user };
}
```

### 3. Database Schema & Queries

**Drizzle ORM** with **Turso SQLite**:

- **Schema**: `/src/lib/server/db/schema.ts`
- **Database Instance**: `/src/lib/server/db/index.ts`
- **Queries**: Type-safe with autocomplete

#### Database Pattern:

```javascript
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Type-safe queries
const user = await db.select().from(users).where(eq(users.id, userId));
```

### 4. Progressive Web App

**PWA functionality** with **Workbox**:

- **Service Worker**: `/src/pwa.ts` - Registration and management
- **Install Prompt**: `/src/lib/components/PWAInstallPrompt.svelte` - Native install UI
- **Manifest**: `/static/manifest.json` - App metadata and icons
- **Offline Support**: Workbox caching for static assets

#### PWA Pattern:

```javascript
// Initialize PWA in app
import { initPWA } from '$lib/pwa';
initPWA();

// Install prompt component usage
<PWAInstallPrompt />;
```

### 5. UI Component System

**shadcn-svelte** components with **Tailwind CSS 4**:

- **Base Components**: `/src/lib/components/ui/`
- **Custom Components**: `/src/lib/components/`
- **Styling**: Tailwind utilities with CSS custom properties

#### Component Pattern:

```javascript
// Component props with Svelte 5
let { variant = 'default', size = 'md', children, ...props } = $props();

// Component with proper typing
<button class={cn(buttonVariants({ variant, size }))} {...props}>
  {@render children?.()}
</button>
```

## File Structure & Conventions

### Route Structure

```
src/routes/
├── +layout.svelte          # Root layout with navigation
├── +layout.server.ts       # Global server data loading
├── +page.svelte           # Homepage
├── about/+page.svelte     # About page
├── auth/                  # Authentication pages
│   ├── +page.svelte      # Sign-in form
│   └── +page.server.ts   # Auth redirects
├── dashboard/             # Protected area
│   ├── +page.svelte      # Dashboard UI
│   └── +page.server.ts   # User session loading
├── components/+page.svelte # Component showcase
└── api/auth/[...all]/+server.ts # Better Auth API endpoints
```

### Component Organization

```
src/lib/components/
├── ui/                    # shadcn-svelte base components
│   ├── button/           # Button variants
│   ├── card/             # Card components
│   ├── input/            # Form inputs
│   └── ...
├── Navbar.svelte         # Main navigation
├── DarkModeToggle.svelte # Theme switcher
└── PWAInstallPrompt.svelte # PWA install prompt
```

### Server Code

```
src/lib/server/
├── auth.ts               # Better Auth configuration
└── db/
    ├── index.ts         # Database connection
    └── schema.ts        # Drizzle schema definitions
```

## Key Implementation Details

### 1. Environment Configuration

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="libsql://[your-turso-url]"
DATABASE_AUTH_TOKEN="[your-turso-token]"

# Authentication
BETTER_AUTH_SECRET="[32+ character secret]"
BETTER_AUTH_URL="http://localhost:5173"

# GitHub OAuth
GITHUB_CLIENT_ID="[your-github-client-id]"
GITHUB_CLIENT_SECRET="[your-github-client-secret]"
```

### 2. Dark Mode Implementation

Uses CSS custom properties with `localStorage` persistence:

- **Toggle**: `/src/lib/components/DarkModeToggle.svelte`
- **CSS Variables**: `/src/app.css`
- **Classes**: `dark` class on `<html>` element

### 3. Type Safety

Full TypeScript integration:

- **Generated Types**: `./$types` imports for route data
- **Database Types**: Generated from Drizzle schema
- **Component Props**: Explicit prop typing with `$props()`

### 4. Build & Development

Available scripts:

```bash
bun run dev          # Development server
bun run build        # Production build
bun run check        # TypeScript validation
bun run format       # Prettier formatting
bun run db:generate  # Generate migrations
bun run db:push      # Apply schema changes
bun run db:studio    # Database UI
```

## Common Patterns & Best Practices

### 1. Page Data Loading

```javascript
// +page.server.ts
export async function load({ locals }) {
	const session = await auth.api.getSession({ headers: locals });
	return {
		user: session?.user,
		someData: await fetchSomeData()
	};
}

// +page.svelte
let { data } = $props();
// data.user and data.someData are available
```

### 2. Form Handling

```javascript
// Svelte 5 form pattern
let formData = $state({ email: '', password: '' });
let loading = $state(false);
let error = $state('');

async function handleSubmit() {
	if (loading) return;
	loading = true;
	error = '';

	try {
		await signIn.email({
			email: formData.email,
			password: formData.password
		});
	} catch (err) {
		error = err.message;
	} finally {
		loading = false;
	}
}
```

### 3. Component Composition

```javascript
// Parent component
<Card>
	<CardHeader>
		<CardTitle>Title</CardTitle>
		<CardDescription>Description</CardDescription>
	</CardHeader>
	<CardContent>
		<Button onclick={handleClick}>Action</Button>
	</CardContent>
</Card>
```

### 4. PWA Integration

```javascript
// App initialization with PWA
import { initPWA } from '$lib/pwa';
import { onMount } from 'svelte';

onMount(() => {
	initPWA();
});

// Install prompt component
<PWAInstallPrompt />;
```

### 5. Responsive Design

Uses Tailwind's mobile-first approach:

```html
<!-- Mobile-first responsive classes -->
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
	<!-- Responsive grid -->
</div>

<button class="w-full sm:w-auto">
	<!-- Full width on mobile, auto on larger screens -->
</button>
```

## Development Guidelines for AI Agents

### 1. Code Style

- **No comments** unless explaining complex logic
- **Concise variable names** that are self-explanatory
- **Consistent formatting** with Prettier
- **TypeScript strict mode** enabled

### 2. When Adding Features

1. Use existing patterns and components
2. Follow the established file structure
3. Implement proper error handling
4. Add TypeScript types
5. Test with `bun run check` and `bun run build`

### 3. Database Changes

1. Update schema in `/src/lib/server/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply changes: `bun run db:push`
4. Update TypeScript types as needed

### 4. Authentication Extensions

- New providers: Update `/src/lib/server/auth.ts`
- Protected routes: Add session check in `+page.server.ts`
- Client-side auth: Use helpers from `/src/lib/auth-client.ts`

## Error Handling Patterns

### 1. Server Errors

```javascript
// +page.server.ts
export async function load({ request }) {
	try {
		const data = await fetchData();
		return { data };
	} catch (error) {
		throw error(500, 'Failed to load data');
	}
}
```

### 2. Client Errors

```javascript
// Component error handling
let error = $state('');

async function handleAction() {
	try {
		await performAction();
	} catch (err) {
		error = err.message || 'Something went wrong';
	}
}
```

## Testing Approach

- **Unit Tests**: `/tests/lib/` for utility functions
- **Component Tests**: `/tests/components/` for UI components
- **PWA Tests**: Service worker and manifest validation
- **Setup**: Uses Vitest with custom test setup in `/src/test-setup.ts`

## Performance Considerations

1. **Code Splitting**: Automatic with SvelteKit
2. **CSS Optimization**: Tailwind purging enabled
3. **Database**: Connection pooling with Turso
4. **Images**: Static assets in `/static/`
5. **Caching**: Browser caching for static assets
6. **PWA Caching**: Workbox service worker for offline support

## Deployment

Configured for **Vercel** by default:

- Uses `@sveltejs/adapter-auto`
- Environment variables set in Vercel dashboard
- Production builds automatically optimized

---

This codebase follows modern web development best practices and is fully production-ready with PWA capabilities. When making changes, always maintain the established patterns and run the verification commands to ensure everything works correctly.
