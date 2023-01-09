<script lang="ts">
	import AlbumItem from '$lib/components/AlbumItem.svelte';

	export let dateMode: boolean = false;
	export let albums: (SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified)[];
</script>

<ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
	{#each albums as album (album.id)}
		<AlbumItem {album} {dateMode} />
	{/each}
</ul>
