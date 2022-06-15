<template>
  <div>
    <h2><slot name="title" /></h2>
    <div><slot name="body" :user="user" /></div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    user: Object,
  },
  setup() {
    return {}
  },
})
</script>
