<script lang="ts">
  import { getSavedTracks, getAudioFeatures } from '../services/api';
  import Track from '../components/Track.svelte';
  import type { TrackWithTempo } from '../types';

  let minBpm: number = 170;
  let maxBpm: number = 190;
  let isLoading = false;
  let savedTracks: TrackWithTempo[] = [];

  async function showSavedTracks() {
    isLoading = true;
    const savedTracksRes = await getSavedTracks();
    const audioFeaturesRes = await getAudioFeatures(savedTracksRes);
    savedTracks = savedTracksRes.map((track, i) => {
      return { ...track, tempo: audioFeaturesRes[i].tempo };
    });
    isLoading = false;
  }
  function filterBPM(minBpm: number, maxBpm: number, tracks: TrackWithTempo[]) {
    return tracks.filter(
      ({ tempo }) =>
        (tempo > minBpm && tempo < maxBpm) ||
        (tempo > minBpm / 2 && tempo < maxBpm / 2)
    );
  }
</script>

<section class="section">
  <button on:click={showSavedTracks} class="button" class:is-loading={isLoading}
    >Show saved tracks</button
  >
  <input class="input" type="number" bind:value={minBpm} />
  <input class="input" type="number" bind:value={maxBpm} />
  {#each filterBPM(minBpm, maxBpm, savedTracks) as track}
    <Track {track} />
  {/each}
</section>
