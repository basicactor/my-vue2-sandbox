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
        @mousedown="dragStart($event)"
        @mousemove="dragMove($event)"
        @mouseup="dragEnd($event)"
        @mouseleave="dragEnd($event)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const cx = ref(50) //x座標
    const cy = ref(50) //y座標
    const cr = 40 //半径

    const isDragging = ref(false)

    const dragStart = () => {
      isDragging.value = true
    }

    const dragMove = (event: MouseEvent) => {
      if (isDragging.value) {
        cx.value = event.offsetX
        cy.value = event.offsetY
      } else return
    }

    const dragEnd = () => {
      isDragging.value = false
    }

    onMounted(() => {
      // d3.select("#my-circle").call(
      //   d3.drag().on("drag", function (e) {
      //     d3.select(this).attr("cx", e.x).attr("cy", e.y)
      //   })
      // )
    })

    return { cx, cy, cr, dragStart, dragMove, dragEnd }
  },
})
</script>
