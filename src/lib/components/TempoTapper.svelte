<script lang="ts">
	export let bpm = 0;
	const ROLLING_WINDOW_SIZE = 8;

	let timesTapped: number[] = [];

	// https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
	function average(arr: number[]) {
		return arr.reduce((a, b) => a + b) / arr.length;
	}
	function updateTempo() {
		timesTapped = [...timesTapped, Date.now()];
		if (timesTapped.length > ROLLING_WINDOW_SIZE) timesTapped.shift();
		// https://stackoverflow.com/questions/30399123/finding-difference-between-consecutive-numbers-in-an-array-in-javascript/30399727
		const deltas = timesTapped.slice(1).map((n, i) => n - timesTapped[i]);
		const averageDelta = average(deltas);
		bpm = Math.round((60 * 1000) / averageDelta);
	}
</script>

<button
	on:click={updateTempo}
	class="flex cursor-pointer items-center py-2 px-2.5 text-sm hover:bg-gray-200 active:bg-gray-400"
	>Tap a beat</button
>
