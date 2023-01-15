<script lang="ts">
	import Button from './atoms/Button.svelte';

	export let bpm = 0;
	const ROLLING_WINDOW_SIZE = 7;
	const TIMEOUT_PERIOD_MILLIS = 2 * 1000;

	let timesTapped: number[] = [];

	// https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
	function average(arr: number[]) {
		return arr.reduce((a, b) => a + b) / arr.length;
	}
	function updateTempo() {
		if (Date.now() - timesTapped[timesTapped.length - 1] > TIMEOUT_PERIOD_MILLIS) timesTapped = [];
		timesTapped = [...timesTapped, Date.now()];
		if (timesTapped.length > ROLLING_WINDOW_SIZE) timesTapped.shift();
		// https://stackoverflow.com/questions/30399123/finding-difference-between-consecutive-numbers-in-an-array-in-javascript/30399727
		const deltas = timesTapped.slice(1).map((n, i) => n - timesTapped[i]);
		const averageDelta = average(deltas);
		bpm = Math.round((60 * 1000) / averageDelta);
	}
</script>

<Button icon="mdi:gesture-tap" on:click={updateTempo}>Tap a beat</Button>
