<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>