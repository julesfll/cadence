<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Container>
	<Heading level="h1">Saved Tracks</Heading>
	<TrackList tracks={data.savedTracksWithTempos} />
</Container>
