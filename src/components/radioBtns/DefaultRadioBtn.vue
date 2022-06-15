<template>
  <div>
    <v-radio-group v-model="selected" row @change="$emit('input', selected)">
      <template v-for="btn in items">
        <v-radio :key="btn.value" :label="btn.label" :value="btn.value" />
      </template>
    </v-radio-group>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api"

export default defineComponent({
  props: {
    items: Array,
  },
  setup() {
    const selected = ref()

    return { selected }
  },
})
</script>
