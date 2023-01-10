export interface TrackWithTempo extends SpotifyApi.TrackObjectFull {
	tempo: number | null;
}

export type SpotifyApiResponse<T> = T | { error: SpotifyApi.ErrorObject };
