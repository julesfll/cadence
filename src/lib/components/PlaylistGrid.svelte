<script lang="ts">
	import PlaylistItem from '$lib/components/PlaylistItem.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import CardListGrid from './atoms/CardListGrid.svelte';

	export let playlists: SpotifyApi.PlaylistObjectSimplified[];
	export let showLikedSongs = false;
</script>

<CardListGrid>
	{#if showLikedSongs}
		<a
			href="/builder/saved"
			class="block bg-blue-500 rounded-lg border border-gray-200 p-3 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
		>
			<li>
				<div class="w-full pb-[100%] relative">
					<div class="grid place-items-center absolute top-0 bottom-0 h-full w-full object-cover">
						<Icon icon="mdi:heart" class="h-full w-full" />
					</div>
				</div>
				<h3 class="truncate text-gray-900 mb-1 mt-3 text-md font-bold tracking-tight ">
					Liked Songs
				</h3>
				<p class="truncate text-sm font-normal text-gray-700">
					By {$page.data.session?.user?.name ?? ''}
				</p>
			</li>
		</a>
	{/if}
	{#each playlists as playlist}
		<PlaylistItem {playlist} />
	{/each}
</CardListGrid>
