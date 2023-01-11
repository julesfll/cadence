<script lang="ts">
	import TrackItem from './TrackItem.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { filterTracks } from '$lib/utils';
	import { trackFilter } from '$lib/stores';
	import type { TrackWithTempo } from '$lib/types';

	export let tracks: TrackWithTempo[];
	export let showAlbum = true;

	let src: string | null;
	let playTrack: () => void;
	let pauseTrack: () => void;

	$: [shownTracks, hiddenTracks] = filterTracks(tracks, $trackFilter);

	function handlePlayTrack(newSrc: string | null) {
		src = newSrc;
		playTrack();
	}

	function handlePauseTrack() {
		pauseTrack();
	}
</script>

<AudioPlayer bind:playTrack bind:pauseTrack {src} />
<ul>
	{#each shownTracks as track, i}
		<li>
			<TrackItem {track} {handlePlayTrack} {handlePauseTrack} {showAlbum} />
		</li>
	{/each}
</ul>
<h2>Hidden</h2>
<ul>
	{#each hiddenTracks as track, i}
		<li>
			<TrackItem {track} {handlePlayTrack} {handlePauseTrack} {showAlbum} />
		</li>
	{/each}
</ul>
