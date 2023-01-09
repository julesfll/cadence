<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import PlaylistItem from '$lib/components/PlaylistItem.svelte';
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';

	export let data;
	const searchResults: SpotifyApi.SearchResponse = data.searchResults;
</script>

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
			>Artists</Tab
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
			>Playlists</Tab
		>
		<Tab
			class={({ selected }) =>
				'inline-block p-4 ' +
				(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
			>Albums</Tab
		>
	</TabList>
	<TabPanels>
		<TabPanel>All</TabPanel>
		<TabPanel>
			<section>
				<TrackList tracks={searchResults.tracks.items} />
			</section>
		</TabPanel>
		<TabPanel>
			<section>
				<ArtistGrid artists={searchResults.artists.items} />
			</section>
		</TabPanel>
		<TabPanel>
			<section>
				<ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
					{#each searchResults.playlists.items as playlist (playlist.id)}
						<PlaylistItem {playlist} />
					{/each}
				</ul>
			</section>
		</TabPanel>
		<TabPanel>
			<section>
				<AlbumGrid albums={searchResults.albums.items} />
			</section>
		</TabPanel>
	</TabPanels>
</TabGroup>
