<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	import TrackList from '$lib/components/TrackList.svelte';

	export let data: PageData;
	const topTracks: SpotifyApi.UsersTopTracksResponse = data.topTracks;
</script>

<h1>Hi {data.session?.user?.name}</h1>
<button on:click={() => signOut()}>Logout</button>
<p>Check it out!</p>
<p>Out of your top 50 songs from the past few months, these would work well for your next run.</p>
<TrackList tracks={topTracks.items}/>
