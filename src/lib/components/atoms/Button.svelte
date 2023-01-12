<script lang="ts">
	import Icon from '@iconify/svelte';

	export let disabled = false;
	export let icon = '';
	// export let href = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	// export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
	class={`inline-flex items-center rounded-lg py-2.5 text-center text-sm font-medium text-white
	${
		disabled
			? 'bg-blue-400 cursor-not-allowed'
			: 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
	}
	${$$slots.default ? 'px-5' : 'px-2.5'}`}
	{type}
	on:click
	{disabled}
>
	{#if icon}
		<div class={`w-5 h-5 ${$$slots.default ? 'mr-2 -ml-1' : ''}`}>
			<Icon {icon} aria-hidden="true" class="w-5 h-5" />
		</div>
	{/if}
	<slot />
</button>
