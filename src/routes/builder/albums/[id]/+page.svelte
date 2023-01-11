<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { album, tracksWithTempos } = data;
</script>

<h1 class="p-3 text-3xl mb-2">{album.name}</h1>
<TrackList tracks={tracksWithTempos} showAlbum={false} />
