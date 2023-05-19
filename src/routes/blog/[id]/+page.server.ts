import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
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
