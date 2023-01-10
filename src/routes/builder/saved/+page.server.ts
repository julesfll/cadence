import { error } from '@sveltejs/kit';
import { getSavedTracks } from '$lib/server/spotify';


export async function load({ locals }) {
	const session = await locals.getSession();

  const res = await getSavedTracks(session.accessToken);
	if ('error' in res) {
		throw error(res.error.status, res.error.message)
	}

	return {
		savedTracks: res
	};
}
