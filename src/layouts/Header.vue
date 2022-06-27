<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <v-btn v-if="authStore.isAuthenticated" text @click="logout">
      ログアウト
    </v-btn>
    <router-link v-else to="/login" class="white--text">ログイン</router-link>
    <p>{{ authStore.isAuthenticated }}</p>
  </v-app-bar>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import { useAuth } from "@/store/authStore.js"
import { useRouter } from "@/plugins/router"
export default defineComponent({
  setup() {
    const authStore = useAuth()
    const router = useRouter()

    const logout = async () => {
      await authStore.logout()
      router.push("/login")
    }

    return { authStore, logout }
  },
})
</script>
