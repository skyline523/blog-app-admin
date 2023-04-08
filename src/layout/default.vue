<template>
  <v-layout>
    <v-navigation-drawer
      theme="dark"
      color="#111827"
      class="px-2"
      width="280"
    >
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
            active-class="active-router"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.meta.icon" class="mr-3"></v-icon>
            </template>

            <v-list-item-title v-text="item.meta.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-main>
      <div class="pa-4 app-main">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import { useUserStore } from '@/store/modules/user'
import { asyncRouter } from '@/router'

const userStore = useUserStore()

const sidebarItem = reactive(asyncRouter)
onMounted(() => {
  userStore.afterLoginAction()
})
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: 100%;
  background: #FAFAFA;
}
.v-list--nav {
  .v-list-item {
    :deep(&__content) {
      color: #9DA4AE;
    }
  }
}
.active-router {
  .v-list-item {
    :deep(&__prepend) {
      color: #1565C0;
    }
    :deep(&__content) {
      color: #ffffff;
    }
  }
}
</style>