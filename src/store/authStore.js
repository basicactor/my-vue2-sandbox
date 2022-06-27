import { defineStore } from "pinia"
import { reactiveLocalStorage } from "@/plugins/reactiveLocalStorage"

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
    login(id, pw) {
      if (id === "ftoba" && pw === "admin") {
        this.isAuthenticated = true
        this.wrongIdPass = false
        authState.value = true
      } else {
        this.isAuthenticated = false
        this.wrongIdPass = true
      }
    },

    logout() {
      this.isAuthenticated = false
      authState.value = false
    },
  },
})
