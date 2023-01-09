import { error } from '@sveltejs/kit';
import { getPlaylist } from '$lib/server/spotify';

export async function load({ params, locals }) {
	const { accessToken } = await locals.getSession();

	const res = await getPlaylist(accessToken, params.id);
	if (res.error) {
		throw error(res.error.status, res.error.message);
	}

	return {
		playlist: res
	};
}
