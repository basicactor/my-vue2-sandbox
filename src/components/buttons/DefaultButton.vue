<template>
  <v-btn depressed color="primary" @click="() => $emit('click')">
    <slot
  /></v-btn>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {},
})
</script>
