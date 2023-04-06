import instance from '@/utils/request';

export const login = (data) => {
  return instance.post('/signin', data);
};

export const register = (data) => {
  return instance.post('/auth/signup', data);
};
