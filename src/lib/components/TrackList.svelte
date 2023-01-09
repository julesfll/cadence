<script lang="ts">
	import TrackItem from './TrackItem.svelte';

	export let tracks: (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)[];
</script>

<ul>
	{#if tracks}
		{#each tracks as track (track.id)}
			<li>
				<TrackItem {track} />
			</li>
		{/each}
	{/if}
</ul>
