<script lang="ts">

  export let playlist:SpotifyApi.PlaylistObjectSimplified;
  export let selected = false;
</script>

<article class="media" on:click class:has-background-primary={selected}>
  <figure class="media-left">
    <p class="image is-64x64">
      <img src={playlist.images[playlist.images.length - 1].url} alt="" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{playlist.name}</strong>
        <br />
        <small>{playlist.owner.display_name}</small>
      </p>
    </div>
  </div>
</article>

