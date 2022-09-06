<template>
  <div>
    <svg
      :viewBox="[viewBox.minX, viewBox.minY, viewBox.width, viewBox.height]"
      width="100"
      height="100"
      style="background-color: white"
    >
      <!-- rectがないとダウンロードしたsvgのサイズが画面最大サイズになる -->
      <!-- <g id="svg-imag-zoom"> -->
      <!-- <rect width="100%" height="100%" fill="red" /> -->
      <circle
        id="circle"
        :cx="0"
        :cy="0"
        :r="20"
        stroke="black"
        fill="yellow"
      />
      <!-- </g> -->
    </svg>
    <v-btn @click="zoom('plus')">+</v-btn>
    <v-btn @click="resetZoom">reset</v-btn>
    <v-btn @click="zoom('minues')">-</v-btn>
    <pre>{{ viewBox }}</pre>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const viewBox = reactive({
      minX: -50,
      minY: -50,
      width: 100,
      height: 100,
    })

    //初期値をreactivityを消してコピー
    const initialViewBox = JSON.parse(JSON.stringify(viewBox))

    //ズームをリセット
    const resetZoom = () => {
      console.log("initialViewBox", initialViewBox)
      Object.assign(viewBox, initialViewBox)
    }

    //ズーム：プラスの時はscale = 0.9, マイナスの時は1.1
    const zoom = (type) => {
      const scale = type === "plus" ? 0.9 : 1.1

      const { minX, minY, width, height } = viewBox

      // 大きさをscale倍する
      const zoomedWidth = width * scale
      const zoomedHeight = height * scale

      // 中心の座標を計算する
      const centerX = minX + width / 2.0
      const centerY = minY + height / 2.0

      // scale倍したあとのmin-xとmin-yを計算する
      const zoomedMinX = centerX - zoomedWidth / 2.0
      const zoomedMinY = centerY - zoomedHeight / 2.0
      viewBox.minX = parseFloat(zoomedMinX.toFixed(2))
      viewBox.minY = parseFloat(zoomedMinY.toFixed(2))
      viewBox.width = parseFloat(zoomedWidth.toFixed(2))
      viewBox.height = parseFloat(zoomedHeight.toFixed(2))
    }

    onMounted(() => {
      // d3.select("#svg-imag-zoom").call(
      //   d3.zoom().on("zoom", function (event) {
      //     console.log("event.transform", event.transform)
      //     d3.select(this).attr("transform", event.transform)
      //     console.log("zooming")
      //   })
      // )
    })

    return { viewBox, zoom, resetZoom }
  },
})
</script>
