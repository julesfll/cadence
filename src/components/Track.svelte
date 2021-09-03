<script lang="ts">
  import type { TrackWithTempo } from '../types';
  import { onMount } from 'svelte';

  function onListenEnter() {
    a = new Audio(track.preview_url);
    a.play();
    isPlaying = true;
  }

  function onListenLeave() {
    a.pause();
    a.currentTime = 0;
    isPlaying = false;
  }

  let a: HTMLAudioElement;
  let isPlaying = false;

  export let track: TrackWithTempo;
  export let addTrack;
  export let removeTrack;
  export let isAdded = false;
</script>

<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src={track.album.images[track.album.images.length - 1].url} alt="" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{track.name}</strong>
        <br />
        <small>{track.artists.map((artist) => artist.name).join(', ')}</small>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <div
          class="level-item"
          on:mouseenter={onListenEnter}
          on:mouseleave={onListenLeave}
        >
          <span class="icon is-small" class:has-text-primary={isPlaying}
            ><i class="fas fa-headphones" /></span
          >
        </div>
        <div class="level-item">
          <a href={track.uri} class="icon is-small has-text-dark">
            <i class="fas fa-external-link-alt" />
          </a>
        </div>
        <div class="level-item">
          <small>{Math.round(track.tempo)} BPM</small>
        </div>
      </div>
    </nav>
  </div>
  <div class="media-right">
    {#if isAdded}
      <button class="button is-primary" on:click={removeTrack(track)}>
        <span class="icon is-small">
          <i class="fas fa-check" />
        </span>
      </button>
    {:else}
      <button class="button" on:click={addTrack(track)}>
        <span class="icon is-small">
          <i class="fas fa-plus" />
        </span>
      </button>
    {/if}
  </div>
</article>
