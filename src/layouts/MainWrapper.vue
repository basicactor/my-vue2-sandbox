<template>
  <v-container class="px-16" :style="{ width: '80%' }">
    <slot />
  </v-container>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {},
})
</script>
