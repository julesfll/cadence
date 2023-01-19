<script lang="ts">
	import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';
	import Container from '$lib/components/atoms/Container.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { formatNumber } from '$lib/utils';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	const { playlist, tracksWithTempos } = data;
</script>

<Container>
	<div class="flex flex-wrap gap-4 mb-2 items-center">
		{#if playlist.images.length}
			<img
				class="shadow-xl h-48 w-48 object-cover"
				src={playlist.images[0].url}
				alt={playlist.name}
			/>
		{:else}
			<div class="bg-gray-700 grid place-items-center shadow-xl h-48 w-48  object-cover">
				<Icon icon="mdi:playlist-music" class="h-1/2 w-1/2 text-slate-50" />
			</div>
		{/if}

		<div class="basis-3/5 flex-grow">
			{#if playlist.public !== null}
				<p class="text-xs tracking-wide text-gray-500">
					{playlist.public ? 'PUBLIC' : 'PRIVATE'} PLAYLIST
				</p>
			{/if}
			<h1 class="text-3xl my-3 font-extrabold leading-none tracking-tight text-gray-900">
				{playlist.name}
			</h1>
			<p class="text-gray-700 mb-4 text-sm sm:text-base">{playlist.description}</p>
			<p class="text-gray-900 font-bold">
				{playlist.owner.display_name} &middot {formatNumber(playlist.followers.total)} likes &middot
				{playlist.tracks.items.length} songs
			</p>
			<a
				href="spotify:playlist:{playlist.id}"
				class="text-gray-800 hover:text-gray-600 text-sm mb-2 mt-3 flex items-center"
				><Icon class="inline mr-1 h-5 w-5" icon="mdi:spotify" />Open in Spotify</a
			>
		</div>
	</div>
	<TrackList tracks={tracksWithTempos} />
</Container>
