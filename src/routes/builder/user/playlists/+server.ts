import { getUserPlaylists, createPlaylist, addTracksToPlaylist } from '$lib/server/spotify';
import { error, json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const { accessToken, user } = await locals.getSession();

	const playlistRes = await getUserPlaylists(accessToken);
	if ('error' in playlistRes) {
		throw error(playlistRes.error.status, playlistRes.error.message);
	}

	const userEditablePlaylists = playlistRes.items.filter(
		(playlist) => playlist.owner.id === user.id || playlist.collaborative
	);

	return json(userEditablePlaylists);
}

export async function POST({ request, locals }) {
	const { accessToken, user } = await locals.getSession();
	const body = await request.json();
	if (body.id === 'new') {
		const newPlaylistRes = await createPlaylist(
			accessToken,
			user.id,
			body.newPlaylistName,
			'Created with Cadence.'
		);
		if ('error' in newPlaylistRes) {
			throw error(newPlaylistRes.error.status, newPlaylistRes.error.message);
		}
		body.id = newPlaylistRes.id;
	}

	const addTracksRes = await addTracksToPlaylist(
		accessToken,
		body.id,
		body.selectedTrackUris,
		body.removeDuplicates
	);
	if ('error' in addTracksRes) {
		throw error(addTracksRes.error.status, addTracksRes.error.message);
	}

	return json({ ...addTracksRes, playlistId: body.id });
}
