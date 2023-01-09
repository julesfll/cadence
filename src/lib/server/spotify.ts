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

export async function getPlaylist(accessToken: string, id: string) {
	return paginatedGet(
		accessToken,
		BASE_URL + `playlists/${id}`,
		(result) => result.tracks.next,
		(result, items) => result.tracks.items.push(...items)
	);
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
