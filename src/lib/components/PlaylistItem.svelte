<script lang="ts">
	export let playlist: SpotifyApi.PlaylistObjectSimplified;
</script>

<a
	href={`/builder/playlists/${playlist.id}`}
	class="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
>
	<li>
		{#if playlist.images.length > 0}
			<img class="h-full w-full object-cover" src={playlist.images[0].url} alt={playlist.name} />
		{:else}
			<div class="h-full w-full grid place-items-center bg-gray-700">
				<div class="h-1/3 w-1/3 ">
					<svg
						role="img"
						aria-hidden="true"
						viewBox="0 0 24 24"
						data-encore-id="icon"
						class="fill-white"
						><path
							d="M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z"
						/></svg
					>
				</div>
			</div>
		{/if}
		<h3 class="truncate mb-2 mt-2 text-md font-bold tracking-tight text-black">
			{playlist.name}
		</h3>
		<p class="text-sm font-normal text-gray-700">
			By {playlist.owner.display_name}
		</p>
	</li>
</a>
