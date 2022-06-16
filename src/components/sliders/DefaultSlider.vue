<template>
  <v-slider
    v-model="inputedValue"
    hide-details=""
    :min="min"
    :max="max"
    :thumb-size="thumSize"
    thumb-color="primary"
    thumb-label="always"
  ></v-slider>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    value: [String, Number],
    min: {
      type: String,
      default: "0",
    },
    max: {
      type: String,
      default: "100",
    },
    thumSize: {
      type: String,
      default: "24",
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
