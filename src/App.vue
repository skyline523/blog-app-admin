<template>
  <v-app>
    <component :is="layout" />
    <Snackbar />
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Snackbar from '@/components/Snackbar.vue';

const route = useRoute();

const layout = computed(() => {
  return `${route.meta.layout || 'default'}-layout`;
});
</script>

<style>
</style>
