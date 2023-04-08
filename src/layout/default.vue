<template>
  <v-layout>
    <v-navigation-drawer permanent absolute theme="dark" color="#111827">
        <v-list>
          <v-list-item color="white" prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list :lines="false" nav class="py-4">
          <v-list-item
            v-for="(item, index) in sidebarItem"
            :key="index"
            :value="item.path"
            :to="item.path"
            active-color="#2196f3"
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
</style>