import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({
    count: 1
  }),
  actions: {
    accumulate() {
      this.count++
    }
  }
})
