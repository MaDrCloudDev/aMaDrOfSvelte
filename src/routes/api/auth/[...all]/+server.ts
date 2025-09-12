import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET = auth.handler;
export const POST = auth.handler;
