<template>
  <div style="position: absolute; top: 100px; right: 400px">
    <h1>Child</h1>
    <pre>{{ state }}</pre>
    <v-text-field v-model="state.value[0].value[0].value" />
    <Grandchild />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api"
import Grandchild from "./Grandchild.vue"
// import { CounterStore, CounterKey } from "./use-counter"
import { SegmentStore, SegmentKey } from "./useSegment"

export default defineComponent({
  components: { Grandchild },
  setup() {
    // const { state } = inject(CounterKey) as CounterStore
    const { state } = inject(SegmentKey) as SegmentStore

    setTimeout(() => {
      state.id = "100"
    }, 2000)

    return { state }
  },
})
</script>
