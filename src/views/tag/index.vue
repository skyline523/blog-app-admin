<template>
  <page-layout>
    <div class="page">
      <div class="action px-4">
        <v-card>
          <v-card-text class="d-flex">
            <v-text-field
              label="搜索"
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              density="comfortable"
              :hide-details="true"
              class="pr-4"
              color="blue-darken-3"
              style="max-width: 320px"
            ></v-text-field>
            <v-select
              v-model="select"
              :items="items"
              label="排序"
              variant="outlined"
              density="comfortable"
              :hide-details="true"
              class="pr-4"
              color="blue-darken-3"
              style="max-width: 150px"
            ></v-select>
          </v-card-text>
        </v-card>
      </div>
      <v-container class="mt-4">
        <v-row :gutters="4">
          <v-col
            v-for="n in 9"
            :key="n"
            cols="12"
            sm="4"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 4 : 0"
                :class="{ 'on-hover': isHovering }"
                :color="isHovering ? '#fff' : '#fafafa'"
                :style="{'border': isHovering ? '1px solid transparent' : '1px solid rgb(242, 244, 247)'}"
                v-bind="props"
              >
                <v-card-text>
                  123123
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </page-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'

import PageLayout from '@/components/PageLayout.vue';

const select = ref('最晚创建')

const items = reactive(['最晚创建', '最早创建'])
</script>
