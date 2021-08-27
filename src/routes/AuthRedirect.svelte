<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import qs from 'qs';
  import { navigate } from 'svelte-routing';

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    try {
      const res = await axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://localhost:3000/auth/',
          client_id: 'b82520baadfd40e381de6980d7ede7ed',
          code_verifier: sessionStorage.getItem('spotify-code-verifier'),
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;',
          },
        }
      );
      localStorage.setItem('access-token', res.data.access_token);
      localStorage.setItem('refresh-token', res.data.access_token);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  });
</script>

Loading...