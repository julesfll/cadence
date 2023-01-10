import { error } from '@sveltejs/kit';
import {
	getArtist,
	getArtistAlbums,
	getArtistTopTracks,
	getArtistRelatedArtists
} from '$lib/server/spotify';

export async function load({ locals, params }) {
	const { accessToken } = await locals.getSession();

	const artistRes = await getArtist(accessToken, params.id);
	if ('error' in artistRes) {
		throw error(artistRes.error.status, artistRes.error.message);
	}

	const albumsRes = await getArtistAlbums(accessToken, params.id);
	if ('error' in albumsRes) {
		throw error(albumsRes.error.status, albumsRes.error.message);
	}

	const topTracksRes = await getArtistTopTracks(accessToken, params.id);
	if ('error' in topTracksRes) {
		throw error(topTracksRes.error.status, topTracksRes.error.message);
	}

	const relatedArtistsRes = await getArtistRelatedArtists(accessToken, params.id);
	if ('error' in relatedArtistsRes) {
		throw error(relatedArtistsRes.error.status, relatedArtistsRes.error.message);
	}

	return {
		artist: artistRes,
		artistAlbums: albumsRes,
		artistTopTracks: topTracksRes,
		artistRelatedArtists: relatedArtistsRes
	};
}
