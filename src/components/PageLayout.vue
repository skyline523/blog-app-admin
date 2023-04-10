<template>
  <v-layout class="container">
    <div class="header">
      <div class="header_title">文章管理</div>
      <div class="breadcrumb">
        <div class="breadcrumb_item">
          <div class="breadcrumb_item_title">
            <v-btn size="small" variant="text" to="/dashboard">
              首页
            </v-btn>
          </div>
        </div>
        <div class="breadcrumb_item" v-for="(item, index) in matchedRoutes" :key="index">
          <div class="breadcrumb_divider">
            <v-icon icon="mdi-circle-small"></v-icon>
          </div>
          <div class="breadcrumb_item_title">
            <v-btn
              size="small"
              variant="text"
              :disabled="index === matchedRoutes.length - 1"
              @click="handlePush(item.path)"
            >{{ item.meta.title }}</v-btn>
          </div>
        </div>
      </div>
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
const matchedRoutes = route.matched

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

.header {
  margin-bottom: 24px;

  &_title {
    padding: 0 16px;
    font-size: 28px;
    color: #111927;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  padding: 0 8px;

  &_item {
    display: flex;
    align-items: center;

    &_title {
      .v-btn {
        padding: 0;
      }
    }
  }
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
