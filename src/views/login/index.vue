<template>
  <div class="card">
    <div class="card_wrapper">
      <v-card class="elevation-16 pa-6">
        <v-card-title class="d-flex flex-column justify-center align-center mb-8">
          <img class="w-25 h-auto" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" />
          <p class="text-h4">Welcome Login</p>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" fast-fail @submit.prevent>
            <v-text-field
              v-model="email"
              class="rounded-pill mb-1"
              clearable
              :rules="emailRules"
              label="邮箱"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="solo"
            ></v-text-field>

            <v-text-field
              v-model="password"
              class="rounded-pill mb-1"
              clearable
              :rules="passwordRules"
              label="密码"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-inner-icon="mdi-lock"
              variant="solo"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-btn
              block
              :loading="isLoading"
              :disabled="isLoading"
              size="large"
              class="mt-6 text-none"
              color="blue-darken-3"
              @click="handleSubmit"
              >登录</v-btn
            >
          </v-form>
        </v-card-text>

        <v-card-text class="d-flex flex-column align-center mt-4">
          <p class="text-caption">或者使用 OAuth 登录(暂不可用)</p>
          <v-divider class="mt-2 mb-4 w-100" />
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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);
const form = ref();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const emailRules = reactive([(value) => !!value || '邮箱不能为空']);
const passwordRules = reactive([(value) => !!value || '密码不能为空']);

const handleSubmit = async () => {
  isLoading.value = true;
  const { valid } = await form.value.validate();

  if (valid) {
    const payload = {
      email: email.value,
      password: password.value,
    };
    await userStore.login(payload).then(() => {
      router.replace('/');
    });

    isLoading.value = false;
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  max-width: 560px;
  height: 650px;

  &_wrapper {
    width: 100%;
    height: 100%;
    padding: 16px;
  }
}
</style>
