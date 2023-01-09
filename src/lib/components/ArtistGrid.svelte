<script lang="ts">
  import ArtistItem from '$lib/components/ArtistItem.svelte';
  export let artists: SpotifyApi.ArtistObjectFull[];
</script>
<ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
  {#each artists as artist (artist.id)}
    <ArtistItem {artist} />
  {/each}
</ul>
