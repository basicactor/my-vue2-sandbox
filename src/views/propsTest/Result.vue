<template>
  <div>
    <v-divider></v-divider>
    <div class="d-flex">
      <p class="mr-4">state: {{ stateChanged ? "〇" : "✕" }}</p>
      <p class="mr-4">props:{{ propsChanged ? "〇" : "✕" }}</p>
      <p class="mr-4">watch:{{ watchTriggered ? "〇" : "✕" }}</p>
      <p>deepWatch:{{ deepWatch ? "〇" : "✕" }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    stateChanged: Boolean,
    propsChanged: Boolean,
    watchTriggered: Boolean,
    deepWatch: Boolean, //watchでdeepTrueの場合に動いているか？
  },
  setup() {},
})
</script>
