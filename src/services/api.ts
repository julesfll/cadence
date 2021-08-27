import axios from 'axios';
import { TrackObjectFull } from 'spotify-api';

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

export const getUserProfile = async () => {
  return get('/v1/me');
}
export const getUserPlaylists = async () => {
  try {
    const response = await instance.get('/spotify-get', {
      params: {
        url: '/v1/me/playlists',
        token: localStorage.getItem('accessToken'),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSavedTracks = async (): Promise<TrackObjectFull[]> => {
  let tracks: TrackObjectFull[] = [];
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
) => {
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

// TODO: Wrap data in a data key
// TODO: Put token in cookie instead of localstorage
export const createPlaylist = async (tracks: SpotifyApi.TrackObjectFull[]) => {
  try {
    const userProfileRes = await instance.get('/spotify-get', {
      params: {
        url: '/v1/me/',
        token: localStorage.getItem('accessToken'),
      },
    });
    const createPlaylistRes = await instance.post('/spotify-post', {
      url: `/v1/users/${userProfileRes.data.id}/playlists`,
      token: localStorage.getItem('accessToken'),
      name: 'Running Playlist',
      public: false,
    });
    const addItemsRes = await instance.post('/spotify-post', {
      url: `/v1/playlists/${createPlaylistRes.data.id}/tracks`,
      token: localStorage.getItem('accessToken'),
      uris: tracks.map((track) => track.uri),
    });
    return addItemsRes.data;
  } catch (error) {
    console.error(error);
  }
};
