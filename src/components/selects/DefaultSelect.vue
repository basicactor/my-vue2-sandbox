<template>
  <v-select v-model="inputedValue" :items="items" outlined dense />
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api"

export default defineComponent({
  props: {
    value: [Array, String, Number, Boolean],
    items: Array,
  },
  setup(props, { emit }) {
    const inputedValue = computed({
      get: () => props.value,
      set: (newVal) => emit("input", newVal),
    })

    return { inputedValue }
  },
})
</script>
