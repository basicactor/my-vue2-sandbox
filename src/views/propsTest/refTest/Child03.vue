<template>
  <div class="mt-4">
    <h1>Test {{ testNumber }}: Refにオブジェクトが再代入される</h1>
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
//条件2：stateはpropsを引き継ぐ
import { defineComponent, reactive, watch } from "@vue/composition-api"
import Result from "../Result.vue"

export default defineComponent({
  components: { Result },
  props: {
    item: Object,
  },
  setup(props) {
    const testNumber = "#3"
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
