import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.spotify.com/',
});

const get = async (url: string, params?: {}) => {
  try {
    return instance.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

const post = async (url: string, data: {}) => {
  try {
    return instance.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUserProfile = async () => {
  return get('/v1/me');
};
export const getUserPlaylists = async (): Promise<
  SpotifyApi.PlaylistObjectFull[]
> => {
  let playlists: SpotifyApi.PlaylistObjectFull[] = [];
  let res = await get('/v1/me/playlists', { limit: 50 });
  while (res.data.next) {
    playlists = playlists.concat(res.data.items);
    res = await get(res.data.next);
  }
  playlists = playlists.concat(res.data.items);
  return playlists;
};

export const getPlaylistItems = async (id: string) => {
  let tracks: SpotifyApi.TrackObjectFull[] = [];
  let res: { data: SpotifyApi.PlaylistTrackResponse } = await get(
    `/v1/playlists/${id}/tracks`,
    { limit: 100 }
  );
  while (res.data.next) {
    tracks = tracks.concat(
      res.data.items
        .filter((track) => track.track.type === 'track')
        .map((item) => item.track)
    );
    res = await get(res.data.next);
  }
  tracks = tracks.concat(
    res.data.items
      .filter((track) => track.track.type === 'track')
      .map((item) => item.track)
  );
  return tracks;
};

export const getSavedTracks = async (): Promise<
  SpotifyApi.TrackObjectFull[]
> => {
  let tracks: SpotifyApi.TrackObjectFull[] = [];
  let res = await get('/v1/me/tracks/', { limit: 50 });
  while (res.data.next) {
    tracks = tracks.concat(res.data.items.map((item) => item.track));
    res = await get(res.data.next);
  }
  tracks = tracks.concat(res.data.items.map((item) => item.track));
  return tracks;
};
export const getAudioFeatures = async (
  tracks: SpotifyApi.TrackObjectFull[]
): Promise<SpotifyApi.AudioFeaturesObject[]> => {
  let features = [];
  for (let i = 0; i < tracks.length; i += 100) {
    const res = await get('/v1/audio-features/', {
      ids: tracks
        .slice(i, i + 100)
        .map((track) => track.id)
        .join(),
    });
    features = features.concat(res.data.audio_features);
  }
  return features;
};

export const createPlaylist = async (
  userId: string,
  tracks: SpotifyApi.TrackObjectFull[],
  name: string
) => {
  const createPlaylistRes = await post(`/v1/users/${userId}/playlists`, {
    name,
    public: false,
  });
  for (let i = 0; i < tracks.length; i += 100) {
    const addItemsRes = await post(
      `/v1/playlists/${createPlaylistRes.data.id}/tracks`,
      { uris: tracks.slice(i, i + 100).map((track) => track.uri) }
    );
  }

  return 'todo';
};
