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
    },
    async login(payload) {
      const res = await login(payload);

      if (res.code === 200) {
        this.setToken(res.data.token);
        this.afterLoginAction(true);
      }
    },
    async afterLoginAction(isGoto) {
      if (!this.getToken) return null;

      const res = await getUserInfo();

      if (res.code === 200) {
        this.setUserInfo(res.data);
        snackbarStore.open({
          content: '登录成功',
          color: 'blue',
        });
        // 是否跳转：从登录页进入获取用户信息需要跳转；刷新页面获取用户信息不需要跳转
        if (isGoto) {
          router.replace('/');
        }
      }
    },
    logout() {
      this.resetState();
      router.replace('/login');
    },
  },
});
