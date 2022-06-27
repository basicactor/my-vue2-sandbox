<template>
  <v-btn depressed color="primary" :type="type" @click="() => $emit('click')">
    <slot
  /></v-btn>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
  setup() {},
})
</script>
