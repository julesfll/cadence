<script lang="ts">
	import TextArtistList from '$lib/components/TextArtistList.svelte';
	import Icon from '@iconify/svelte';
	import { selectedTracks } from '$lib/stores';
	import Badge from '$lib/components/atoms/Badge.svelte';

	export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
	export let showAlbum = true;
	export let handlePlayTrack: (src: string | null) => void;
	export let handlePauseTrack: () => void;

	function addTrack() {
		$selectedTracks = [...$selectedTracks, track];
	}
	function removeTrack() {
		// TODO: is object comparison safe?
		$selectedTracks = $selectedTracks.filter((trackInList) => trackInList.id !== track.id);
	}
	function toggleTrack() {
		if (trackSelected) {
			removeTrack();
		} else {
			addTrack();
		}
	}

	$: trackSelected = $selectedTracks.some((trackInList) => trackInList.id === track.id);
</script>

<!-- TODO: make more accessible -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	on:mouseover={() => handlePlayTrack(track.preview_url)}
	on:mouseout={() => handlePauseTrack()}
	on:focus={() => handlePlayTrack(track.preview_url)}
	on:blur={() => handlePauseTrack()}
	class={`flex items-center p-3  focus:ring-4 focus:ring-inset focus:outline-none focus:ring-gray-200
	${trackSelected ? 'bg-gray-300 hover:bg-gray-300' : 'hover:bg-gray-200'}`}
	on:click={toggleTrack}
	on:keypress={toggleTrack}
	tabindex="0"
>
	{#if 'album' in track && showAlbum}
		<div class="shrink-0">
			<img
				class="h-16 w-16 object-cover"
				src={track.album.images[track.album.images.length - 1].url}
				alt={track.album.name}
			/>
		</div>
	{/if}
	<div class="justify-center flex-1 flex flex-col ml-2 h-16 space-y-1">
		<h3 class="truncate">{track.name}</h3>
		<p class="text-sm text-gray-500 z-2-">
			{#if track.explicit}
				<span class="mr-1 bg-gray-200 px-1.5 py-0.5 text-xs font-medium">E</span>
			{/if}
			<TextArtistList artists={track.artists} />
		</p>
	</div>
	{#if trackSelected}
		<div class="p-3 bg-gray-200 rounded-full">
			<Icon icon="mdi:check" class="h-5 w-5 " />
		</div>
	{:else if track.tempo}
		<div class="ml-2">
			<Badge icon="mdi:metronome-tick">{Math.round(track.tempo)} BPM</Badge>
		</div>
	{/if}
</div>
