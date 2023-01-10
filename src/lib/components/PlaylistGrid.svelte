<script lang="ts">
	import PlaylistItem from '$lib/components/PlaylistItem.svelte';
	import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
	import { page } from '$app/stores';

	export let playlists: SpotifyApi.PlaylistObjectSimplified[];
	export let showLikedSongs = false;
</script>

<ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
	{#if showLikedSongs}
		<a
			href="/builder/saved"
			class="block rounded-lg border border-gray-200 bg-blue-500 p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
		>
			<li>
				<FaHeart />
				<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">Liked Songs</h3>
				<p class="text-sm font-normal text-gray-700">
					By {$page.data.session?.user?.name ?? ''}
				</p>
			</li>
		</a>
	{/if}
	{#each playlists as playlist}
		<PlaylistItem {playlist} />
	{/each}
</ul>
