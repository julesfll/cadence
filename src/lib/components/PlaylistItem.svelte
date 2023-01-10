<script lang="ts">
	export let playlist: SpotifyApi.PlaylistObjectSimplified;
</script>

<a
	href={`/builder/playlists/${playlist.id}`}
	class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		<img class="h-full w-full object-cover" src={playlist.images[0].url} alt={playlist.name} />
		<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
			{playlist.name}
		</h3>
		<p class="text-sm font-normal text-gray-700">
			By {playlist.owner.display_name}
		</p>
	</li>
</a>
