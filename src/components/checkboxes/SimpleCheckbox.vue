<template>
  <v-checkbox
    v-model="selected"
    :value="item.value"
    dense
    hide-details
    @change="onChange"
  >
    <template #label>
      <span :class="labelClass">{{ item.label }}</span>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, ref } from "@vue/composition-api"

export default defineComponent({
  props: {
    input: Boolean,
    item: Object,
    labelClass: String,
  },
  setup(props, { emit }) {
    const selected = ref(props.input)

    const onChange = () => {
      emit("input", selected.value)
    }

    return { selected, onChange }
  },
})
</script>
