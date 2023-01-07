<script lang="ts">
	export let username: string;
	export let userImage: string;

	import FaMusic from 'svelte-icons/fa/FaMusic.svelte';
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
	import FaBook from 'svelte-icons/fa/FaBook.svelte';
</script>

<nav class="container flex items-center justify-between p-3">
	<div class="flex">
		<a href="/" class="flex items-center">
			<div class="h-6 w-6 ">
				<FaMusic />
			</div>
			<span class="mx-3 text-xl font-semibold">Cadence</span>
		</a>
	</div>
	<div class="flex">
		<button
			type="button"
			class="flex cursor-pointer items-center py-2 px-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<div class="h-5 w-5">
				<FaSearch />
			</div>
			<span class="sr-only">Search</span>
		</button>
		<a
			href="/builder"
			class="flex cursor-pointer items-center border border-black py-2 px-2.5 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<span class="sr-only">Go to library</span>
			<div class="h-5 w-5">
				<FaBook />
			</div>
		</a>
		<a
			href="/builder/profile"
			class="flex cursor-pointer items-center border border-black p-2 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
		>
			<span class="sr-only">Go to profile</span>
			<div class="h-6 w-6">
				<img src={userImage} alt={`${username}'s profile picture`}/>
			</div>
			<span class="text-medium mx-3">{username}</span>
		</a>
	</div>
</nav>