import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.spotify.com/',
});
// TODO: Wrap data in a data key
export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { url, token, ...data } = request.body;
    const res = await instance.post(url as string, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.send(res.data);
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};
