import { error } from '@sveltejs/kit';
import { getPlaylist } from '$lib/server/spotify';
import { getAudioFeatures } from '$lib/server/spotify';

export async function load({ params, locals }) {
	const { accessToken } = await locals.getSession();

	const resPlaylist = await getPlaylist(accessToken, params.id);
	if ('error' in resPlaylist) {
		throw error(resPlaylist.error.status, resPlaylist.error.message);
	}
	const audioFeaturesRes = await getAudioFeatures(
		accessToken,
		resPlaylist.tracks.items.map((trackItem) => trackItem.track)
	);
	if ('error' in audioFeaturesRes) {
		throw error(audioFeaturesRes.error.status, audioFeaturesRes.error.message);
	}

	return {
		playlist: resPlaylist
	};
}
