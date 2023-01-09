<script lang="ts">
	import AlbumGrid from '$lib/components/AlbumGrid.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';

	export let data;
	const artist: SpotifyApi.SingleArtistResponse = data.artist;
	const { items: artistAlbums }: SpotifyApi.ArtistsAlbumsResponse = data.artistAlbums;
	const { tracks: artistTopTracks }: SpotifyApi.ArtistsTopTracksResponse = data.artistTopTracks;
	const { artists: artistRelatedArtists }: SpotifyApi.ArtistsRelatedArtistsResponse =
		data.artistRelatedArtists;
</script>

<section>
	<div class="flex justify-center">
		<img src={artist.images[artist.images.length - 1].url} alt={artist.name} class="rounded-full h-40" />
	</div>
	<h1 class="p-3 text-6xl font-bold mb-2">{artist.name}</h1>
</section>
<section>
	<h2 class="p-3 font-bold text-xl">Popular</h2>
	<TrackList tracks={artistTopTracks} />
</section>
<section>
	<h2 class="p-3 font-bold text-xl">Discography</h2>
	<TabGroup>
		<TabList class="flex border-b text-sm font-medium text-gray-500">
			<Tab
				class={({ selected }) =>
					'inline-block p-4 ' +
					(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
				>Albums</Tab
			>
			<Tab
				class={({ selected }) =>
					'inline-block p-4 ' +
					(selected ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-50 hover:text-gray-600')}
				>Singles</Tab
			>
		</TabList>
		<TabPanels>
			<TabPanel>
				<AlbumGrid
					dateMode={true}
					albums={artistAlbums.filter((album) => album.album_type === 'album')}
				/>
			</TabPanel>
			<TabPanel>
				<AlbumGrid
					dateMode={true}
					albums={artistAlbums.filter((album) => album.album_type === 'single')}
				/>
			</TabPanel>
		</TabPanels>
	</TabGroup>
</section>
<!-- <pre>
  {JSON.stringify(artistTopTracks, null, 2)}
</pre>
<pre>
  {JSON.stringify(artistTopTracks, null, 2)}
</pre>
<pre>
  {JSON.stringify(artistRelatedArtists, null, 2)}
</pre> -->
