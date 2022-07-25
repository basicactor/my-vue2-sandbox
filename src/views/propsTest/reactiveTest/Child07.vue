<template>
  <div class="mt-4">
    <h1>Test {{ testNumber }}: deepオブジェクトの値が変更される</h1>
    <Result
      :stateChanged="true"
      :propsChanged="true"
      :watchTriggered="false"
      :deepWatch="true"
    />
    <div class="d-flex">
      <pre class="px-4">state:{{ state }}</pre>
      <pre class="px-4">props.item:{{ item }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
//【実験１】
//条件1：Props（Object in Array)をそのままテンプレートで使う
//条件2：stateはpropsを引き継ぐ

import { defineComponent, reactive, watch } from "@vue/composition-api"
import Result from "../Result.vue"

export default defineComponent({
  components: { Result },
  props: {
    item: Object,
  },
  setup(props) {
    const testNumber = "#7"
    const state = reactive(
      props.item ?? {
        id: "",
        name: "",
      }
    )
    watch(
      () => props.item,
      () => console.log(`test${testNumber}: newVal`),
      { deep: true }
    )
    return { state, testNumber }
  },
})
</script>
