import type { PageServerLoad } from "./$types";
import { createClient } from "#lib/prismicio.ts";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const news = await client.getAllByType("news");

	return { news };
};
