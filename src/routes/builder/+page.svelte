<script lang="ts">
	import type { PageData } from './$types';
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import PlaylistGrid from '$lib/components/PlaylistGrid.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	export let data: PageData;
	const { items: userPlaylists } = data.userPlaylists;

	const {
		artists: { items: userArtists }
	} = data.userArtists;

	const userAlbums = data.userAlbums.items.map((albumItem) => albumItem.album);
</script>

<Container>
	<Heading level="h1">Library</Heading>
</Container>
<TabGroup>
	<TabList class="flex border-b text-sm font-medium text-gray-500">
		{#each ['Playlists', 'Artists', 'Albums'] as tabName}
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
				<section>
					<PlaylistGrid playlists={userPlaylists} showLikedSongs={true} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<ArtistGrid artists={userArtists} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<AlbumGrid albums={userAlbums} />
				</section>
			</TabPanel>
		</TabPanels>
	</Container>
</TabGroup>
