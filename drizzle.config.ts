import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set (see .env.example)');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	// handles both file: and libsql:// urls
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN || undefined
	},
	verbose: true,
	strict: true
});
