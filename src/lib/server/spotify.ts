const BASE_URL = 'https://api.spotify.com/v1/';

interface ErrorResponse {
	error: SpotifyApi.ErrorObject;
}

async function get(accessToken: string, url: string, params?: Record<string, string>) {
	const options = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
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

export async function getUserPlaylists(accessToken: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + 'me/playlists',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getUserAlbums(accessToken: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + 'me/albums',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getUserArtists(accessToken: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + 'me/following',
		(result) => result.artists.next,
		(result, items) => result.artists.items.push(...items),
		{ limit: '50', type: 'artist' }
	);
}

export async function getPlaylist(accessToken: string, id: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + `playlists/${id}`,
		(result) => result.tracks.next,
		(result, items) => result.tracks.items.push(...items)
	);
}

export async function getAlbum(accessToken: string, id: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + `albums/${id}`,
		(result) => result.tracks.next,
		(result, items) => result.tracks.items.push(...items)
	);
}

export async function getSavedTracks(accessToken: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + 'me/tracks',
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ limit: '50' }
	);
}

export async function getTopTracks(accessToken: string) {
	const res = await get(accessToken, BASE_URL + 'me/top/tracks', {
		limit: '50',
		time_range: 'medium_term'
	});
	return res.json();
}

export async function getArtist(accessToken: string, id: string) {
	const res = await get(accessToken, BASE_URL + `artists/${id}`);
	return res.json();
}

export async function getArtistAlbums(accessToken: string, id: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + `artists/${id}/albums`,
		(result) => result.next,
		(result, items) => result.items.push(...items),
		{ include_groups: 'album,single', limit: '50' }
	);
}

export async function getArtistTopTracks(accessToken: string, id: string) {
	const res = await get(accessToken, BASE_URL + `artists/${id}/top-tracks`, {
		country: 'from_token'
	});
	return res.json();
}

export async function getArtistRelatedArtists(accessToken: string, id: string) {
	const res = await get(accessToken, BASE_URL + `artists/${id}/related-artists`);
	return res.json();
}
