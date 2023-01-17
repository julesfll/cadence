<script>
	import Navbar from './Navbar.svelte';
	import FilterControls from './FilterControls.svelte';

	import { page } from '$app/stores';
	import TrackDrawer from './TrackDrawer.svelte';
</script>

<div class="flex h-screen flex-col">
	<div class="relative flex-grow flex flex-col overflow-y-auto">
		<Navbar
			username={$page.data.session?.user?.name ?? ''}
			userImage={$page.data.session?.user?.image ?? ''}
		/>
		<main class="flex-grow overflow-y-auto overflow-x-auto">
			<slot />
		</main>
		<TrackDrawer />
	</div>
	<FilterControls />
</div>
