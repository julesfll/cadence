<script lang="ts">
	import TrackItem from './TrackItem.svelte';

	export let tracks: SpotifyApi.TrackObjectFull[] | null;
</script>

<ul>
	{#if tracks}
		{#each tracks as track}
			<li>
				<TrackItem {track} />
			</li>
		{/each}
	{/if}
</ul>
