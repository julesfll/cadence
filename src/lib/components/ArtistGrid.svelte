<script lang="ts">
	import ArtistItem from '$lib/components/ArtistItem.svelte';
	import CardListGrid from './atoms/CardListGrid.svelte';

	export let artists: SpotifyApi.ArtistObjectFull[];
	export let someHidden = false;
</script>

<CardListGrid someHidden>
	{#each artists as artist}
		<ArtistItem {artist} />
	{/each}
</CardListGrid>
