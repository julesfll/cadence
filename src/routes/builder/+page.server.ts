import { error } from '@sveltejs/kit';
import { getUserAlbums, getUserArtists, getUserPlaylists } from '$lib/server/spotify';

export async function load({ locals }) {
	const { accessToken } = await locals.getSession();

	const playlistRes = await getUserPlaylists(accessToken);
	if (playlistRes.error) {
		throw error(playlistRes.error.status, playlistRes.error.message);
	}

	const artistRes = await getUserArtists(accessToken);
	if (artistRes.error) {
		throw error(artistRes.error.status, artistRes.error.message);
	}

	const albumRes = await getUserAlbums(accessToken);
	if (albumRes.error) {
		throw error(albumRes.error.status, albumRes.error.message);
	}

	return {
		userPlaylists: playlistRes,
		userArtists: artistRes,
		userAlbums: albumRes
	};
}
