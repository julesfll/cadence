<script>
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import TempoControl from './TempoControl.svelte';

	import { page } from '$app/stores'; // TODO: is this right? https://authjs.dev/reference/sveltekit/modules/main#per-component
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
