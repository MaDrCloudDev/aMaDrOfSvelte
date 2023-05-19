import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		id: params.id,
		project: await prisma.project.findUnique({
			where: {
				id: parseInt(params.id)
			}
		})
	};
}
