import type { SpotifyApiResponse, TrackWithTempo } from '$lib/types';

const BASE_URL = 'https://api.spotify.com/v1';

async function get(accessToken: string, url: string, params?: Record<string, string>) {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	};

	const searchParamString = params ? '?' + new URLSearchParams(params).toString() : '';
	return fetch(url + searchParamString, options);
}

async function post(
	accessToken: string,
	url: string,
	body: Record<string, any>,
	params?: Record<string, string>
) {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(body)
	};

	const searchParamString = params ? '?' + new URLSearchParams(params).toString() : '';
	return fetch(url + searchParamString, options);
}

async function paginatedGet(
	accessToken: string,
	url: string,
	getNext: (result: Record<string, any>) => string,
	addItems: (result: Record<string, any>, items: Record<string, any>[]) => void,
	params?: Record<string, string>
) {
	try {
		const response = await get(accessToken, url, params);
		const result = await response.json();
		if (result.error) {
			throw result;
		}
		let nextUrl = getNext(result);

		while (nextUrl) {
			const nextRes = await get(accessToken, nextUrl);
			const nextResJson = await nextRes.json();
			if (nextResJson.error) {
				throw result;
			}

			addItems(result, nextResJson.items);

			nextUrl = nextResJson.next;
		}

		return result;
	} catch (error) {
		return error;
	}
}

export async function getUserPlaylists(
	accessToken: string
): Promise<SpotifyApiResponse<SpotifyApi.ListOfUsersPlaylistsResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + '/me/playlists',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getUserAlbums(
	accessToken: string
): Promise<SpotifyApiResponse<SpotifyApi.UsersSavedAlbumsResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + '/me/albums',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getUserArtists(
	accessToken: string
): Promise<SpotifyApiResponse<SpotifyApi.UsersFollowedArtistsResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + '/me/following',
		(result) => result.artists.next,
		(result, items) => result.artists.items.push(...items),
		{ limit: '50', type: 'artist' }
	);
}

export async function getPlaylist(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.SinglePlaylistResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + `/playlists/${id}`,
		(result) => result.tracks.next,
		(result, items) => result.tracks.items.push(...items)
	);
}

export async function getAlbum(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.AlbumObjectFull>> {
	return paginatedGet(
		accessToken,
		BASE_URL + `/albums/${id}`,
		(result) => result.tracks.next,
		(result, items) => result.tracks.items.push(...items)
	);
}

export async function getSavedTracks(
	accessToken: string
): Promise<SpotifyApiResponse<SpotifyApi.UsersSavedTracksResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + '/me/tracks',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getTopTracks(
	accessToken: string
): Promise<SpotifyApiResponse<SpotifyApi.UsersTopTracksResponse>> {
	const res = await get(accessToken, BASE_URL + '/me/top/tracks', {
		limit: '50',
		time_range: 'medium_term'
	});
	return res.json();
}

export async function getArtist(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.SingleArtistResponse>> {
	const res = await get(accessToken, BASE_URL + `/artists/${id}`);
	return res.json();
}

export async function getArtistAlbums(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.ArtistsAlbumsResponse>> {
	return paginatedGet(
		accessToken,
		BASE_URL + `/artists/${id}/albums`,
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ include_groups: 'album,single', limit: '50' }
	);
}

export async function getArtistTopTracks(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.ArtistsTopTracksResponse>> {
	const res = await get(accessToken, BASE_URL + `/artists/${id}/top-tracks`, {
		country: 'from_token'
	});
	return res.json();
}

export async function getArtistRelatedArtists(
	accessToken: string,
	id: string
): Promise<SpotifyApiResponse<SpotifyApi.ArtistsRelatedArtistsResponse>> {
	const res = await get(accessToken, BASE_URL + `/artists/${id}/related-artists`);
	return res.json();
}

export async function search(
	accessToken: string,
	query: string
): Promise<SpotifyApiResponse<SpotifyApi.SearchResponse>> {
	const res = await get(accessToken, BASE_URL + '/search', {
		q: query,
		type: 'artist,album,playlist,track'
	});
	return res.json();
}

export async function getAudioFeatures(
	accessToken: string,
	tracks: SpotifyApi.TrackObjectFull[]
): Promise<SpotifyApiResponse<SpotifyApi.MultipleAudioFeaturesResponse>> {
	const ids = tracks.map((track) => track.id);

	const result: SpotifyApiResponse<SpotifyApi.MultipleAudioFeaturesResponse> = {
		audio_features: []
	};

	for (let i = 0; i < ids.length; i += 100) {
		const res = await get(accessToken, BASE_URL + '/audio-features', {
			ids: ids.slice(i, i + 100).join()
		});

		const resJson = await res.json();
		if (resJson.error) {
			return resJson;
		}

		result.audio_features.push(...resJson.audio_features);
	}
	return result;
}

export async function getTracksWithTempos(
	accessToken: string,
	tracks: SpotifyApi.TrackObjectFull[]
): Promise<SpotifyApiResponse<TrackWithTempo[]>> {
	const audioFeaturesRes = await getAudioFeatures(accessToken, tracks);
	if ('error' in audioFeaturesRes) {
		return audioFeaturesRes;
	}
	const tracksWithTempos = audioFeaturesRes.audio_features.map((audioFeature, i) => ({
		...tracks[i],
		tempo: audioFeature.tempo
	}));
	return tracksWithTempos;
}

export async function createPlaylist(
	accessToken: string,
	userId: string,
	name: string,
	description?: string
): Promise<SpotifyApiResponse<SpotifyApi.CreatePlaylistResponse>> {
	const res = await post(accessToken, BASE_URL + `/users/${userId}/playlists`, {
		name,
		public: false,
		description
	});
	return res.json();
}

export async function addTracksToPlaylist(
	accessToken: string,
	id: string,
	trackUris: string[],
	removeDuplicates = false
): Promise<SpotifyApiResponse<SpotifyApi.AddTracksToPlaylistResponse>> {
	if (removeDuplicates) {
		const existingTracksRes = await getPlaylist(accessToken, id);
		if ('error' in existingTracksRes) {
			return existingTracksRes;
		}
		const existingTrackUris = existingTracksRes.tracks.items
			.filter((item) => item)
			.map((item) => item.track?.uri);

		trackUris = trackUris.filter((uri) => !existingTrackUris.includes(uri));
	}

	let result: SpotifyApiResponse<SpotifyApi.AddTracksToPlaylistResponse> = {
		error: {
			status: 400,
			message: 'No tracks added'
		}
	};
	for (let i = 0; i < trackUris.length; i += 100) {
		const res = await post(accessToken, BASE_URL + `/playlists/${id}/tracks`, {
			uris: trackUris.slice(i, i + 100)
		});
		const resJson = await res.json();
		if ('error' in resJson) {
			return resJson;
		}
		result = resJson;
	}

	return result;
}
