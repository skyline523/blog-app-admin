<template>
  <v-snackbar v-model="visible">
    {{ snackbarStore.content }}
    <template v-slot:actions>
      <v-btn v-if="showClose" :color="color" variant="text" @click="handleClose">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'

import { useSnackbarStore } from '@/store/modules/snackbar'

const snackbarStore = useSnackbarStore()

const visible = computed(() => snackbarStore.visible)
const color = computed(() => snackbarStore.color)
const showClose = computed(() => snackbarStore.showClose)

const handleClose = () => {
  snackbarStore.close(false)
}
</script>