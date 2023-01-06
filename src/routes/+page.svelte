<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<h1>SvelteKit Auth Example</h1>
<pre>{JSON.stringify($page, null, 2)}</pre>
<p>
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
</p>
