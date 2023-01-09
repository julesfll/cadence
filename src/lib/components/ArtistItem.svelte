<script lang="ts">
	export let artist: SpotifyApi.ArtistObjectFull;
</script>

<a
	href={`/builder/artists/${artist.id}`}
	class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		<img class="p-1 rounded-full" src={artist.images[0].url} alt={artist.name} />
		<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
			{artist.name}
		</h3>
		<p class="text-sm font-normal text-gray-700">
			Artist
		</p>
	</li>
</a>
