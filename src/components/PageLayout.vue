<template>
  <v-layout class="container">
    <div class="header">
      <v-breadcrumbs :items="matchedRoutes" bg-color="#fff">
        <template #title="{ item }">
          <v-btn variant="text" size="x-small" class="pa-0" @click="handlePush(item.path)">{{ item.meta.title }}</v-btn>
        </template>
        <template #divider>
          <v-icon icon="mdi-circle-small"></v-icon>
        </template>
        <!-- <v-breadcrumbs-title>
          <router-link to="/" class="link">首页</router-link>
        </v-breadcrumbs-title>
        <v-breadcrumbs-title>
          <router-link to="/" class="link">首页</router-link>
        </v-breadcrumbs-title> -->
        <!-- <div v-for="item in matchedRoutes" :key="item.path">
          <v-icon icon="mdi-circle-small"></v-icon>
          <v-breadcrumbs-title :to="item.path">
            <router-link :to="item.path" class="link">{{ item.meta.title }}</router-link>
          </v-breadcrumbs-title>
        </div> -->
      </v-breadcrumbs>
    </div>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const matchedRoutes = route.matched.map((item) => ({
  meta: item.meta,
  name: item.name,
  path: item.path,
}));
matchedRoutes.unshift({
  meta: { title: '首页' },
  name: 'Dashboard',
  path: '/dashboard',
});

const handlePush = (path) => {
  router.push(path);
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.link {
  font-size: 14px;
  font-weight: 500;
  color: #111927;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

:deep(.v-breadcrumbs-divider) {
  padding: 0;
}
</style>
