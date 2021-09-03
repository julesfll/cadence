<script lang="ts">
  import { onMount } from 'svelte';
  import TrackList from '../components/TrackList.svelte';
  import {
    getPlaylistItems,
    getSavedTracks,
    getAudioFeatures,
    createPlaylist,
    getUserProfile,
  } from '../services/api';
  import RangeSlider from 'svelte-range-slider-pips';
  import type { TrackWithTempo } from '../types';

  onMount(async () => {
    isLoading = true;
    if (id === 'saved') {
      const res = await getSavedTracks();
      loadedTracks = await addTempos(res);
    } else {
      const res = await getPlaylistItems(id);
      loadedTracks = await addTempos(res);
    }
    isLoading = false;
  });

  async function addTempos(tracks: SpotifyApi.TrackObjectFull[]) {
    const res = await getAudioFeatures(tracks);
    return tracks.map((track, i) => {
      return { ...track, tempo: res[i] ? res[i].tempo : null };
    });
  }

  function filterBPM(minBpm: number, maxBpm: number, tracks: TrackWithTempo[]) {
    return tracks.filter(
      ({ tempo }) =>
        (tempo > minBpm && tempo < maxBpm) ||
        (tempo > minBpm / 2 && tempo < maxBpm / 2)
    );
  }

  function addTrack(track: TrackWithTempo) {
    newTracks = [...newTracks, track];
  }

  function removeTrack(trackToRemove: TrackWithTempo) {
    newTracks = newTracks.filter((track) => track !== trackToRemove);
  }

  function addAll() {
    newTracks = Array.from(new Set(newTracks.concat(filteredTracks)));
  }

  async function handleCreatePlaylist() {
    const resUser = await getUserProfile();
    let name = prompt('Enter your playlist name');
    if (name) {
      const res = createPlaylist(resUser.data.id, newTracks, name);
    }
  }

  let isLoading = true;
  let loadedTracks: TrackWithTempo[] = [];
  let newTracks: TrackWithTempo[] = [];
  let bpms = [170, 190];
  $: filteredTracks = filterBPM(bpms[0], bpms[1], loadedTracks);

  export let id: string;
</script>

<section class="section">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <RangeSlider
      min={100}
      max={200}
      float
      range
      pushy
      pips
      first="label"
      last="label"
      bind:values={bpms}
    />
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-5">
            {newTracks.length} track{newTracks.length === 1 ? '' : 's'} selected
          </h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <h2 class="title is-5">
            {filteredTracks.length} / {loadedTracks.length} tracks shown
          </h2>
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field is-grouped">
            <p class="control">
              <button
                class="button"
                on:click={addAll}
                disabled={filteredTracks.every((track) =>
                  newTracks.includes(track)
                )}
              >
                <span class="icon is-small">
                  <i class="fas fa-plus" />
                </span>
                <span>Add All</span>
              </button>
            </p>
            <p class="control">
              <button
                class="button"
                on:click={() => (newTracks = [])}
                disabled={newTracks.length === 0}
              >
                Clear All
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button" on:click={handleCreatePlaylist}
            >Create Playlist</button
          >
        </div>
      </div>
    </div>

    <TrackList
      tracks={filteredTracks}
      {addTrack}
      {removeTrack}
      addedTracks={newTracks}
    />
  {/if}
</section>
