import { error } from '@sveltejs/kit';
import { getTopTracks } from '$lib/server/spotify';

export async function load({ locals }) {
	const { accessToken } = await locals.getSession();

	const res = await getTopTracks(accessToken);
	if ('error' in res) {
		throw error(res.error.status, res.error.message);
	}

	return {
		topTracks: res
	};
}
