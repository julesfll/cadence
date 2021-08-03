import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
  baseURL: 'https://accounts.spotify.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const res = await instance.post(
      '/api/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: request.body.code,
        redirect_uri: 'http://localhost:3000/',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      })
    );
    response.send(res.data.access_token);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};
