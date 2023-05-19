import { prisma } from '$lib/server/prisma';
import { parse } from 'path';

export async function load({ params }) {
	return {
		id: params.id,
		post: await prisma.blogpost.findUnique({
			where: {
				id: parseInt(params.id)
			}
		})
	};
}
