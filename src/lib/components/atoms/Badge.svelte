<script lang="ts">
	import Icon from '@iconify/svelte';
	
	export let icon: string;
</script>

<div class="inline-flex items-center bg-gray-200 px-1.5 py-0.5 text-xs font-medium">
	<div class="mr-1 h-3 w-3">
		<Icon {icon} class="h-3 w-3" />
	</div>
	<slot />
</div>
