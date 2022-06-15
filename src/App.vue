<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <router-link to="/campaignList" class="white--text px-2"
        >campainList</router-link
      >
      <router-link to="/counter" class="white--text">counter</router-link>

      <v-icon>mdi-open-in-new</v-icon>
    </v-app-bar>

    <v-main>
      <div class="d-flex">
        <SideNavi />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import SideNavi from "@/layouts/SideNavi.vue"

export default defineComponent({
  name: "App",
  components: {
    SideNavi,
  },
  setup() {
    //localStorageにkey: name, value: jsonで値を追加する
    localStorage.name = JSON.stringify({
      name: "john",
      height: 164,
      weight: 86,
    })
    console.log("local storage", localStorage.name)
    sessionStorage.setItem("name", "john")
    console.log("session storage", sessionStorage.getItem("name"))
  },
})
</script>
