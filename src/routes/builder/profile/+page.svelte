<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	import TrackList from '$lib/components/TrackList.svelte';

	export let data: PageData;
	const { items: topTracks }: SpotifyApi.UsersTopTracksResponse = data.topTracks;
</script>

<div class="p-3">
	<h1>Hi {data.session?.user?.name}</h1>
	<button
		class="border border-black p-2 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		on:click={() => signOut()}>Logout</button
	>
	<p>Check it out!</p>
	<p>Out of your top 50 songs from the past few months, these would work well for your next run.</p>
</div>
<TrackList tracks={topTracks} />

<p>And this is your CPR song. It has a tempo that would work well for CPR.</p>
<!-- todo: pull from top 50 long term and filter 100 to 120 bpm -->