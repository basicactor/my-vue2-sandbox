<template>
  <div>
    <D3Drag />
    <TooltipCloseOutside />
    <SaveImage />
    <D3Zoom />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import D3Drag from "./components/D3Drag.vue"
import SaveImage from "./components/SaveImage.vue"
import TooltipCloseOutside from "./components/TooltipCloseOutside.vue"
import D3Zoom from "./components/D3Zoom.vue"

export default defineComponent({
  components: {
    D3Drag,
    TooltipCloseOutside,
    SaveImage,
    D3Zoom,
  },
  setup() {
    return {}
  },
  TooltipCloseOutside,
})
</script>
