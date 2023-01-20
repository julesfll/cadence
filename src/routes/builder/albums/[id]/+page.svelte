<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import TextArtistList from '$lib/components/TextArtistList.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { album, tracksWithTempos } = data;
</script>

<Container>
	<div class="flex flex-wrap gap-4 mb-2 items-center">
		{#if album.images.length}
			<img class="shadow-xl h-48 w-48 object-cover" src={album.images[0].url} alt={album.name} />
		{:else}
			<div class="bg-gray-700 grid place-items-center shadow-xl h-48 w-48  object-cover">
				<Icon icon="mdi:album" class="h-1/2 w-1/2 text-slate-50" />
			</div>
		{/if}

		<div class="basis-3/5 flex-grow">
			<p class="text-xs tracking-wide text-gray-500">ALBUM</p>
			<h1 class="text-3xl my-3 font-extrabold leading-none tracking-tight text-gray-900">
				{album.name}
			</h1>
			<p class="text-gray-900 font-bold">
				<TextArtistList includeLinks artists={album.artists} /> &middot {new Date(
					album.release_date
				).getFullYear()} &middot
				{album.tracks.items.length} songs
			</p>
			<a
				href="spotify:album:{album.id}"
				class="text-gray-800 hover:text-gray-600 text-sm mb-2 mt-3 flex items-center"
				><Icon class="inline mr-1 h-5 w-5" icon="mdi:spotify" />Open in Spotify</a
			>
		</div>
	</div>
	<TrackList tracks={tracksWithTempos} showAlbum={false} />
</Container>
