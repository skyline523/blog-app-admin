<template>
  <v-app>
    <n-notification-provider placement="bottom-right">
      <component :is="layout" />
    </n-notification-provider>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  return (route.meta.layout || 'default') + '-layout'
})
</script>

<style scoped>
</style>
