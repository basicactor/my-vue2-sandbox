<template>
  <v-container fluid>
    <v-row>
      <template v-for="(item, index) in items">
        <v-checkbox
          v-model="selected"
          :class="index === 0 ? 'mr-4' : 'mx-4'"
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
