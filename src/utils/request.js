import axios from 'axios';
import { useRouter } from 'vue-router';

// 全局提示框
import { useSnackbarStore } from '@/store/modules/snackbar';
const snackbarStore = useSnackbarStore();
const router = useRouter();

let API_BASE_URL = '';

if (import.meta.env.MODE === 'development') {
  API_BASE_URL = 'http://localhost:5000/api';
} else if ((import.meta.env.MODE = 'production')) {
  API_BASE_URL = 'http://localhost:5000/api/2';
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('TOKEN_KEY') || '';

    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return config;
  },
  (error) => {
    return Promise.error(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 200) {
      if (data.code >= 400 && data.code <= 500) {
        snackbarStore.open({
          content: data.message,
          color: 'red',
        });
        if (data.code === 401) {
          router.replace('/login');
        }
      }
    }
    return Promise.resolve(data);
  },
  (error) => {
    if (!!error.message) {
      snackbarStore.open({
        content: '请求出错',
        color: 'red',
      });
      console.log(error);
    }

    return Promise.reject(error);
  },
);

export default instance;
