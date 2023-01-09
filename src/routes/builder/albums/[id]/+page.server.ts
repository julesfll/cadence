import { error } from '@sveltejs/kit';
import { getAlbum } from '$lib/server/spotify';


export async function load({ params, locals }) {
	const session = await locals.getSession();

  const res = await getAlbum(session.accessToken, params.id);
	if (res.error) {
		throw error(res.error.status, res.error.message)
	}

	return {
		album: res
	};
}
