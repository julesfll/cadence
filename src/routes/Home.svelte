<script lang="ts">
  import { onMount } from 'svelte';
  import { getUserPlaylists } from '../services/api';
  import { link } from 'svelte-routing';
  import PlaylistList from '../components/PlaylistList.svelte';

  let playlists: SpotifyApi.PlaylistObjectFull[] = [];
  let selectedId: string;

  onMount(async () => {
    playlists = await getUserPlaylists();
  });

  function handleSelect(id: string) {
    selectedId = id;
  }
</script>

<section class="section">
  <h1 class="title">Select a playlist</h1>
  {#if selectedId}
    <div class="field">
      <div class="control">
        <a use:link class="button" href={`/playlist/${selectedId}`}>
          Show tracks of {playlists.filter((p) => p.id === selectedId)[0]
            ?.name || 'Liked Songs'}
        </a>
      </div>
    </div>
  {/if}
  <PlaylistList {playlists} onSelect={handleSelect} {selectedId} />
</section>
