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
  <PlaylistList {playlists} onSelect={handleSelect} {selectedId} />
  {#if selectedId}
    <a use:link class="button" href={`/playlist/${selectedId}`}>
      Show tracks of {playlists.filter((p) => p.id === selectedId)[0].name}
    </a>
  {/if}
</section>
