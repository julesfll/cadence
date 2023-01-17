<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import { selectedTracks } from '$lib/stores';
	import ExportMenu from './ExportMenu.svelte';
</script>

<div class="flex items-center justify-between">
	{#if $selectedTracks.length}
		<ExportMenu
			>Export {$selectedTracks.length} song{$selectedTracks.length === 1 ? '' : 's'}</ExportMenu
		>
	{:else}
		<p class="text-gray-500 text-sm">Tap a song to get started</p>
	{/if}
	<Button icon="mdi:chevron-up" srText="Show songs" variant="inverted" />
</div>
<div class="max-h-16 overflow-y-scroll">
	<!-- <TrackList tracks={$selectedTracks} /> -->
	<pre>{JSON.stringify(
			$selectedTracks.map((track) => track.name),
			null,
			2
		)}</pre>
</div>
