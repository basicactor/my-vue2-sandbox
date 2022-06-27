<template>
  <v-app>
    <Header />
    <v-main>
      <div class="d-flex">
        <SideNavi />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, onErrorCaptured } from "@vue/composition-api"
import SideNavi from "@/layouts/SideNavi.vue"
import Header from "@/layouts/Header.vue"
// import Login from "@/views/logins/Login.vue"
import { useAuth } from "@/store/authStore"
// import { authTest } from "@/plugins/auth"

export default defineComponent({
  name: "App",
  components: {
    SideNavi,
    Header,
    // Login,
  },
  setup() {
    // //localStorageにkey: name, value: jsonで値を追加する
    // localStorage.name = JSON.stringify({
    //   name: "john",
    //   height: 164,
    //   weight: 86,
    // })
    // console.log("local storage", localStorage.name)
    // sessionStorage.setItem("name", "john")
    // console.log("session storage", sessionStorage.getItem("name"))

    const { authenticate } = useAuth()
    authenticate()

    // const auth2 = authTest()
    // console.log("auth.state", auth2.state)

    //storeでキャッチしたエラーをここでキャッチ出来た。
    //Cannot read properties of undefinedとかもキャッチしちゃう。
    //⇒ APIErrorクラスを作って条件分岐するのがいいかな？
    onErrorCaptured((error) =>
      console.log("some error occured. this is App.vue", error)
    )
  },
})
</script>
