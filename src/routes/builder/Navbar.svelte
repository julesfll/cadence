<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import FeedbackForm from '$lib/components/FeedbackForm.svelte';

	export let username: string;
	export let userImage: string;
</script>

<nav class="flex items-center justify-between p-4">
	<div class="flex text-gray-700">
		<a href="/" class="flex items-center">
			<div class="h-6 w-6 ">
				<Icon icon="mdi:music-note-eighth" class="h-6 w-6" />
			</div>
			<span class="mx-3 text-xl font-semibold">Cadence</span>
		</a>
	</div>
	<div class="flex">
		<FeedbackForm />
		<Button href="/builder/search" icon="mdi:search" variant="inverted" />
		<Button href="/builder" icon="mdi:bookshelf" variant="inverted" />
		<Button
			href="/builder/profile"
			image={userImage}
			imageAlt="{username}'s profile picture"
			variant="inverted">{username}</Button
		>
	</div>
</nav>
