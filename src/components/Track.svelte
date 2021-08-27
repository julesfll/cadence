<script lang="ts">
  import type { TrackWithTempo } from "../types";
  
  export let track: TrackWithTempo;
</script>

<div>
  {track.name}
  {Math.round(track.tempo)}
</div>
