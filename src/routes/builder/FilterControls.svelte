<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import Button from '$lib/components/atoms/Button.svelte';
	import { createTempoFilter } from '$lib/utils';
	import TempoTapper from '$lib/components/TempoTapper.svelte';
	import { trackFilter } from '$lib/stores';
	import {
		INITIAL_ALLOW_HALFTIME,
		INITIAL_BPMS,
		RANGE_MAX,
		RANGE_MIN,
		TAPPER_RANGE
	} from '$lib/constants';
	import InputField from '$lib/components/atoms/InputField.svelte';
	import CheckboxField from '$lib/components/atoms/CheckboxField.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

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

<Container>
	<form>
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
</Container>
