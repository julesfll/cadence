<script lang="ts">
	import TextArtistList from "./TextArtistList.svelte";

	export let album: SpotifyApi.AlbumObjectSimplified;
	export let dateMode = false;

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<a
	href={`/builder/albums/${album.id}`}
	class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		<img class="h-32 w-32 object-cover" src={album.images[0].url} alt={album.name} />
		<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
			{album.name}
		</h3>
		<p class="text-sm font-normal text-gray-700">
			{#if dateMode}
				{new Date(album.release_date).getFullYear()} • {capitalizeFirstLetter(album.album_type)}
			{:else}
				<TextArtistList artists={album.artists} />
			{/if}
		</p>
	</li>
</a>
