<script lang="ts">
	import type { PageData } from './$types';
	import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
	import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@rgossiaux/svelte-headlessui';

	export let data: PageData;
	const { items: userPlaylists }: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
		data.userPlaylists;
</script>

<div class="p-4">
	<h1 class="text-xl font-bold">Playlists</h1>
</div>
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
				<ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
					<a
						href="/builder/saved"
						class="block rounded-lg border border-gray-200 bg-blue-500 p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
					>
						<li>
							<FaHeart />
							<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
								Liked Songs
							</h3>
						</li>
					</a>
					{#each userPlaylists as playlist (playlist.id)}
						<a
							href={`/builder/playlists/${playlist.id}`}
							class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
						>
							<li>
								<img class="p-1" src={playlist.images[0].url} alt={playlist.name} />
								<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
									{playlist.name}
								</h3>
								<p class="text-sm font-normal text-gray-700">
									By {playlist.owner.display_name}
								</p>
							</li>
						</a>
					{/each}
				</ul>
			</section>
		</TabPanel>
	</TabPanels>
</TabGroup>
