import type { PageServerLoad } from "./$types";
import { createClient } from "#lib/prismicio.ts";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getByUID("blog_post", params.uid);

	return { page };
};