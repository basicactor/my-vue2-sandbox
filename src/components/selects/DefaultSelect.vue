<template>
  <v-select
    v-model="inputedValue"
    :items="items"
    :placeholder="placeholder"
    outlined
    dense
  />
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, computed } from "@vue/composition-api"

export default defineComponent({
  props: {
    value: [Array, String, Number, Boolean],
    items: Array,
    placeholder: String,
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
