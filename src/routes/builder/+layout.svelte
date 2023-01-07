<script>
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import TempoControl from './TempoControl.svelte';

	import { page } from '$app/stores';
</script>

<Navbar
	username={$page.data.session?.user?.name ?? ''}
	userImage={$page.data.session?.user?.image ?? ''}
/>
<main>
	<slot />
</main>
<Footer>
	<TempoControl />
</Footer>
