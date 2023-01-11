import { writable, type Writable } from 'svelte/store';
import { INITIAL_ALLOW_HALFTIME, INITIAL_BPMS } from './constants';
import type { TrackWithTempo } from './types';
import { createTempoFilter } from './utils';

export const selectedTracks: Writable<SpotifyApi.TrackObjectSimplified[]> = writable([]);
export const trackFilter: Writable<(track: TrackWithTempo) => boolean> = writable(
	createTempoFilter(INITIAL_BPMS[0], INITIAL_BPMS[1], INITIAL_ALLOW_HALFTIME)
);
