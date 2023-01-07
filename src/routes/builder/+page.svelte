<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData;
</script>
<h1>Library</h1>
<pre>{JSON.stringify(data.playlists, null, 2)}</pre>