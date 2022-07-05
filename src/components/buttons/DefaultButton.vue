<template>
  <v-btn
    depressed
    color="primary"
    :width="width"
    :type="type"
    @click="() => $emit('click')"
  >
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
    width: {
      type: String,
      default: "100%",
    },
  },
  setup() {},
})
</script>
