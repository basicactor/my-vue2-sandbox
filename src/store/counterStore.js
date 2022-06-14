import { defineStore } from "pinia"

export const useCounter = defineStore("counter", {
  //vueで言うとdata()に値する:reactiveなデータ
  state: () => ({
    count: 0,
  }),
  //vueで言うとcomputed()に値する
  getters: {
    doubledCount() {
      return this.count * 2
    },
  },
  //vueで言うとmethods()に値する
  actions: {
    increment() {
      this.count++
    },
  },
})
