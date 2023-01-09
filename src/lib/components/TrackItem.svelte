<script lang="ts">
	import TextArtistList from '$lib/components/TextArtistList.svelte';

	export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaStopwatch from 'svelte-icons/fa/FaStopwatch.svelte';

	let paused = true;
	let currentTime = 0;
	function playTrack(e) {
		currentTime = 0;
		paused = false;
	}
	function pauseTrack(e) {
		paused = true;
	}
</script>

<audio bind:paused bind:currentTime src={track.preview_url} />
<div
	on:mouseover={playTrack}
	on:mouseout={pauseTrack}
	on:focus={playTrack}
	on:blur={pauseTrack}
	class="group flex cursor-pointer items-center hover:bg-gray-100"
>
	<div class="flex items-center p-3 group-hover:text-blue-600">
		<div class="h-5 w-5">
			<FaPlus />
		</div>
		<span class="sr-only">Add track</span>
	</div>
	{#if track.album}
		<img
			class="h-16 w-16 object-cover"
			src={track.album.images[track.album.images.length - 1].url}
			alt={track.album.name}
		/>
	{/if}
	<div class="space-y-1 px-3 py-1">
		<h3 class="text-ellipsis">{track.name}</h3>
		<p class="text-sm text-gray-500">
			{#if track.explicit}
				<span class="mr-1 bg-gray-200 px-1.5 py-0.5 text-xs font-medium">E</span>
			{/if}
			<TextArtistList artists={track.artists} />
		</p>
		<div class="inline-flex items-center bg-gray-200 px-1.5 py-0.5 text-xs font-medium">
			<div class="mr-1 h-3 w-3">
				<FaStopwatch />
			</div>
			100 BPM
		</div>
	</div>
</div>
