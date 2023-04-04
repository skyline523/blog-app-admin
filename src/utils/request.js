import axios from 'axios';
import { useNotification } from 'naive-ui';

const notification = useNotification();

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') || '';

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
    if (response.status !== 200) {
      if (response.status === 401) {
        notification.error({
          title: '401',
          content: '登录失效，请重新登录',
        });
      } else if (response.status === 403) {
        notification.error({
          title: '403',
          content: '无权访问',
        });
      } else {
        notification.error({
          title: '000',
          content: '未知错误，请联系管理员',
        });
      }
      return Promise.resolve(response);
    }
  },
  (error) => {
    if (!!error.message) {
      const errorMap = {
        timeout: '网络请求超时，请稍候重试',
        404: '糟糕页面丢失了，请稍候重试',
        500: '当前服务异常，请稍候重试',
      };
      notification({
        title: error.message,
        content: errorMap[error.message],
      });
    } else {
      notification({
        title: '000',
        content: '当前网络繁忙' + error.message,
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
