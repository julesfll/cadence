<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl mb-2">Saved Tracks</h1>
<TrackList tracks={data.savedTracksWithTempos} />
