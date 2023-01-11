import { error } from '@sveltejs/kit';
import { getPlaylist, getTracksWithTempos } from '$lib/server/spotify';

export async function load({ params, locals }) {
	const { accessToken } = await locals.getSession();

	const resPlaylist = await getPlaylist(accessToken, params.id);
	if ('error' in resPlaylist) {
		throw error(resPlaylist.error.status, resPlaylist.error.message);
	}

	const tracks = resPlaylist.tracks.items
		.map((trackItem) => trackItem.track)
		.filter((track) => track !== null);

	const tracksWithTempos = await getTracksWithTempos(
		accessToken,
		tracks as SpotifyApi.TrackObjectFull[]
	);

	if ('error' in tracksWithTempos) {
		throw error(tracksWithTempos.error.status, tracksWithTempos.error.message);
	}

	return {
		playlist: resPlaylist,
		tracksWithTempos
	};
}
