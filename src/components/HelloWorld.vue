<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="handleIncrement">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <router-link to="/about">About</router-link>
    <v-btn @click="handleIncrement">Vuetify Button</v-btn>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup>
import { computed } from 'vue'

import { useCounter } from '@/store/modules/counter';

const counterStore = useCounter()

defineProps({
  msg: String,
})

const count = computed(() => counterStore.count)

const handleIncrement = () => {
  counterStore.accumulate()
}

const onShowNotify = () => {

}
</script>

<style scoped>
</style>
