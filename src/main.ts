import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import VueCompositionApi from "@vue/composition-api"
import vuetify from "./plugins/vuetify"
import { createPinia, PiniaVuePlugin } from "pinia" // 追加

Vue.use(VueCompositionApi)
Vue.use(PiniaVuePlugin) //追加
const pinia = createPinia()
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  pinia, //追加

  render: function (h) {
    return h(App)
  },
}).$mount("#app")
