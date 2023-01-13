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
		$selectedTracks = $selectedTracks.filter((trackInList) => trackInList !== track);
	}
	function toggleTrack() {
		if (trackSelected) {
			removeTrack();
		} else {
			addTrack();
		}
	}

	$: trackSelected = $selectedTracks.includes(track);
</script>

<!-- TODO: make more accessible -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	on:mouseover={() => handlePlayTrack(track.preview_url)}
	on:mouseout={() => handlePauseTrack()}
	on:focus={() => handlePlayTrack(track.preview_url)}
	on:blur={() => handlePauseTrack()}
	class={`flex items-center p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-200
	${trackSelected ? 'bg-gray-300 hover:bg-gray-300' : 'hover:bg-gray-200'}`}
	on:click={toggleTrack}
	on:keypress={toggleTrack}
	tabindex="0"
>
	{#if 'album' in track && showAlbum}
		<div class="shrink-0">
			<img
				class="h-20 w-20 object-cover"
				src={track.album.images[track.album.images.length - 1].url}
				alt={track.album.name}
			/>
		</div>
	{/if}
	<div class="flex-1 flex flex-col items-start justify-between ml-2 h-20">
		<h3 class="truncate">{track.name}</h3>
		<p class="text-sm text-gray-500">
			{#if track.explicit}
				<span class="mr-1 bg-gray-200 px-1.5 py-0.5 text-xs font-medium">E</span>
			{/if}
			<TextArtistList artists={track.artists} />
		</p>
		{#if track.tempo}
			<Badge icon="mdi:metronome-tick">{Math.round(track.tempo)} BPM</Badge>
		{/if}
	</div>
	{#if trackSelected}
		<div class="p-3 bg-gray-200 rounded-full">
			<Icon icon="mdi:check" class="h-5 w-5 " />
		</div>
	{:else}
		<div class="p-3">
			<Icon icon="mdi:plus" class="h-5 w-5" />
		</div>
	{/if}
</div>
