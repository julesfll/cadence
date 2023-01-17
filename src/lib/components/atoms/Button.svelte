<script lang="ts">
	import Icon from '@iconify/svelte';

	export let disabled = false;
	export let icon = '';
	export let href = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let srText = '';
	export let variant: 'primary' | 'inverted' = 'primary';
	export let ariaControls: string | undefined = undefined;

	const variantStyles = {
		primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
		inverted: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200 active:bg-gray-200'
	};
</script>

{#if !href}
	<button
		class={`inline-flex items-center rounded-lg py-2.5 text-center text-sm focus:ring-4 focus:outline-none font-medium
		${variantStyles[variant]}
		${disabled ? 'cursor-not-allowed bg-blue-400 hover:bg-blue-400' : ''}
		${$$slots.default ? 'px-5' : 'px-2.5'}`}
		{type}
		on:click
		{disabled}
		aria-controls={ariaControls}
	>
		{#if icon}
			<div class={`w-5 h-5 ${$$slots.default ? 'mr-2 -ml-1' : ''}`}>
				<Icon {icon} aria-hidden="true" class="w-5 h-5" />
				<span class="sr-only">{srText}</span>
			</div>
		{/if}
		<slot />
	</button>
{:else}
	<a
		class={`inline-flex items-center rounded-lg py-2.5 text-center text-sm focus:ring-4 focus:outline-none font-medium
		${variantStyles[variant]}
		${$$slots.default ? 'px-5' : 'px-2.5'}`}
		{href}
	>
		{#if icon}
			<div class={`w-5 h-5 ${$$slots.default ? 'mr-2 -ml-1' : ''}`}>
				<Icon {icon} aria-hidden="true" class="w-5 h-5" />
			</div>
		{/if}
		<slot />
	</a>
{/if}
