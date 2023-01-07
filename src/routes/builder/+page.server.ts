import { error } from '@sveltejs/kit';
import { getUserPlaylists } from '$lib/server/spotify';

export async function load({ locals }) {
	const session = await locals.getSession();

  const res = await getUserPlaylists(session.accessToken);
	const data = await res.json();

	return {
		playlists: data.items ?? []
	};
}
