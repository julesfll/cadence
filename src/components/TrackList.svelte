<script lang="ts">
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import type { TrackWithTempo } from '../types';

  import Track from './Track.svelte';

  export let tracks: TrackWithTempo[];
  export let addTrack;
  export let removeTrack;
  export let addedTracks: TrackWithTempo[];
</script>

<div class="columns">
  <div class="column">
    <VirtualList height="300px" items={tracks} let:item>
      <Track
        track={item}
        {addTrack}
        {removeTrack}
        isAdded={addedTracks.includes(item)}
      />
    </VirtualList>
  </div>
</div>