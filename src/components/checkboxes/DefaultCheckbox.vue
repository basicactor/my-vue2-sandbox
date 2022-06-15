<template>
  <v-container fluid>
    <v-row justify="space-around">
      <template v-for="item in items">
        <v-checkbox
          v-model="selected"
          class="ma-4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          dense
          @change="onChange"
        />
      </template>
    </v-row>
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
