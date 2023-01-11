import { writable, type Writable } from 'svelte/store';
import type { TrackWithTempo } from './types';

export const selectedTracks: Writable<SpotifyApi.TrackObjectSimplified[]> = writable([]);
export const trackFilter: Writable<((track: TrackWithTempo) => boolean) | null> = writable(null);
