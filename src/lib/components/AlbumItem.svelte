<script lang="ts">
	import CardListItem from './atoms/CardListItem.svelte';
	import TextArtistList from './TextArtistList.svelte';

	export let album: SpotifyApi.AlbumObjectSimplified;
	export let dateMode = false;

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<CardListItem
	href="/builder/albums/{album.id}"
	image={album.images.length
		? {
				src: album.images[0].url,
				alt: album.name
		  }
		: undefined}
	placeholderIcon="mdi:album"
>
	<span slot="title">{album.name}</span>
	<span slot="subtitle">
		{#if dateMode}
			{new Date(album.release_date).getFullYear()} • {capitalizeFirstLetter(album.album_type)}
		{:else}
			<TextArtistList artists={album.artists} />
		{/if}
	</span>
</CardListItem>
