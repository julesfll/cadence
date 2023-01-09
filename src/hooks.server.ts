// https://next-auth.js.org/tutorials/refresh-token-rotation
import { SvelteKitAuth } from '@auth/sveltekit';
import Spotify from '@auth/core/providers/spotify';
import { SPOTIFY_ID, SPOTIFY_SECRET } from '$env/static/private';
import type { JWT } from '@auth/core/jwt';

const AUTHORIZATION_URL =
	'https://accounts.spotify.com/authorize?' +
	new URLSearchParams({
		scope: [
			'user-read-email',
			'user-library-read',
			'user-follow-read',
			'playlist-read-private',
			'playlist-modify-private',
			'user-top-read'
		].join(' ')
	});
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const BASIC = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString('base64');

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
	try {
		const response = await fetch(TOKEN_ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${BASIC}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: token.refreshToken
			})
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: 'RefreshAccessTokenError'
		};
	}
}

export const handle = SvelteKitAuth({
	providers: [
		Spotify({
			clientId: SPOTIFY_ID,
			clientSecret: SPOTIFY_SECRET,
			authorization: AUTHORIZATION_URL
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token,
					user
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.error = token.error;

			return session;
		}
	}
});
