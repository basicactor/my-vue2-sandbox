<template>
  <v-btn icon :color="color" absolute @click="() => $emit('click')">
    <v-icon>{{ iconName }} </v-icon>
  </v-btn>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  setup() {},
})
</script>
