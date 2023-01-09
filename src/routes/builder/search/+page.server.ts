import { error } from '@sveltejs/kit';
import { search } from '$lib/server/spotify';

export async function load({ url, locals }) {
	const { accessToken } = await locals.getSession();

	const res = await search(accessToken, url.searchParams.get('q'));
	if (res.error) {
		throw error(res.error.status, res.error.message);
	}

	return {
		searchResults: res
	};
}
