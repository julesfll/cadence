<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import Button from '$lib/components/atoms/Button.svelte';
	import { createTempoFilter } from '$lib/utils';
	import TrackList from '$lib/components/TrackList.svelte';
	import TempoTapper from '$lib/components/TempoTapper.svelte';
	import { trackFilter } from '$lib/stores';
	import { selectedTracks } from '$lib/stores';
	import {
		INITIAL_ALLOW_HALFTIME,
		INITIAL_BPMS,
		RANGE_MAX,
		RANGE_MIN,
		TAPPER_RANGE
	} from '$lib/constants';
	import ExportMenu from './ExportMenu.svelte';
	import InputField from '$lib/components/atoms/InputField.svelte';
	import CheckboxField from '$lib/components/atoms/CheckboxField.svelte';

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
<hr class="mt-4" />
<form>
	<div class="p-2">
		<RangeSlider
			min={RANGE_MIN}
			max={RANGE_MAX}
			float
			range
			pushy
			pips
			first="label"
			last="label"
			bind:values={bpms}
		/>
	</div>
	<div class="flex items-center space-x-2">
		<Button on:click={resetBpms} icon="mdi:restore" srText="Reset BPM" variant="inverted" />
		<InputField
			bind:value={bpms[0]}
			name="minTempo"
			type="number"
			min={RANGE_MIN}
			max={RANGE_MAX}
		/>
		<InputField
			bind:value={bpms[1]}
			name="maxTempo"
			type="number"
			min={RANGE_MIN}
			max={RANGE_MAX}
		/>
		<TempoTapper bind:bpm={tapperBpm} />
		<CheckboxField bind:checked={allowHalftime} label="Allow halftime" />
	</div>
</form>
