import { defineStore } from "pinia"
import { reactiveLocalStorage } from "@/plugins/reactiveLocalStorage"
import { postAuthAsync } from "@/apis/axios/atuh"

const { authState } = reactiveLocalStorage()

export const useAuth = defineStore("auth", {
  //vueで言うとdata()に値する:reactiveなデータ
  state: () => ({
    isAuthenticated: false,
    wrongIdPass: false,
  }),
  //vueで言うとcomputed()に値する
  getters: {},
  //vueで言うとmethods()に値する
  actions: {
    authenticate() {
      //App.vueで使う。piniaステートは画面更新により値が初期値に戻るため、
      //localStorageから取得してセットする
      if (authState.value === true) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
    async loginAsync(id, pw) {
      const res = await postAuthAsync(id, pw)
      this.isAuthenticated = res.isAuthenticated
      if (this.isAuthenticated) {
        authState.value = true
      } else {
        authState.value = false
      }

      // if (id === "ftoba" && pw === "admin") {
      //   this.isAuthenticated = true
      //   this.wrongIdPass = false
      //   authState.value = true
      // } else {
      //   this.isAuthenticated = false
      //   this.wrongIdPass = true
      // }
    },

    logout() {
      this.isAuthenticated = false
      authState.value = false
    },
  },
})
