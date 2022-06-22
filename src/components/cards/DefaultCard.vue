<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <slot name="content" />
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {},
})
</script>
