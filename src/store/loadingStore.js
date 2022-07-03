import { defineStore } from "pinia"

export const useLoading = defineStore("loading", {
  state: () => ({
    isLoading: true,
  }),
  getters: {},
  actions: {},
})
