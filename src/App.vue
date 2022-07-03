<template>
  <v-app>
    <Header />
    <v-main>
      <div>
        <SideNavi />
        <MainWrapper>
          <BaseLoading />
          <router-view />
        </MainWrapper>
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
import MainWrapper from "@/layouts/MainWrapper"
import BaseLoading from "@/components/loadings/BaseLoading"
import { useLoading } from "@/store/loadingStore"

export default defineComponent({
  name: "App",
  components: {
    SideNavi,
    Header,
    MainWrapper,
    // Login,
    BaseLoading,
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

    const loadingStore = useLoading()

    setTimeout(() => {
      loadingStore.isLoading = false
      console.log("1000")
      console.log("loadingStore", loadingStore)
    }, 1000)

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
