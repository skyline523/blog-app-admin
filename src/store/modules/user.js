import { defineStore } from 'pinia';
import router from '@/router';

const useUser = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
    menus: [],
  }),
  actions: {
    async login(email, password) {
      const form = { email, password };
    },
  },
});
