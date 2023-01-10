<script lang="ts">
	export let artist: SpotifyApi.ArtistObjectFull;
</script>

<a
	href={`/builder/artists/${artist.id}`}
	class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		{#if artist.images.length > 0}
			<img
				class="h-full w-full rounded-full object-cover"
				src={artist.images[0].url}
				alt={artist.name}
			/>
		{:else}
			<div class="h-full w-full grid place-items-center bg-gray-700 rounded-full">
				<div class="h-1/3 w-1/3 ">
					<svg
						role="img"
						aria-hidden="true"
						data-testid="artist"
						viewBox="0 0 24 24"
						data-encore-id="icon"
						class="fill-white"
						><path
							d="M13.363 10.474l-.521.625a2.499 2.499 0 00.67 3.766l.285.164a5.998 5.998 0 011.288-1.565l-.573-.33a.5.5 0 01-.134-.754l.52-.624a7.372 7.372 0 001.837-4.355 7.221 7.221 0 00-.29-2.489 5.644 5.644 0 00-3.116-3.424A5.771 5.771 0 006.753 2.87a5.7 5.7 0 00-1.19 2.047 7.22 7.22 0 00-.29 2.49 7.373 7.373 0 001.838 4.355l.518.622a.5.5 0 01-.134.753L3.5 15.444a5 5 0 00-2.5 4.33v2.231h13.54a5.981 5.981 0 01-1.19-2H3v-.23a3 3 0 011.5-2.6l3.995-2.308a2.5 2.5 0 00.67-3.766l-.521-.625a5.146 5.146 0 01-1.188-4.918 3.71 3.71 0 01.769-1.334 3.769 3.769 0 015.556 0c.346.386.608.84.768 1.334.157.562.22 1.146.187 1.728a5.379 5.379 0 01-1.373 3.188zm7.641-1.173a1 1 0 00-1 1v4.666h-1a3 3 0 103 3v-7.666a.999.999 0 00-1.003-1h.003zm-1 8.666a1 1 0 11-1-1h1v1z"
						/></svg
					>
				</div>
			</div>
		{/if}
		<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
			{artist.name}
		</h3>
		<p class="text-sm font-normal text-gray-700">Artist</p>
	</li>
</a>
