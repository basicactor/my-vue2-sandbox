<template>
  <v-select v-model="inputData" :items="items" />
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api"

export default defineComponent({
  props: {
    items: Array,
  },
  setup(props, { emit }) {
    const inputData = computed({
      get: () => props.input,
      set: (newVal) => emit("input", newVal),
    })

    return { inputData }
  },
})
</script>
