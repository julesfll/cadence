<script lang="ts">
	import CardListItem from './atoms/CardListItem.svelte';

	export let playlist: SpotifyApi.PlaylistObjectSimplified;
</script>

<CardListItem
	href={`/builder/playlists/${playlist.id}`}
	image={playlist.images.length
		? {
				src: playlist.images[0].url,
				alt: playlist.name
		  }
		: undefined}
	placeholderIcon="mdi:playlist-music"
>
	<span slot="title">{playlist.name}</span>
	<span slot="subtitle">By {playlist.owner.display_name}</span>
</CardListItem>
