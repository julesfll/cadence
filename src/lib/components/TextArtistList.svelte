<script lang="ts">
	export let artists: SpotifyApi.ArtistObjectSimplified[];
</script>

{#each artists as artist, i}
	<a class="hover:underline" href="/builder/artists/{artist.id}">{artist.name}</a
	>{#if i < artists.length - 1}{', '}{/if}
{/each}
