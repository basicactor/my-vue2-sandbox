<template>
  <div>
    <h1>Provide Inject Test</h1>
    <v-divider></v-divider>
    <h1>Parent</h1>
    <pre>{{ state }}</pre>
    <Child />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject } from "@vue/composition-api"
import useCounter, { CounterKey } from "./use-counter"
import useSegment, { SegmentStore, SegmentKey } from "./useSegment"
import Child from "./Child.vue"

export default defineComponent({
  components: {
    Child,
  },
  setup() {
    provide(CounterKey, useCounter())
    provide(SegmentKey, useSegment())

    const { state } = inject(SegmentKey) as SegmentStore

    return { state }
  },
})
</script>
