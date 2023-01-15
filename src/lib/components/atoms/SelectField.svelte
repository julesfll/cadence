<script lang="ts">
	export let name: string;
	export let value: string;
	export let label = '';
</script>

<label class="block text-sm font-medium text-gray-900"
	>{label}
	<select
		{name}
		bind:value
		class="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
	>
		<slot />
	</select>
</label>
