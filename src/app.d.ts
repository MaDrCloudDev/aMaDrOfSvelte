<<<<<<< Updated upstream
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
=======
import type { User, Session } from '$lib/server/auth';

>>>>>>> Stashed changes
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				email: string;
			} | null;
			session: {
				id: string;
				expiresAt: Date;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
