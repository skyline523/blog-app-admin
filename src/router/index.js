import { createRouter, createWebHashHistory } from 'vue-router';

import { useUserStore } from '@/store/modules/user';

const constantRouter = [
  {
    path: '/',
    name: '',
    redirect: '/dashboard',
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

export const asyncRouter = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
      icon: 'mdi-view-dashboard',
    },
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/post/index.vue'),
    meta: {
      title: '文章',
      icon: 'mdi-post',
    },
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('@/views/tag/index.vue'),
    meta: {
      title: '标签',
      icon: 'mdi-tag',
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index.vue'),
    meta: {
      title: '分类',
      icon: 'mdi-archive',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于',
      icon: 'mdi-account',
    },
  },
];

const routes = [...asyncRouter, ...constantRouter];

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
  const token = userStore.getToken;

  if (token || to.name === 'Login') {
    next();
  } else {
    userStore.resetState();
    next({ name: 'Login' });
  }
});

export default router;
