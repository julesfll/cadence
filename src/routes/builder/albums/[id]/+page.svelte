<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { album, tracksWithTempos } = data;
</script>

<Heading level="h1">{album.name}</Heading>
<TrackList tracks={tracksWithTempos} showAlbum={false} />
