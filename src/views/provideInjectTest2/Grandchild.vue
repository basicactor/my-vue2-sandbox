<template>
  <div style="position: absolute; top: 70px; right: -300px">
    <h1>Grandchild</h1>
    <pre>{{ state }}</pre>
    <v-text-field v-model="state.value[0].value[0].value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api"
// import { CounterStore, CounterKey } from "./use-counter"
import { SegmentStore, SegmentKey } from "./useSegment"

export default defineComponent({
  setup() {
    // const { state } = inject(CounterKey) as CounterStore
    const { state } = inject(SegmentKey) as SegmentStore

    return { state }
  },
})
</script>
