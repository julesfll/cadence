<script lang="ts">
	export let label = '';
	export let options: string[];
</script>

<label class="block text-sm font-medium text-gray-900"
	>{label}
	<select
		class="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
	>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</label>
