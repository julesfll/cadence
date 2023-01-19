<script lang="ts">
	import CardListItem from './atoms/CardListItem.svelte';

	export let artist: SpotifyApi.ArtistObjectFull;
</script>

<CardListItem
	href="/builder/artists/{artist.id}"
	image={artist.images.length
		? {
				src: artist.images[0].url,
				alt: artist.name
		  }
		: undefined}
	placeholderIcon="mdi:account-music-outline"
	round
>
	<span slot="title">{artist.name}</span>
	<span slot="subtitle">Artist</span>
</CardListItem>
