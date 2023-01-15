<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen = true;
</script>

<Dialog
	open={isOpen}
	on:close={() => (isOpen = false)}
	class="fixed inset-0 flex items-center justify-center"
>
	<DialogOverlay class="fixed inset-0 bg-black/30" aria-hidden="true" />
	<div class="border z-10 bg-white max-w-sm rounded-lg p-6">
		<DialogTitle><slot name="title">Title needed</slot></DialogTitle>
		<DialogDescription><slot name="description">Description needed</slot></DialogDescription>
		<slot name="content" />
	</div>
</Dialog>
