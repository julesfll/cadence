<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import PlaylistGrid from '$lib/components/PlaylistGrid.svelte';
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import type { PageData } from './$types';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import SearchField from '$lib/components/atoms/SearchField.svelte';

	export let data: PageData;
</script>

<!-- TODO: use enhance (currently breaks tabs) -->
<Container>
	<form action="?/" method="get">
		<SearchField
			name="q"
			placeholder="Find songs, playlists, and more"
			required
			value={data.searchQuery}
		/>
	</form>
</Container>
<TabGroup>
	<TabList class="flex border-b text-sm font-medium text-gray-500">
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}>All</Tab
		>
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
			>Songs</Tab
		>
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
			>Artists</Tab
		>
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
			>Playlists</Tab
		>
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
			>Albums</Tab
		>
	</TabList>
	<Container>
		<TabPanels>
			<TabPanel>
				<section>
					<Heading level="h2">Songs</Heading>
					<TrackList tracks={data.tracksWithTempos.slice(0, 4)} />
					<Heading level="h2">Artists</Heading>
					<ArtistGrid artists={(data.searchResults?.artists?.items ?? []).slice(0, 4)} />
					<Heading level="h2">Playlists</Heading>
					<PlaylistGrid playlists={(data.searchResults?.playlists?.items ?? []).slice(0, 4)} />
					<Heading level="h2">Albums</Heading>
					<AlbumGrid albums={(data.searchResults?.albums?.items ?? []).slice(0, 4)} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<TrackList tracks={data.tracksWithTempos} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<ArtistGrid artists={data.searchResults?.artists?.items ?? []} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<PlaylistGrid playlists={data.searchResults?.playlists?.items ?? []} />
				</section>
			</TabPanel>
			<TabPanel>
				<section>
					<AlbumGrid albums={data.searchResults?.albums?.items ?? []} />
				</section>
			</TabPanel>
		</TabPanels>
	</Container>
</TabGroup>
