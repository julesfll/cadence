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

	$: artists = data.searchResults?.artists?.items ?? [];
	$: playlists = data.searchResults?.playlists?.items ?? [];
	$: albums = data.searchResults?.albums?.items ?? [];
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
{#if data.searchQuery}
	<TabGroup>
		<TabList class="flex border-b text-sm font-medium text-gray-500">
			<Tab
				class={({ selected }) =>
					'inline-block p-4 ' +
					(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
				>All</Tab
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
						<TrackList
							tracks={(data.tracksWithTempos ?? []).slice(0, 4)}
							noSongsShownHelper="Try expanding the range or switching to the Songs tab to see more."
						/>
						<Heading level="h2">Artists</Heading>
						<ArtistGrid artists={artists.slice(0, 4)} />
						{#if !artists.length}
							<p class="text-gray-500">No artists found.</p>
						{/if}
						<Heading level="h2">Playlists</Heading>
						<PlaylistGrid playlists={playlists.slice(0, 4)} />
						{#if !playlists.length}
							<p class="text-gray-500">No playlists found.</p>
						{/if}
						<Heading level="h2">Albums</Heading>
						<AlbumGrid albums={albums.slice(0, 4)} />
						{#if !albums.length}
							<p class="text-gray-500">No albums found.</p>
						{/if}
					</section>
				</TabPanel>
				<TabPanel>
					<section>
						<TrackList tracks={data.tracksWithTempos} />
					</section>
				</TabPanel>
				<TabPanel>
					<section>
						<ArtistGrid {artists} />
						{#if !artists.length}
							<p class="text-gray-500">No artists found</p>
						{/if}
					</section>
				</TabPanel>
				<TabPanel>
					<section>
						<PlaylistGrid {playlists} />
						{#if !playlists.length}
							<p class="text-gray-500">No playlists found</p>
						{/if}
					</section>
				</TabPanel>
				<TabPanel>
					<section>
						<AlbumGrid {albums} />
						{#if !albums.length}
							<p class="text-gray-500">No albums found</p>
						{/if}
					</section>
				</TabPanel>
			</TabPanels>
		</Container>
	</TabGroup>
{/if}
