<template>
  <div class="card">
    <div class="card_wrapper">
      <v-card :loading="isLoading" class="elevation-16 pa-6">
        <v-card-title class="d-flex flex-column justify-center align-center mb-8">
          <img class="w-25 h-auto" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
          <p class="text-h4">Welcome Login</p>
        </v-card-title>
        <v-card-text>
          <v-form fast-fail @submit.prevent ref="form">
            <v-text-field
              class="rounded-pill mb-1"
              clearable
              v-model="email"
              :rules="emailRules"
              label="邮箱"
              type="email"
              prepend-inner-icon="mdi-account"
              variant="solo"
            ></v-text-field>

            <v-text-field
              class="rounded-pill mb-1"
              clearable
              v-model="password"
              :rules="passwordRules"
              label="密码"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-inner-icon="mdi-lock"
              variant="solo"
              @click:appendInner="showPassword = !showPassword"
            ></v-text-field>
            <v-btn
              block
              :disabled="isLoading"
              size="large"
              class="mt-6 text-none"
              color="blue-darken-3"
              @click="handleSubmit"
            >登录</v-btn>
          </v-form>
        </v-card-text>
        
        <v-card-text class="d-flex flex-column align-center mt-4">
          <p class="text-caption">或者使用 OAuth 登录(暂不可以)</p>
          <v-divider class="mt-2 mb-4 w-100"/>
          <div class="d-flex justify-center">
            <v-btn icon="mdi-google" class="mx-2" />
            <v-btn icon="mdi-twitter" class="mx-2" />
            <v-btn icon="mdi-wechat" class="mx-2" />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup name="Login">
import { ref, reactive } from 'vue'

import { register } from '@/api/user'

const isLoading = ref(false)
const form = ref()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailRules = reactive([
  value => !!value || '邮箱不能为空'
])
const passwordRules = reactive([
  value => !!value || '密码不能为空'
])

const handleSubmit = async () => {
  isLoading.value = true
  const { valid } = await form.value.validate()

  if (valid) {
    const payload = {
      email: email.value,
      password: password.value
    }
    const { data } = await register(payload)
    console.log(data)
    if (data.code === 'success')
    isLoading.value = false
  }
}
</script>

<style lang="less" scoped>
.card {
  max-width: 560px;
  width: 100%;
  height: 650px;
  &_wrapper {
    padding: 16px;
    width: 100%;
    height: 100%;
  }
}
</style>