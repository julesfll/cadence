import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const getToken = async (code) => {
  try {
    const response = await instance.post('/spotify-token', { code });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getInfo = async () => {
  try {
    const response = await instance.get('/spotify-get', {
      params: {
        url: '/v1/me',
        token: localStorage.getItem('accessToken')
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserPlaylists = async () => {
  try {
    const response = await instance.get('/spotify-get', {
      params: {
        url: '',
        token: localStorage.getItem('accessToken')
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}