<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';

	export let data;
	const playlist: SpotifyApi.PlaylistObjectFull = data.playlist;
</script>

<h1 class="p-3 text-3xl mb-2">{playlist.name}</h1>
<TrackList tracks={playlist.tracks.items.map((trackItem) => trackItem.track)} />
