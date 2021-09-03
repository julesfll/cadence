<script lang="ts">
  import type { TrackWithTempo } from '../types';

  import Track from './Track.svelte';

  export let tracks: TrackWithTempo[];
  export let addTrack;
  export let removeTrack;
  export let addedTracks: TrackWithTempo[];
</script>

<div class="columns">
  <div class="column">
    {#each tracks as track}
      <Track {track} {addTrack} {removeTrack} isAdded={addedTracks.includes(track)} />
    {/each}
  </div>
</div>

<style>
  .column {
    max-height: 65vh;
    overflow-y: scroll;
  }
</style>
