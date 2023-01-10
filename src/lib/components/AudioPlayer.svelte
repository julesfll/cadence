<script lang="ts">
	export let src: string | null = null;

	let paused = true;
	let currentTime = 0;
	export const playTrack = () => {
		currentTime = 0;
		paused = false;
	};
	export const pauseTrack = () => {
		paused = true;
	};
</script>

{#if src}
	<audio bind:paused bind:currentTime {src} />
{/if}
