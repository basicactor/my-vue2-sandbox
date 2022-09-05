<template>
  <div>
    <svg id="svg-image" height="500" width="500">
      <!-- rectがないとダウンロードしたsvgのサイズが画面最大サイズになる -->
      <rect width="100%" height="100%" fill="black" />
      <circle :cx="50" :cy="50" :r="40" stroke="black" fill="yellow" />
    </svg>
    <v-btn @click="saveImage($event, 'svgサンプル')">画像保存</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const saveImage = () => {
      const targetSvg = document.getElementById("svg-image")

      if (!targetSvg) return
      const svgText = new XMLSerializer().serializeToString(targetSvg)
      const svgBlob = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8",
      })
      const svgUrl = URL.createObjectURL(svgBlob)

      const a = document.createElement("a")
      a.href = svgUrl
      a.download = "svgサンプル"

      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(svgUrl)
    }
    return { saveImage }
  },
})
</script>
