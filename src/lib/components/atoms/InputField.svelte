<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let required = false;
	export let type: 'text' | 'email' | 'number' = 'text';
	export let error = '';
</script>

<label class={`text-sm font-medium ${error ? 'text-red-700' : 'text-gray-900'}`}
	>{label}
	<input
		{type}
		class={`mt-2 block w-full rounded-lg border p-2.5 text-sm focus:outline-none ${
			error
				? 'text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
				: 'border-gray-300 bg-gray-50  text-gray-900 focus:border-blue-500  focus:ring-blue-500'
		}`}
		{placeholder}
		{required}
	/>
	{#if error}
		<p class="mt-2 text-sm font-normal text-red-600">{error}</p>
	{/if}
</label>