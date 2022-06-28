<template>
  <div>
    <pre>{{ state }}</pre>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive } from "@vue/composition-api"
import { getUsersAsync } from "@/apis/axios/users"

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const state = reactive({
      users: [],
    })
    const getUsers = async () => {
      const users = await getUsersAsync()
      state.users = users
    }

    onBeforeMount(() => {
      getUsers()
    })

    return { state }
  },
})
</script>
