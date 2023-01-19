import type { TrackWithTempo } from './types';

//stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
export function partition<T>(array: T[], filter: (elem: T) => boolean): [T[], T[]] {
	const pass: T[] = [],
		fail: T[] = [];
	array.forEach((elem) => (filter(elem) ? pass : fail).push(elem));
	return [pass, fail];
}

export function createTempoFilter(minBpm: number, maxBpm: number, allowHalftime: boolean) {
	return ({ tempo }: TrackWithTempo): boolean =>
		(tempo >= minBpm && tempo <= maxBpm) ||
		(allowHalftime && tempo >= minBpm / 2 && tempo <= maxBpm / 2);
}

export function filterTracks(
	tracks: TrackWithTempo[],
	filter: ({ tempo }: TrackWithTempo) => boolean
): [TrackWithTempo[], TrackWithTempo[]] {
	return partition(tracks, filter);
}

export function formatNumber(num: number): string {
	const formatter = Intl.NumberFormat('en-US', { notation: 'compact' });

	return formatter.format(num);
}
