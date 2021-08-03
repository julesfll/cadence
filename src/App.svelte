<script lang="ts">
  import { onMount } from "svelte";
import { get_all_dirty_from_scope } from "svelte/internal";
  import { getToken, getInfo } from "../services/api";

  let bpm: number = 180;
  const urlParams = new URLSearchParams(window.location.search);

  async function handleGetToken() {
    const res = await getToken(urlParams.get('code'));
    localStorage.setItem('accessToken', res);
    console.log(localStorage.getItem('accessToken'))
  }

  async function handleGetInfo() {
    const res = await getInfo();
    console.log(res);
  }
</script>

<svelte:head>
  <style src="./scss-entrypoint.scss"></style>
</svelte:head>
<main>
  <section class="section">
    <h1 class="title">Cadence</h1>
    <a href="http://localhost:3000/api/spotify-auth">Login with Spotify</a>
    <button on:click={handleGetToken} class="button">Enter code</button>
    <button on:click={handleGetInfo} class="button">Get info</button>
    <div class="field has-addons">
      <div class="control">
        <input type="number" bind:value={bpm} class="input" />
      </div>
      <div class="control">
        <a class="button is-static">BPM</a>
      </div>
    </div>
    <div class="card">
      <div class="card-content">Test</div>
    </div>
    <div class="card">
      <div class="card-content">Test</div>
    </div>
  </section>
</main>
