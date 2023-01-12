<script lang="ts">
	import TextArtistList from '$lib/components/TextArtistList.svelte';
	import Icon from '@iconify/svelte';
	import { selectedTracks } from '$lib/stores';

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

<div
	on:mouseover={() => handlePlayTrack(track.preview_url)}
	on:mouseout={() => handlePauseTrack()}
	on:focus={() => handlePlayTrack(track.preview_url)}
	on:blur={() => handlePauseTrack()}
	on:click={toggleTrack}
	class={`group flex cursor-pointer items-center ${
		trackSelected ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'
	}`}
>
	<div class="flex items-center group-hover:text-blue-600">
		<div class="h-5 w-5 m-3">
			{#if trackSelected}
				<Icon icon="mdi:check" class="h-5 w-5" />
			{:else}
				<Icon icon="mdi:plus" class="h-5 w-5" />
			{/if}
		</div>
		<span class="sr-only">Add track</span>
	</div>
	{#if track.album && showAlbum}
		<img
			class="h-20 w-20 object-cover"
			src={track.album.images[track.album.images.length - 1].url}
			alt={track.album.name}
		/>
	{/if}
	<div class="space-y-1 px-3 py-2">
		<h3 class="text-ellipsis">{track.name}</h3>
		<p class="text-sm text-gray-500">
			{#if track.explicit}
				<span class="mr-1 bg-gray-200 px-1.5 py-0.5 text-xs font-medium">E</span>
			{/if}
			<TextArtistList artists={track.artists} />
		</p>
		{#if track.tempo}
			<div class="inline-flex items-center bg-gray-200 px-1.5 py-0.5 text-xs font-medium">
				<div class="mr-1 h-3 w-3">
					<Icon icon="mdi:metronome-tick" class="h-3 w-3" />
				</div>
				{Math.round(track.tempo)} BPM
			</div>
		{/if}
	</div>
</div>
