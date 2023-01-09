<script>
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import TempoControl from './TempoControl.svelte';

	import { page } from '$app/stores';
</script>

<div class="flex h-screen flex-col">
	<Navbar
		username={$page.data.session?.user?.name ?? ''}
		userImage={$page.data.session?.user?.image ?? ''}
	/>
	<main class="flex-1 overflow-y-scroll">
		<slot />
	</main>
	<footer class=" w-full border-t border-gray-200 bg-white p-3">
		<TempoControl />
	</footer>
</div>
