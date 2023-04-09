import { defineStore } from 'pinia';
import router from '@/router';

import { useSnackbarStore } from '@/store/modules/snackbar';
import { login, getUserInfo } from '@/api/user';

const snackbarStore = useSnackbarStore();

export const useUserStore = defineStore('user', {
  id: 'user',
  state: () => ({
    token: undefined,
    userInfo: null,
    menus: [],
    sessionTimeout: false, // session过期时间
    lastUpdateTime: 0, // 最后请求时间
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo || sessionStorage.getItem('USER_INFO_KEY');
    },
    getToken(state) {
      return state.token || sessionStorage.getItem('TOKEN_KEY');
    },
    getSessionTimeout(state) {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state) {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(info) {
      this.token = info || '';
      sessionStorage.setItem('TOKEN_KEY', info);
    },
    setUserInfo(info) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.token = '';
      this.userInfo = null;
      this.menus = [];
      this.sessionTimeout = false;
      sessionStorage.clear();
    },
    async login(payload) {
      const res = await login(payload);

      if (res.code === 200) {
        this.setToken(res.data.token);
        snackbarStore.open({
          content: '登录成功',
          color: 'blue',
        });

        // this.afterLoginAction(true);
        return Promise.resolve();
      }
    },
    async afterLoginAction() {
      if (!this.getToken) return null;

      const res = await getUserInfo();

      if (res.code === 200) {
        this.setUserInfo(res.data);

        // 是否跳转：从登录页进入需要跳转；刷新页面不需要跳转
        // if (isGoto) {
        //   router.replace('/');
        // }
      }
    },
    logout() {
      this.resetState();
      router.replace('/login');
    },
  },
});
