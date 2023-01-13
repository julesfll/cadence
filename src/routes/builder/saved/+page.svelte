<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte';
import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Heading level="h1">Saved Tracks</Heading>
<TrackList tracks={data.savedTracksWithTempos} />
