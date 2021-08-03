import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.spotify.com/',
});

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const res = await instance.get(request.query.url as string, {
      params: {},
      headers: {
        'Authorization': `Bearer ${request.query.token}`,
      },
    });
    response.send(res.data);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};
