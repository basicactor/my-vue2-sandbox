<template>
  <v-sheet width="100vw" height="100vh" tag="custom-login">
    <v-card
      width="400px"
      elevation="5"
      rounded
      class="mx-auto"
      :style="{ top: '300px' }"
    >
      <v-container>
        <v-form class="pa-10" @submit.prevent="submit">
          <v-row v-if="authStore.wrongIdPass" class="red--text pb-5">
            IDまたはパスワードが間違っています。
          </v-row>
          <v-row>
            <DefaultTextField v-model="state.id" label="ID" />
          </v-row>
          <v-row>
            <v-text-field
              v-model="state.password"
              :type="showPw ? 'text' : 'password'"
              outlined
              dense
              label="password"
              hide-details
              :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPw = !showPw"
            />
          </v-row>
          <v-row>
            <SimpleCheckbox
              :item="rememberOption"
              labelClass="text-subtitle-2"
            />
          </v-row>
          <v-row>
            <DefaultButton type="submit" class="mt-8">ログイン</DefaultButton>
          </v-row>
          <v-row class="text-caption mt-4">
            <router-link to="/password-reset">
              パスワード忘れた場合
            </router-link>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, reactive, ref } from "@vue/composition-api"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import DefaultButton from "@/components/buttons/DefaultButton.vue"
import SimpleCheckbox from "@/components/checkboxes/SimpleCheckbox"
import { useAuth } from "@/store/authStore.js"
import { useRouter } from "@/plugins/router"

export default defineComponent({
  components: { DefaultTextField, DefaultButton, SimpleCheckbox },

  // beforeRouteEnter(to, from, next) {
  //   console.log("to", to)
  //   to = null
  //   console.log("to2", to)

  //   next((vm) => {
  //     if (vm.$route.query.redirect?.length > 1) {
  //       console.log("this is redirect")
  //       to = null
  //     }
  //   })
  //   // if (authStore.isAuthenticated) {
  //   //   router.push("/")
  //   // } else {
  //   //   next()
  //   // }
  // },
  setup() {
    const state = reactive({
      id: "",
      password: "",
    })

    const showPw = ref(false)

    // const route = useRoute()
    const authStore = useAuth()
    const router = useRouter()

    const submit = async () => {
      await authStore.loginAsync(state.id, state.password)
      if (authStore.isAuthenticated) {
        // router.push("/").catch(() => {})//これでエラーは消せるけど遷移はしない。
        router.push("/")
        console.log(router)
      }
    }

    const rememberOption = {
      label: "remember me",
      value: false,
    }

    return { state, authStore, showPw, rememberOption, submit }
  },
})
</script>

<style lang="scss" scoped>
custom-login {
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
}

.v-label {
  font-size: 16px;
}
</style>
