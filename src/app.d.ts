import type { User, Session } from '#lib/server/auth.ts';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export {};
