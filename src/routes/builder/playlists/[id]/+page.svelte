<script>
  import TrackList from "$lib/components/TrackList.svelte";

  export let data;
</script>
<h1 class="text-2xl">Track list</h1>
<TrackList tracks= />
<pre>{JSON.stringify(data.tracks, null, 2)}</pre>