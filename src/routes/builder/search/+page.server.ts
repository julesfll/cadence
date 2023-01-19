import { error } from '@sveltejs/kit';
import { search, getTracksWithTempos } from '$lib/server/spotify';

export async function load({ url, locals }) {
	const { accessToken } = await locals.getSession();

	const searchQuery = url.searchParams.get('q');

	let res, tracksWithTempos;

	if (searchQuery) {
		res = await search(accessToken, searchQuery);
		if ('error' in res) {
			throw error(res.error.status, res.error.message);
		}

		const tracks = res.tracks ? res.tracks.items.filter((track) => track !== null) : [];

		tracksWithTempos = await getTracksWithTempos(
			accessToken,
			tracks as SpotifyApi.TrackObjectFull[]
		);

		if ('error' in tracksWithTempos) {
			throw error(tracksWithTempos.error.status, tracksWithTempos.error.message);
		}
	}

	return {
		searchResults: res,
		tracksWithTempos,
		searchQuery,
		meta: {
			title: `Results for ${searchQuery}`,
			description: 'Search page: search Spotify for songs, artists, playlists, and albums'
		}
	};
}
