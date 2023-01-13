<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	import TrackList from '$lib/components/TrackList.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	export let data: PageData;
</script>

<Container>
	<Heading level="h2">Hi {data.session?.user?.name}</Heading>
	<Button on:click={() => signOut()} icon="mdi:logout">Logout</Button>
	<p class="mt-2">Check it out!</p>
	<p>Out of your top 50 songs from the past few months, these would work well for your next run.</p>
	<TrackList tracks={data.topTracksWithTempos} />
</Container>