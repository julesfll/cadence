// https://medium.com/swlh/modern-oauth-for-single-page-applications-using-pkce-e1cdd2f1b84
// https://gist.github.com/tonyxu-io/21eb57ab2a4aeb2a3ee10f77542abe64
// https://docs.cotter.app/sdk-reference/api-for-other-mobile-apps/api-for-mobile-apps#step-1-create-a-code-verifier
// https://stackoverflow.com/questions/59911194/how-to-calculate-pckes-code-verifier/59913241#59913241
import axios from 'axios';
import qs from 'qs';

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier: string) {
  const hashed = await sha256(codeVerifier);
  return base64urlencode(hashed);
}

function generateRandomString(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// TODO: abstract client id
export const initiateLogin = async () => {
  const state = generateRandomString(12);
  const randInt = Math.floor(Math.random() * (128 - 43 + 1) + 43);
  const codeVerifier = generateRandomString(randInt);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem('spotify-code-verifier', codeVerifier);
  sessionStorage.setItem('spotify-state', state);

  const redirectUrl =
    'https://accounts.spotify.com' +
    axios.getUri({
      url: '/authorize',
      params: {
        response_type: 'code',
        client_id: 'b82520baadfd40e381de6980d7ede7ed',
        redirect_uri: 'http://localhost:3000/auth/',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state,
        scope: 'user-library-read playlist-modify-private',
      },
    });
  window.location.href = redirectUrl;
};

export const getNewAccessToken = async () => {
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'refresh_token',
        client_id: 'b82520baadfd40e381de6980d7ede7ed',
        refresh_token: localStorage.getItem('refresh-token'),
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
      }
    );
    localStorage.setItem('access-token', res.data.access_token);
    localStorage.setItem('refresh-token', res.data.refresh_token);
  } catch (error) {
    console.log(error);
  }

}