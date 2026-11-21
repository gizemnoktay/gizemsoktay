import type { EntryGenerator, PageServerLoad } from './$types';
import { createClient } from '#lib/prismicio.ts';
import { error } from '@sveltejs/kit';

export const entries: EntryGenerator = async () => {
	const client = createClient();
	const pages = await client.getAllByType('news');
	return pages.map((page) => ({ uid: page.uid }));
};

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	try {
		const page = await client.getByUID('news', params.uid);
		return { page };
	} catch {
		throw error(404, 'News not found');
	}
};
