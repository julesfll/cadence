<script lang="ts">
	export let level: 'h1' | 'h2' | 'h3' = 'h1';
</script>

{#if level === 'h1'}
	<h1 class="mb-2 text-gray-900 text-5xl font-extrabold leading-none tracking-tight">
		<slot />
	</h1>
{:else if level === 'h2'}
	<h2 class="mb-2 mt-2 text-gray-900 text-4xl font-bold">
		<slot />
	</h2>
{:else if level === 'h3'}
	<h3 class="text-gray-900 text-3xl font-bold">
		<slot />
	</h3>
{/if}
