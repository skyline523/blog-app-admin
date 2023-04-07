import { createRouter, createWebHashHistory } from 'vue-router';

import baseRouter from './modules/base';
import { useUserStore } from '@/store/modules/user';

const constantRouter = [
  {
    path: '/',
    name: '',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      layout: 'login',
      title: '登录页',
    },
  },
];

const routes = [...baseRouter, ...constantRouter];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (token || to.name === 'Login') {
    next();
  } else {
    next({ name: 'Login' });
  }
});

export default router;
