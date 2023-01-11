<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import FaChevronUp from 'svelte-icons/fa/FaChevronUp.svelte';
	import FaUndo from 'svelte-icons/fa/FaUndo.svelte';
	import { createTempoFilter } from '$lib/utils';
	import TrackList from '$lib/components/TrackList.svelte';
	import TempoTapper from '$lib/components/TempoTapper.svelte';
	import { trackFilter } from '$lib/stores';
	import { selectedTracks } from '$lib/stores';
	import { INITIAL_ALLOW_HALFTIME, INITIAL_BPMS, TAPPER_RANGE } from '$lib/constants';
	import ExportMenu from './ExportMenu.svelte';

	let tapperBpm = (INITIAL_BPMS[0] + INITIAL_BPMS[1]) / 2;
	let bpms = INITIAL_BPMS;
	let allowHalftime = INITIAL_ALLOW_HALFTIME;

	function resetBpms() {
		bpms = INITIAL_BPMS;
		allowHalftime = INITIAL_ALLOW_HALFTIME;
	}

	$: $trackFilter = createTempoFilter(bpms[0], bpms[1], allowHalftime);
	$: bpms = [tapperBpm - TAPPER_RANGE / 2, tapperBpm + TAPPER_RANGE / 2];
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center">
		<p>{$selectedTracks.length} songs selected</p>
		<ExportMenu />
	</div>
	<button
		type="button"
		class="flex cursor-pointer items-center p-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
	>
		<div class="h-6 w-6">
			<FaChevronUp />
		</div>
		<span class="sr-only">Show songs</span>
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
		<RangeSlider
			min={100}
			max={200}
			float
			range
			pushy
			pips
			first="label"
			last="label"
			bind:values={bpms}
		/>
	</div>
	<div class="flex items-center space-x-1">
		<button
			on:click={resetBpms}
			type="button"
			class="flex cursor-pointer items-center py-2 px-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<div class="h-5 w-5">
				<FaUndo />
			</div>
			<span class="sr-only">Reset</span>
		</button>
		<input
			bind:value={bpms[0]}
			type="number"
			class="block w-16 border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
		/>
		<input
			bind:value={bpms[1]}
			type="number"
			class="block w-16 border border-black bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
		/>
		<TempoTapper bind:bpm={tapperBpm} />
		<label class="flex items-center">
			<input
				bind:checked={allowHalftime}
				type="checkbox"
				class="h-4 w-4 border border-black bg-gray-100"
			/>
			<span class="ml-2 text-sm"> Allow halftime </span>
		</label>
	</div>
</form>
