<script lang="ts">
	import Icon from '@iconify/svelte';

	export let href: string;
	export let round = false;
	export let image:
		| {
				src: string;
				alt: string;
		  }
		| undefined = undefined;
	export let placeholderIcon = 'mdi:checkbox-multiple-blank-outline';
</script>

<a
	{href}
	class="block rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		<div class="w-full pb-[100%] relative">
			{#if image}
				<img
					class="absolute top-0 bottom-0 h-full w-full object-cover
					{round ? 'rounded-full' : 'rounded-md'}"
					src={image.src}
					alt={image.alt}
				/>
			{:else}
				<div
					class="bg-gray-700 grid place-items-center absolute top-0 bottom-0 h-full w-full object-cover
					{round ? 'rounded-full' : 'rounded-md'}"
				>
					<Icon icon={placeholderIcon} class="h-1/2 w-1/2 text-slate-50" />
				</div>
			{/if}
		</div>
		<h3 class="truncate text-gray-900 mb-1 mt-3 text-md font-bold tracking-tight ">
			<slot name="title" />
		</h3>
		<p class="truncate text-sm font-normal text-gray-700">
			<slot name="subtitle" />
		</p>
	</li>
</a>
