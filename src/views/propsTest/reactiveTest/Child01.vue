<template>
  <div class="mt-4">
    <h1>Test {{ testNumber }}: オブジェクトの値が変更される(1)</h1>
    <Result
      :stateChanged="false"
      :propsChanged="true"
      :watchTriggered="false"
      :deepWatch="true"
    />
    <div>state:{{ state }}</div>
    <div>props.item:{{ item }}</div>
  </div>
</template>

<script lang="ts">
//【実験１】
//条件1：Props（Object)をそのままテンプレートで使う
//条件2：stateはpropsを引き継がない

import { defineComponent, reactive, watch } from "@vue/composition-api"
import Result from "../Result.vue"

export default defineComponent({
  components: { Result },
  props: {
    item: Object,
  },
  setup(props) {
    const testNumber = "#1"
    const state = reactive({
      id: "",
      name: "",
    })

    watch(
      () => props.item,
      () => console.log(`test${testNumber}: newVal`),
      { deep: true }
    )
    return { state, testNumber }
  },
})
</script>
