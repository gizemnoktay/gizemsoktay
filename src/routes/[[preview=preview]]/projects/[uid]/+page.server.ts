import type { EntryGenerator, PageServerLoad } from './$types';
import { createClient } from '#lib/prismicio.ts';
import { error } from '@sveltejs/kit';

export const entries: EntryGenerator = async () => {
	const client = createClient();
	const pages = await client.getAllByType('project');
	return pages.map((page) => ({ uid: page.uid }));
};

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const projects = await client.getAllByType('project');
	const page = projects.find((p) => p.uid === params.uid);
	if (!page) {
		throw error(404, 'Project not found');
	}
	return { page };
};
