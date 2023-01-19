<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import { selectedTracks } from '$lib/stores';
	import ExportMenu from './ExportMenu.svelte';

	let isOpen = false;

	function clearTracks() {
		$selectedTracks = [];
	}
</script>

<div
	class={`shrink-0 bg-white ${
		isOpen ? 'absolute inset-0 z-10' : 'h-28 overflow-y-hidden'
	}`}
	id="drawer-example"
>
	<div class="sticky p-3 top-0 bg-white flex items-center justify-between">
		<div>
			{#if $selectedTracks.length}
				<ExportMenu
					>Add {$selectedTracks.length} song{$selectedTracks.length === 1 ? '' : 's'} to playlist</ExportMenu
				>
				<Button on:click={clearTracks} icon="mdi:trash" variant="inverted">Remove All</Button>
			{:else}
				<p class="text-gray-500 text-sm">Tap a song to get started</p>
			{/if}
		</div>
		<Button
			on:click={() => (isOpen = !isOpen)}
			icon={`mdi:chevron-${isOpen ? 'down' : 'up'}`}
			srText="Show songs"
			variant="inverted"
			ariaControls="track-drawer"
		/>
	</div>
	<div class="px-3 pb-3">
		<TrackList isDrawer tracks={$selectedTracks} />
	</div>
</div>
