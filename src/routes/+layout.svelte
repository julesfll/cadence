<script>
	import { page } from "$app/stores";
  import "../app.css";
</script>

<svelte:head>
  <title>{$page.data.meta?.title} - Cadence</title>
  <meta name="description" content="{$page.data.meta?.description}" />
</svelte:head>
<slot />