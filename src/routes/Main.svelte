<script lang="ts">
  import { onMount } from 'svelte';
  import {
    // getToken,
    getSavedTracks,
    getAudioFeatures,
    createPlaylist,
  } from '../services/api';
  import Track from '../components/Track.svelte';
  import type { TrackWithTempo } from '../types';

  let bpm: number = 180;
  let savedTracks: TrackWithTempo[] = [];
  const urlParams = new URLSearchParams(window.location.search);

  async function handleGetToken() {
    // const res = await getToken(urlParams.get('code'));
    // localStorage.setItem('accessToken', res);
    console.log(localStorage.getItem('accessToken'));
  }

  async function showSavedTracks() {
    const savedTracksRes = await getSavedTracks();
    const audioFeaturesRes = await getAudioFeatures(savedTracksRes);
    savedTracks = savedTracksRes.map((track, i) => {
      return { ...track, tempo: audioFeaturesRes[i].tempo };
    });
  }

  async function handleCreatePlaylist() {
    const res = await createPlaylist(filterBPM(180, savedTracks));
    console.log(res);
  }

  function filterBPM(bpm: number, tracks: TrackWithTempo[]) {
    return tracks.filter(
      ({ tempo }) =>
        (tempo > 170 && tempo < 190) || (tempo > 170 / 2 && tempo < 190 / 2)
    );
  }
</script>

<main>
  <section class="section">
    <h1 class="title">Cadence</h1>
    <a href="http://localhost:3000/api/login">Login with Spotify</a>
    <button on:click={handleGetToken} class="button">Enter code</button>
    <button on:click={showSavedTracks} class="button">Show saved tracks</button>
    <div class="field has-addons">
      <div class="control">
        <input type="number" bind:value={bpm} class="input" />
      </div>
      <div class="control">
        <a class="button is-static">BPM</a>
      </div>
    </div>
    {#each filterBPM(180, savedTracks) as track}
      <Track {track} />
    {/each}
    <button on:click={handleCreatePlaylist} class="button"
      >Create Playlist</button
    >
  </section>
</main>
