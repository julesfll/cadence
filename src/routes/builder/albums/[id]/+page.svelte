<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';

	export let data;
	const album: SpotifyApi.AlbumObjectFull = data.album;
</script>

<h1 class="text-3xl mb-2">{album.name}</h1>
<TrackList tracks={album.tracks.items} />