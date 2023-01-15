<script lang="ts">
	export let name: string;
	export let value: string | number;
	export let label = '';
	export let placeholder: string | undefined = undefined;
	export let required = false;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let type: 'text' | 'email' | 'number' = 'text';
	export let error = '';

	// https://stackoverflow.com/a/71193441
	function typeAction(node) {
		node.type = type;
	}
</script>

<label class={`text-sm font-medium ${error ? 'text-red-700' : 'text-gray-900'}`}
	>{label}
	<input
		use:typeAction
		{name}
		bind:value
		class={`${label ? 'mt-2' : ''} block w-full rounded-lg border p-2.5 text-sm focus:outline-none ${
			error
				? 'text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
				: 'border-gray-300 bg-gray-50  text-gray-900 focus:border-blue-500  focus:ring-blue-500'
		}`}
		{placeholder}
		{required}
		{min}
		{max}
	/>
	{#if error}
		<p class="mt-2 text-sm font-normal text-red-600">{error}</p>
	{/if}
</label>
