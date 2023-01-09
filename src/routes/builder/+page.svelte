<script lang="ts">
	import type { PageData } from './$types';
	import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import ArtistGrid from '$lib/components/ArtistGrid.svelte';
	import PlaylistGrid from '$lib/components/PlaylistGrid.svelte';

	export let data: PageData;
	const { items: userPlaylists }: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
		data.userPlaylists;

	const {
		artists: { items: userArtists }
	}: SpotifyApi.UsersFollowedArtistsResponse = data.userArtists;

	const userAlbums: SpotifyApi.AlbumObjectFull[] = data.userAlbums.items.map(
		(albumItem) => albumItem.album
	);
</script>

<h1 class="p-4 text-xl font-bold">Library</h1>
<TabGroup>
	<TabList class="flex border-b text-sm font-medium text-gray-500">
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
			>Artists</Tab
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
</TabGroup>
