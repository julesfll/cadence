<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<!-- <h1>SvelteKit Auth Example</h1>
<!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
<!-- <p>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('spotify')}>Sign In with Spotify</button>
	{/if}
</p> -->
<main>
	<section class="h-full bg-white p-3">
		<h1 class="py-12 text-5xl font-semibold">Running, now with a soundtrack.</h1>
		<button
			on:click={() => signIn('spotify')}
			class="border border-black py-3 px-5 font-bold hover:bg-gray-200 focus:outline-none focus:ring-8 focus:ring-gray-200"
			>Login with Spotify</button
		>
	</section>
</main>
<pre>{JSON.stringify($page, null, 2)}</pre>
