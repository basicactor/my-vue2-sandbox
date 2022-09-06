<template>
  <div>
    <svg
      id="svg-image-zoom"
      :width="width"
      :height="height"
      style="background-color: white"
    >
      <!-- rectがないとダウンロードしたsvgのサイズが画面最大サイズになる -->
      <g id="svg-image-group">
        <!-- <rect width="100%" height="100%" fill="red" /> -->
        <circle :r="50" stroke="black" fill="yellow" cursor="pointer" />
      </g>
    </svg>
    <v-btn @click="resetZoom">reset</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const width = 500
    const height = 500

    //これでなぜがDragも出来る！！！
    const initView = () => {
      // Init SVG container
      const svg = d3.select<Element, unknown>("#svg-image-zoom")
      const container = d3.select("#svg-image-group")

      // Init D3 zoom
      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 10]) //[最小サイズ、最大サイズ]
        .on("zoom", (event) => container.attr("transform", event.transform))

      svg.call(zoom)

      // Center container within SVG
      const centered = d3.zoomIdentity.translate(width / 2, height / 2)
      svg.call(zoom.transform, centered)
    }

    //zoom倍率をリセット
    const resetZoom = () => {
      const imageGroup = d3.select("#svg-image-group")
      imageGroup.attr("transform", `translate(${width / 2},${height / 2})`)
    }

    onMounted(() => {
      initView()
    })
    return { width, height, resetZoom }
  },
})
</script>
