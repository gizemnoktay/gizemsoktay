import { repositoryName } from "#lib/prismicio.ts";

export const prerender = "auto";

export function load() {
	return { repositoryName };
}