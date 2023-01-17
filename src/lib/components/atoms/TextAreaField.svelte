<script lang="ts">
	export let name: string;
	export let value: string | undefined;
	export let label = '';
	export let placeholder: string | undefined = undefined;
	export let required = false;
</script>

<label class="block text-sm font-medium">
	{label}
	<textarea
		class={`${
			label ? 'mt-2' : ''
		} font-normal block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
		{name}
		{placeholder}
		{required}
		bind:value
		rows="2"
	/></label
>
