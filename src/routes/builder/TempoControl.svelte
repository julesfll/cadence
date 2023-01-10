<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import { selectedTracks } from '$lib/stores';
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center">
		<p>{$selectedTracks.length} songs selected</p>
		<button
			type="button"
			class="ml-3 flex cursor-pointer items-center border border-black p-2 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<svg
				class="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/></svg
			>
			<span class="mx-3">Export</span>
		</button>
	</div>
	<button
		type="button"
		class="flex cursor-pointer items-center p-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
	>
		<svg
			class="h-6 w-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 15l7-7 7 7"
			/></svg
		> <span class="sr-only">Show songs</span>
	</button>
</div>
<div class="max-h-16 overflow-y-scroll">
	<!-- <TrackList tracks={$selectedTracks} /> -->
	<pre>{JSON.stringify(
			$selectedTracks.map((track) => track.name),
			null,
			2
		)}</pre>
</div>
<hr class="mt-4" />
<form>
	<div class="p-2">
		<input
			type="range"
			value="50"
			class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
		/>
	</div>
	<div class="flex items-center space-x-1">
		<button
			type="button"
			class="flex cursor-pointer items-center py-2 px-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/></svg
			>
			<span class="sr-only">Reset</span>
		</button>
		<input
			type="number"
			class="block w-16 border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
		/>
		<input
			type="number"
			class="block w-16 border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
		/>
		<button
			type="button"
			class="flex cursor-pointer items-center py-2 px-2.5 text-sm hover:bg-gray-200 active:bg-gray-400"
			>Tap a beat</button
		>
		<label class="flex items-center">
			<input type="checkbox" class="h-4 w-4 border border-black bg-gray-100" />
			<span class="ml-2 text-sm"> Allow halftime </span>
		</label>
	</div>
</form>
