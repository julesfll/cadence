<script lang="ts">
  import Playlist from './Playlist.svelte';
  import { user } from '../stores';
  export let playlists: SpotifyApi.PlaylistObjectFull[];
  export let selectedId;
  export let onSelect;
</script>

<article
  class="media"
  on:click={() => onSelect('saved')}
  class:has-background-primary={'saved' === selectedId}
>
  <figure class="media-left">
    <p class="image is-64x64">
      <img src={$user.images[0]} alt="" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>Liked Songs</strong>
        <br />
        <small>{$user.display_name}</small>
      </p>
    </div>
  </div>
</article>
{#each playlists as playlist}
  <Playlist
    {playlist}
    on:click={() => onSelect(playlist.id)}
    selected={playlist.id === selectedId}
  />
{/each}

<style>
  article {
    cursor: pointer;
  }
</style>
