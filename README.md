# aMaDrOfSvelte
## TODO: I'm probably going to switch over to [Better Auth](https://github.com/better-auth/better-auth) in the near future

## What you get

- 🔐 **Auth that actually works** - Proper password hashing, sessions that don't randomly break
- ⚡ **SvelteKit 5** - The new runes system is pretty sweet
- 🎨 **shadcn-svelte** - UI components that don't suck
- 🎯 **Tailwind CSS 4** - Because utility classes are the way
- 🗄️ **Drizzle ORM** - Database queries that won't explode at runtime
- 🚀 **Turso Database** - SQLite but fast everywhere
- 📱 **Actually responsive** - Works on phones, tablets, and those weird ultrawide monitors
- 🛠️ **TypeScript everywhere** - Catch bugs before your users do

## What's under the hood

- **Frontend**: SvelteKit 5, Tailwind CSS 4, shadcn-svelte
- **Backend**: SvelteKit server stuff (it's all one thing, which is nice)
- **Database**: Turso + Drizzle (SQLite but better)
- **Auth**: Built from scratch with Argon2 (no weird dependencies)
- **Deploy**: Works on Vercel, Netlify, or wherever you want to put it

## Getting started

1. **Clone it and install stuff**

   ```bash
   git clone <your-repo>
   cd amadrofsvelte
   npm install
   ```

2. **Set up Turso (it's free)**

   ```bash
   # Get the Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash

   # Make a database
   turso db create your-app-name

   # Grab your credentials
   turso db show your-app-name
   turso db tokens create your-app-name
   ```

3. **Add your database info**

   Copy `.env.example` to `.env` and fill in your Turso stuff:

   ```env
   DATABASE_URL="libsql://your-db-name.turso.io"
   DATABASE_AUTH_TOKEN="your-auth-token"
   ```

4. **Set up the database tables**

   ```bash
   npm run db:push
   ```

5. **Fire it up**
   ```bash
   npm run dev
   ```

## Database Commands

- `npm run db:generate` - Generate migration files
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components
│   ├── server/
│   │   ├── auth.ts        # Authentication utilities
│   │   └── db/            # Database configuration and schema
│   └── utils.ts           # Utility functions
├── routes/
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── dashboard/         # Protected dashboard
│   └── logout/            # Logout handler
└── hooks.server.ts        # Server-side hooks for auth
```

## How the auth works

1. **Sign up**: User picks email/password, password gets hashed properly
2. **Sign in**: Check the hash, create a session if it matches
3. **Stay logged in**: Session gets stored in the database and a cookie
4. **Protected stuff**: Server hooks check if you're allowed to see things
5. **Sign out**: Delete the session, clear the cookie, done

## Customization

### Adding New UI Components

```bash
npx shadcn-svelte@latest add [component-name]
```

### Database Schema Changes

1. Update `src/lib/server/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Push changes: `npm run db:push`

### Styling

- Modify `src/app.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use shadcn-svelte components for consistent UI

## Deployment

### Vercel

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `build` directory
3. Ensure environment variables are set

## Security stuff I didn't skip

- Passwords hashed with Argon2 (the good one)
- Sessions handled properly (no localStorage nonsense)
- CSRF protection built into SvelteKit
- HTTP-only cookies (can't be stolen by XSS)
- Input validation that actually works

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this template for your projects!
