import { writable, type Writable } from 'svelte/store';

export const selectedTracks: Writable<SpotifyApi.TrackObjectSimplified[]> = writable([]);
