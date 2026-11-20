import type { EntryGenerator, PageServerLoad } from "./$types";
import { createClient } from "#lib/prismicio.ts";

export const entries: EntryGenerator = async () => {
	const client = createClient();
	const pages = await client.getAllByType("news");
	return pages.map((page) => ({ uid: page.uid }));
};

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getByUID("news", params.uid);

	return { page };
};