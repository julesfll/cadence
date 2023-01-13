<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { playlist, tracksWithTempos } = data;
</script>

<Heading level="h1">{playlist.name}</Heading>
<TrackList tracks={tracksWithTempos} />
