<template>
  <v-sheet width="100vw" height="100vh" :style="{ position: 'absolute' }">
    <v-card width="400px" elevation="1" class="mx-auto">
      <v-form class="pa-10" @submit.prevent="submit">
        <div v-if="authStore.wrongIdPass" class="red--text pb-5">
          IDまたはパスワードが間違っています。
        </div>
        <label>ID</label>
        <DefaultTextField v-model="state.id" label="ID/Emailアドレス" />
        <label>パスワード</label>
        <v-text-field
          v-model="state.password"
          :type="showPw ? 'text' : 'password'"
          outlined
          dense
          :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPw = !showPw"
        />

        <DefaultButton type="submit">ログイン</DefaultButton>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import DefaultButton from "@/components/buttons/DefaultButton.vue"
import { useAuth } from "@/store/authStore.js"
import { useRouter, useRoute } from "@/plugins/router"

export default defineComponent({
  components: { DefaultTextField, DefaultButton },

  // beforeRouteEnter(to, from, next) {
  //   if (authStore.isAuthenticated) {
  //     router.push("/")
  //   } else {
  //     next()
  //   }
  // },
  setup() {
    const state = reactive({
      id: "",
      password: "",
    })

    const showPw = ref(false)

    const route = useRoute()
    const authStore = useAuth()
    const router = useRouter()

    const submit = async () => {
      await authStore.loginAsync(state.id, state.password)
      if (authStore.isAuthenticated) {
        const from = route.redirectedFrom
        console.log("from", from)
        router.push("/")
      }
    }

    return { state, authStore, showPw, submit }
  },
})
</script>
