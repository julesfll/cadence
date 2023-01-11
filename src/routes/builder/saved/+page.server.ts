import { error } from '@sveltejs/kit';
import { getSavedTracks, getTracksWithTempos } from '$lib/server/spotify';

export async function load({ locals }) {
	const { accessToken } = await locals.getSession();

	const res = await getSavedTracks(accessToken);
	if ('error' in res) {
		throw error(res.error.status, res.error.message);
	}

	const tracks = res.items.map((trackItem) => trackItem.track).filter((track) => track !== null);

	const tracksWithTempos = await getTracksWithTempos(
		accessToken,
		tracks as SpotifyApi.TrackObjectFull[]
	);

	if ('error' in tracksWithTempos) {
		throw error(tracksWithTempos.error.status, tracksWithTempos.error.message);
	}

	return {
		savedTracksWithTempos: tracksWithTempos
	};
}
