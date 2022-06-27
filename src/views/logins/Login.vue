<template>
  <v-sheet width="100vw" height="100vh" :style="{ position: 'absolute' }">
    <v-card width="30%" flat class="mx-auto">
      <v-form class="pa-10" @submit.prevent="submit">
        <div v-if="authStore.wrongIdPass" class="red--text">
          IDまたはパスワードが間違っています。
        </div>
        <p>id</p>
        <DefaultTextField v-model="state.id" label="ID/Emailアドレス" />
        <p>password</p>
        <v-text-field
          v-model="state.password"
          :type="showPw ? 'text' : 'password'"
          outlined
          dense
          :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPw = !showPw"
        />

        <DefaultButton type="submit">ログイン</DefaultButton>
        authStore.isAuthenticated:{{ authStore.isAuthenticated }}
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import DefaultButton from "@/components/buttons/DefaultButton.vue"
import { useAuth } from "@/store/authStore.js"
import { useRouter } from "@/plugins/router"

export default defineComponent({
  components: { DefaultTextField, DefaultButton },
  setup() {
    const state = reactive({
      id: "",
      password: "",
    })

    const showPw = ref(false)

    const router = useRouter()
    const authStore = useAuth()

    const submit = async () => {
      await authStore.login(state.id, state.password)
      if (authStore.isAuthenticated) {
        router.push("/")
      }
    }

    return { state, authStore, showPw, submit }
  },
})
</script>
