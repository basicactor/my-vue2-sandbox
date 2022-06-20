<template>
  <div>
    <v-radio-group v-model="inputedValue" row dense>
      <template v-for="btn in items">
        <v-radio :key="btn.value" :label="btn.label" :value="btn.value" />
      </template>
    </v-radio-group>
  </div>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    value: String,
    items: Array,
  },
  setup(props, { emit }) {
    const inputedValue = computed({
      get: () => props.value,
      set: (newValue) => emit("input", newValue),
    })

    return { inputedValue }
  },
})
</script>
