<script lang="ts">
	export let name: string | undefined = undefined;
	export let label = '';
	export let checked: boolean;
</script>

<label class="flex items-center text-sm font-medium text-gray-900">
	<input
		type="checkbox"
		{name}
		bind:checked
		class="focus:ring-3 mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
	/>
	{label}
</label>
