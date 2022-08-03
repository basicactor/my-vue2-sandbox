<template>
  <div>
    <Child />
    <pre>parent-state:{{ state }}</pre>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  inject,
  onBeforeMount,
} from "@vue/composition-api"
import useSegment, { SegmentStore, SegmentKey } from "./useSegment"
import { Segment, ConditionForm, ConditionValue } from "@/models/segment"
import { getItemByIdAsync } from "@/apis/axios/segmentApi"
import Child from "./Child.vue"

export default defineComponent({
  components: { Child },
  setup() {
    provide(SegmentKey, useSegment())
    const { state } = inject(SegmentKey) as SegmentStore

    const getDataAsync = async () => {
      const result = await getItemByIdAsync()
      state.condition = result.condition
    }

    // setTimeout(() => {
    //   //shallowコピー。逆にこれを利用する。
    //   //でも第一階層のandOrが変更されてもreactiveに変更されるか？
    //   //⇒別の値に代入したらコピーになるけど、この場合代入してないので、
    //   //ただの値変更になる。

    //   //問題点はconstを上書きしていること。当然型チェックも効かない。力技。。
    //   // Object.assign(rootItem, newItem)

    //   //これで解決
    //   state.condition = newSegment.condition
    // }, 2000)

    onBeforeMount(() => getDataAsync())

    return { state }
  },
})
</script>
