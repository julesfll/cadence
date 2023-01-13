<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import type { PageData } from './$types';
	import Container from '$lib/components/atoms/Container.svelte';

	export let data: PageData;
	const { playlist, tracksWithTempos } = data;
</script>

<Container>
	<Heading level="h1">{playlist.name}</Heading>
	<TrackList tracks={tracksWithTempos} />
</Container>
