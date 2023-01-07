const BASE_URL = 'https://api.spotify.com/v1/';

export async function getUserPlaylists(accessToken: string) {
	return fetch(BASE_URL + 'me/playlists', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}

export async function getPlaylist(accessToken: string, id: string) {
  return fetch(BASE_URL + `playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}