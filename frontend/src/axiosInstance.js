import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://google-drive-clone-server.vercel.app/api'
});

// Interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
