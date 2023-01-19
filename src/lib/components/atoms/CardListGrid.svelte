<script lang="ts">
	import Icon from '@iconify/svelte';

	export let someHidden = false;

	let isHidden = true;
</script>

<ul
	class="{someHidden && isHidden ? 'max-h-96 overflow-hidden' : ''}
		grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 sm:p-1"
>
	<slot />
</ul>
{#if someHidden}
	<button
		class="text-lg text-gray-900 hover:text-gray-500 w-full text-left mt-5 px-2"
		on:click={() => (isHidden = !isHidden)}
	>
		Show {isHidden ? 'More' : 'Less'}
		<Icon icon="mdi:chevron-{isHidden ? 'down' : 'up'}" class="inline-block" />
	</button>
{/if}
