<template>
  <v-text-field
    v-model="inputedValue"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    clearable
    dense
    outlined
  ></v-text-field>
</template>

<script lang="ts">
//@ts-nocheck
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
    type: {
      type: String,
      default: "text",
    },
    clearable: {
      type: Boolean,
      default: true,
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
