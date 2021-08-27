<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { initiateLogin } from './services/login';
  import { getUserProfile } from './services/api';
  import Home from './routes/Home.svelte';
  import AuthRedirect from './routes/AuthRedirect.svelte';

  let isLoggedIn = false;
  let user: SpotifyApi.UserObjectPublic;
  export let url = '';

  onMount(async () => {
    const res = await getUserProfile();
    console.log(res);
    if (res.data.status !== 401) {
      isLoggedIn = true;
      user = res.data;
    } else if (localStorage.getItem('refresh-token')) {
      // get a new access token and save it in local storage
    }
  });
</script>

<svelte:head>
  <style src="./scss-entrypoint.scss"></style>
</svelte:head>
<main>
  <!-- <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">Cadence</div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">Welcome {'name'}</div>
      </div>
    </div>
  </nav> -->
  {#if isLoggedIn}
    <nav class="container full-width">
      Welcome {user.display_name}
    </nav>
    <Router {url}>
      <Route path="auth" component={AuthRedirect} />
      <Route path="/"><Home /></Route>
    </Router>
  {:else}
    <section class="section">
      <button on:click={initiateLogin} class="button">Login to Spotify</button>
    </section>
  {/if}
</main>
