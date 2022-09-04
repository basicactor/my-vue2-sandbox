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

<script>
import { defineComponent, onMounted } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const cx = 50 //x座標
    const cy = 50 //y座標
    const cr = 40 //半径

    onMounted(() => {
      d3.select("#my-circle").call(
        d3.drag().on("drag", function (e) {
          d3.select(this).attr("cx", e.x).attr("cy", e.y)
        })
      )
    })

    return { cx, cy, cr }
  },
})
</script>
