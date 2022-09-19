<template>
  <div>
    <ClickOutsideVanila />
    <DragDivValina />
    <D3Drag />
    <TooltipCloseOutside />
    <SaveImage />
    <ZoomD3 />
    <ZoomVanila v-if="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import D3Drag from "./components/D3Drag.vue"
import SaveImage from "./components/SaveImage.vue"
import TooltipCloseOutside from "./components/TooltipCloseOutside.vue"
import ZoomD3 from "./components/ZoomD3.vue"
import ZoomVanila from "./components/ZoomVanila.vue"
import DragDivValina from "./components/DragDivVanila.vue"
import ClickOutsideVanila from "./components/ClickOutsideVanila.vue"

export default defineComponent({
  components: {
    D3Drag,
    TooltipCloseOutside,
    SaveImage,
    ZoomD3,
    ZoomVanila,
    DragDivValina,
    ClickOutsideVanila,
  },
  setup() {
    return {}
  },
  TooltipCloseOutside,
})
</script>
