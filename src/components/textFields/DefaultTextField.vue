<template>
  <v-text-field
    v-model="inputedValue"
    :label="label"
    :placeholder="placeholder"
    clearable
    dense
    outlined
  ></v-text-field>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api"

export default defineComponent({
  props: {
    value: String,
    label: {
      type: String,
      default: "input",
    },
    placeholder: {
      type: String,
      defualt: "入力してください",
    },
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
