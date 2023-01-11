import { error } from '@sveltejs/kit';
import { getTopTracks, getTracksWithTempos } from '$lib/server/spotify';

export async function load({ locals }) {
	const { accessToken } = await locals.getSession();

	const res = await getTopTracks(accessToken);
	if ('error' in res) {
		throw error(res.error.status, res.error.message);
	}

	const tracks = res.items.filter((track) => track !== null);

	const tracksWithTempos = await getTracksWithTempos(
		accessToken,
		tracks as SpotifyApi.TrackObjectFull[]
	);

	if ('error' in tracksWithTempos) {
		throw error(tracksWithTempos.error.status, tracksWithTempos.error.message);
	}

	return {
		topTracksWithTempos: tracksWithTempos
	};
}
