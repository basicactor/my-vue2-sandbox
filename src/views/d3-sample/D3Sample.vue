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
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const cx = ref(50) //x座標
    const cy = ref(50) //y座標
    const cr = 40 //半径

    // const isDragging = ref(false)

    // const dragStart = () => {
    //   isDragging.value = true
    // }

    // const dragMove = (event: MouseEvent) => {
    //   if (isDragging.value) {
    //     cx.value = event.offsetX
    //     cy.value = event.offsetY
    //   } else return
    // }

    // const dragEnd = () => {
    //   isDragging.value = false
    // }

    onMounted(() => {
      d3.select("#my-circle").call(
        d3.drag().on("drag", (e) => {
          //arrow関数ではthisの代わりにe.sourceEvent.targetを使う
          d3.select(e.sourceEvent.target).attr("cx", e.x).attr("cy", e.y)
        })
      )
    })

    return {
      cx,
      cy,
      cr,
      // dragStart,
      // dragMove,
      //  dragEnd
    }
  },
})
</script>
