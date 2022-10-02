<template>
  <div>
    <pre>{{ state }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "@vue/composition-api"
import { usersApi } from "@/apis/axios/usersApi"

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const state = reactive({
      users: [],
    })
    const getUsers = async () => {
      const users = await usersApi.getUsersAsync()
      // state.users = users
    }

    onBeforeMount(() => {
      getUsers()
    })

    return { state }
  },
})
</script>
