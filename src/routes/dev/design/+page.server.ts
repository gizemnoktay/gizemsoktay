import { error } from '@sveltejs/kit';

export const prerender = false;

export function load() {
	if (!import.meta.env.DEV) {
		throw error(404, 'Not found');
	}
	return {};
}
