<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import PlaylistGrid from '$lib/components/PlaylistGrid.svelte';
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- TODO: use enhance (currently breaks tabs) -->
<form action="?/" method="get" class="p-3">
	<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
	<div class="relative">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 "
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</div>
		<input
			type="search"
			name="q"
      value={data.searchQuery}
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
			placeholder="Search"
			required
		/>
		<button
			type="submit"
			class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
			>Search</button
		>
	</div>
</form>

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
	<TabPanels>
		<TabPanel>
			<section>
				<h2 class="px-3 py-1 text-xl font-bold">Songs</h2>
				<TrackList tracks={(data.searchResults?.tracks?.items ?? []).slice(0, 4)} />
				<h2 class="px-3 py-1 text-xl font-bold">Artists</h2>
				<ArtistGrid artists={(data.searchResults?.artists?.items ?? []).slice(0, 4)} />
				<h2 class="px-3 py-1 text-xl font-bold">Playlists</h2>
				<PlaylistGrid playlists={(data.searchResults?.playlists?.items ?? []).slice(0, 4)} />
				<h2 class="px-3 py-1 text-xl font-bold">Albums</h2>
				<AlbumGrid albums={(data.searchResults?.albums?.items ?? []).slice(0, 4)} />
			</section>
		</TabPanel>
		<TabPanel>
			<section>
				<TrackList tracks={data.searchResults?.tracks?.items ?? []} />
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
</TabGroup>
