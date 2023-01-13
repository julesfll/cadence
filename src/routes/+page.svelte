<script>
	import { signIn } from '@auth/sveltekit/client';
	import Button from '$lib/components/atoms/Button.svelte';
	import { page } from '$app/stores';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
</script>

<main>
	<Container>
		<section class="h-full">
			<Heading level="h1"
				>Your daily jog, now with a <span
					class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
					>soundtrack</span
				>.</Heading
			>
			<Button on:click={() => signIn('spotify', { callbackUrl: '/builder' })} icon="mdi:spotify"
				>Login with Spotify</Button
			>
		</section>
		<section>
			<p>Run to the beat of your favorite music without ever changing your pace.</p>
		</section>
		<section>
			<Heading level="h2">Spotify Integration</Heading>
			<p>
				Access all the playlists you already have, or use Spotify's search engine to find exactly
				the song, artist, or album you're looking for. Then export your picks as a new playlist, all
				within the app. (can change to numbered list)
			</p>
		</section>
	</Container>
</main>

<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
