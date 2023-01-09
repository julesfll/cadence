import { error } from '@sveltejs/kit';
import { getUserPlaylists } from '$lib/server/spotify';

export async function load({ locals }) {
	const session = await locals.getSession();

  const res = await getUserPlaylists(session.accessToken);
	if (res.error) {
		throw error(res.error.status, res.error.message)
	}

	return {
		playlists: res
	};
}
