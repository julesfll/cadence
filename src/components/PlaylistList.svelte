<script lang="ts">
  import Playlist from './Playlist.svelte';
  export let playlists: SpotifyApi.PlaylistObjectFull[];
  export let selectedId;
  export let onSelect;
</script>

{#each playlists as playlist}
  <div
    on:click={() => onSelect(playlist.id)}
    class:has-background-primary={playlist.id === selectedId}
  >
    <Playlist {playlist} />
  </div>
{/each}

<style>
  div {
    cursor: pointer;
  }
</style>
