<script lang="ts">
	import TrackItem from './TrackItem.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';

	export let tracks: (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)[];
	export let showAlbum = true;

	let src: string | null;
	let playTrack: () => void;
	let pauseTrack: () => void;

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
	{#if tracks}
		{#each tracks as track, i}
			<li>
				<TrackItem {track} {handlePlayTrack} {handlePauseTrack} {showAlbum} />
			</li>
		{/each}
	{/if}
</ul>
