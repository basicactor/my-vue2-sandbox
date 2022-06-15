<template>
  <v-container fluid>
    <template v-for="item in items">
      <v-checkbox
        v-model="selected"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @change="onChange"
      />
    </template>
  </v-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api"

export default defineComponent({
  props: {
    input: Array,
    items: Array,
  },
  setup(_, { emit }) {
    const selected = ref([])

    const onChange = () => {
      emit("input", selected.value)
    }

    return { selected, onChange }
  },
})
</script>
