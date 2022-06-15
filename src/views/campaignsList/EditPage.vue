<template>
  <v-container>
    <pre>{{ item }}</pre>
    This is Edit page
  </v-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    item: Object,
  },
  setup() {},
})
</script>
