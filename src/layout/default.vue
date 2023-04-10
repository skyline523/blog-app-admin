<template>
  <v-layout>
    <v-navigation-drawer theme="dark" color="#1C2536" class="px-2" width="280">
      <v-list class="pt-4">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
          title="Admin"
          subtitle="Leet Programming"
          class="py-2"
          to="/"
          :ripple="false"
        >
        </v-list-item>
      </v-list>

      <v-list :lines="false" nav>
        <v-list-item
          v-for="(item, index) in sidebarItem"
          :key="index"
          :value="item.path"
          :to="item.path"
          :active="item.path === route.path"
          active-class="active-router"
          class="rounded-lg"
        >
          <template #prepend>
            <v-icon :icon="item.meta.icon" class="mr-3"></v-icon>
          </template>

          <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-4 app-main">
        <v-app-bar :elevation="0">
          <template #prepend>
            <v-tooltip text="搜索" location="bottom">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-magnify"></v-btn>
              </template>
            </v-tooltip>
          </template>
          <template #append>
            <v-menu location="bottom">
              <template #activator="{ props }">
                <v-btn icon="mdi-account" v-bind="props"></v-btn>
              </template>

              <v-list class="rounded-lg user-menu" density="compact">
                <v-list-item :title="userInfo.username" :subtitle="userInfo.email" class="pb-4"></v-list-item>
                <v-divider thickness="0.2"></v-divider>
                <v-list-item value="profile" class="rounded-lg ma-2">
                  <template #prepend>
                    <v-icon icon="mdi-account-outline" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>个人空间</v-list-item-title>
                </v-list-item>
                <v-list-item value="setting" class="rounded-lg ma-2">
                  <template #prepend>
                    <v-icon icon="mdi-cog" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>设置</v-list-item-title>
                </v-list-item>
                <v-divider thickness="0.2"></v-divider>
                <div class="mt-2 d-flex justify-center">
                  <v-btn class="" variant="text" @click="Logout">注销</v-btn>
                </div>
              </v-list>
            </v-menu>
          </template>
        </v-app-bar>
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router'

import { useUserStore } from '@/store/modules/user';
import { asyncRouter } from '@/router';

const userStore = useUserStore();
const route = useRoute()

const userInfo = computed(() => userStore.userInfo);

const sidebarItem = reactive(asyncRouter);
onMounted(() => {
  userStore.afterLoginAction();
});

const Logout = () => {
  userStore.logout();
};
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: 100%;
  background: rgb(255 255 255 / 80%);
}


.user-menu {
  width: 200px;
  box-shadow: rgb(0 0 0 / 8%) 0 6px 30px !important;
}

.v-list--nav {
  .v-list-item {
    :deep(&__content) {
      color: #9da4ae;
    }
  }
}

.active-router {
  .v-list-item {
    :deep(&__prepend) {
      color: #1565c0;
    }

    :deep(&__content) {
      color: #fff;
    }
  }
}
</style>
