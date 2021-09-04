<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { getUserProfile } from './services/api';
  import { initiateLogin, getNewAccessToken } from './services/login';
  import Home from './routes/Home.svelte';
  import AuthRedirect from './routes/AuthRedirect.svelte';
  import PlaylistPage from './routes/PlaylistPage.svelte';
  import '@fortawesome/fontawesome-free/js/all.js';

  onMount(async () => {
    try {
      const res = await getUserProfile();
      isLoggedIn = true;
      user = res.data;
    } catch (error) {
      console.error(error);
      if (localStorage.getItem('refresh-token')) {
        await getNewAccessToken();
      }
    }
  });

  let isLoggedIn = false;
  let user: SpotifyApi.UserObjectPublic;

  export let url = '';
</script>

<svelte:head>
  <style src="./sass/global.scss"></style>
</svelte:head>

<Router {url}>
  <main>
    {#if isLoggedIn}
      <nav
        class="level is-mobile"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="level-left">
          <div class="level-item">Cadence</div>
        </div>
        <div class="level-right">
          <div class="level-item">
            Welcome {user.display_name}
          </div>
        </div>
      </nav>
      <Route path="playlist/:id" component={PlaylistPage} />
      <Route path="/" component={Home} />  
    {:else}
      <section class="hero is-fullheight">
        <div class="hero-body">
          <p class="title">
            Cadence
            <button on:click={initiateLogin} class="button"
              >Login to Spotify</button
            >
          </p>
        </div>
      </section>
    {/if}
    <Route path="auth" component={AuthRedirect} />
  </main>
</Router>
