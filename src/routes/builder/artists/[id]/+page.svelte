<script lang="ts">
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ artist, topTracksWithTempos } = data);
	$: ({ items: artistAlbums } = data.artistAlbums);
	$: ({ artists: artistRelatedArtists } = data.artistRelatedArtists);

	$: artistAlbumsAlbum = artistAlbums.filter((album) => album.album_type === 'album');
	$: artistAlbumsSingle = artistAlbums.filter((album) => album.album_type === 'single');
</script>

<Container>
	<section>
		<div class="flex justify-center mb-4">
			<img
				src={artist.images[0].url}
				alt={artist.name}
				class="rounded-full h-40 w-40 object-cover"
			/>
		</div>
		<Heading level="h1">{artist.name}</Heading>
	</section>
	<section>
		<Heading level="h2">Popular</Heading>
		<TrackList tracks={topTracksWithTempos} />
	</section>
</Container>
<section>
	<Container>
		<Heading level="h2">Discography</Heading>
	</Container>
	<TabGroup>
		<TabList class="flex border-b text-sm font-medium text-gray-500">
			{#each ['Albums', 'Singles'] as tabName}
				<Tab
					class={({ selected }) =>
						'inline-block p-4 ' +
						(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
					>{tabName}</Tab
				>
			{/each}
		</TabList>
		<Container>
			<TabPanels>
				<TabPanel>
					<AlbumGrid someHidden dateMode={true} albums={artistAlbumsAlbum} />
					{#if artistAlbumsAlbum.length === 0}
						<p class="text-gray-500">There are no albums for this artist.</p>
					{/if}
				</TabPanel>
				<TabPanel>
					<AlbumGrid someHidden dateMode={true} albums={artistAlbumsSingle} />
					{#if artistAlbumsSingle.length === 0}
						<p class="text-gray-500">There are no singles for this artist.</p>
					{/if}
				</TabPanel>
			</TabPanels>
		</Container>
	</TabGroup>
</section>
<Container>
	<section>
		<Heading level="h2">Fans also like</Heading>
		<!-- TODO: artists not loading properly when link clicked -->
		<ArtistGrid artists={artistRelatedArtists} someHidden />
		{#if artistRelatedArtists.length === 0}
			<p class="text-gray-500">There are no related artists for this artist.</p>
		{/if}
	</section>
</Container>
