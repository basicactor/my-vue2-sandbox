<template>
  <div>
    <svg height="500" width="500" style="background-color: white">
      <circle
        id="my-circle"
        :cx="cx"
        :cy="cy"
        :r="cr"
        stroke="black"
        fill="yellow"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const cx = 50 //x座標
    const cy = 50 //y座標
    const cr = 40 //半径

    onMounted(() => {
      d3.select<Element, unknown>("#my-circle").call(
        // //arrow関数ではthisの代わりにe.sourceEvent.targetを使うバージョン
        //引数eはD3DragEventだが、genericsの引数を指定しろみたいに出るのでひとまずスルーする
        // d3.drag().on("drag", (e) => {
        //   d3.select(e.sourceEvent.target).attr("cx", e.x).attr("cy", e.y)
        // })

        //thisを使うバージョン：こちらの方が動きがスムーズ
        d3.drag().on("drag", function (e) {
          //arrow関数ではthisの代わりにe.sourceEvent.targetを使う
          d3.select(this).attr("cx", e.x).attr("cy", e.y)
        })
      )
    })

    return {
      cx,
      cy,
      cr,
    }
  },
})
</script>
