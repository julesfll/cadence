<script lang="ts">
	import AlbumItem from '$lib/components/AlbumItem.svelte';
	import CardListGrid from './atoms/CardListGrid.svelte';

	export let dateMode: boolean = false;
	export let albums: (SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified)[];
</script>

<CardListGrid>
	{#each albums as album}
		<AlbumItem {album} {dateMode} />
	{/each}
</CardListGrid>