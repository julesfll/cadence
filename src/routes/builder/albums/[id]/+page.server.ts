import { error } from '@sveltejs/kit';
import { getAlbum, getTracksWithTempos } from '$lib/server/spotify';

export async function load({ params, locals }) {
	const { accessToken } = await locals.getSession();

	const res = await getAlbum(accessToken, params.id);
	if ('error' in res) {
		throw error(res.error.status, res.error.message);
	}

	const tracks = res.tracks.items
		.filter((track) => track !== null)
		.map((trackItem) => {
			return { ...trackItem, album: res };
		});

	const tracksWithTempos = await getTracksWithTempos(
		accessToken,
		tracks as SpotifyApi.TrackObjectFull[]
	);

	if ('error' in tracksWithTempos) {
		throw error(tracksWithTempos.error.status, tracksWithTempos.error.message);
	}

	return {
		album: res,
		tracksWithTempos
	};
}
