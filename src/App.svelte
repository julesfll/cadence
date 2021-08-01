<svelte:head>
  <style src="./scss-entrypoint.scss"></style>
</svelte:head>
<script lang="ts">
	let bpm: number = 180;
</script>
<main>
  <section class="section">
    <h1 class="title">Cadence</h1>
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
