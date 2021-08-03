import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://accounts.spotify.com/',
});

export default (request: VercelRequest, response: VercelResponse) => {
  try {
    const res =
      'https://accounts.spotify.com' +
      instance.getUri({
        url: '/authorize',
        params: {
          response_type: 'code',
          client_id: process.env.CLIENT_ID,
          redirect_uri: 'http://localhost:3000/',
        },
      });
    response.redirect(res);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};
