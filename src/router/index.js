import { createRouter, createWebHashHistory } from 'vue-router';

import baseRouter from './modules/base';

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

export default router;
