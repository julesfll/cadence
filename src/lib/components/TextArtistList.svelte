<script lang="ts">
	export let artists: SpotifyApi.ArtistObjectSimplified[];
	export let includeLinks = false;
</script>

{#each artists as artist, i}
	{#if includeLinks}
		<a class="hover:underline" href="/builder/artists/{artist.id}">{artist.name}</a>
	{:else}
		{artist.name}
	{/if}
	{#if i < artists.length - 1}{', '}{/if}
{/each}
