import { error } from '@sveltejs/kit';
import { getPlaylist } from '$lib/server/spotify';


export async function load({ params, locals }) {
	const session = await locals.getSession();

  const res = await getPlaylist(session.accessToken, params.id);
	const data = await res.json();

	return {
		tracks: data ?? []
	};
}
