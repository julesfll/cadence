<script>
	import { signIn } from '@auth/sveltekit/client';
	import Button from '$lib/components/atoms/Button.svelte';
	import { page } from '$app/stores';
</script>

<main>
	<section class="h-full bg-white p-3">
		<h1 class="py-12 text-5xl font-semibold">Your daily jog, now with a soundtrack.</h1>
		<Button on:click={() => signIn('spotify', { callbackUrl: '/builder' })} icon="mdi:spotify"
			>Login with Spotify</Button
		>
	</section>
	<section>
		<p>Run to the beat of your favorite music without ever changing your pace.</p>
	</section>
	<section>
		<h2>Spotify Integration</h2>
		<p>
			Access all the playlists you already have, or use Spotify's search engine to find exactly the
			song, artist, or album you're looking for. Then export your picks as a new playlist, all
			within the app. (can change to numbered list)
		</p>
	</section>
</main>
<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
