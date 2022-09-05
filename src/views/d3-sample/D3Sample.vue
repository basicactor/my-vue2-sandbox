<template>
  <div>
    <D3Drag />
    <TooltipCloseOutside />
    <SaveImage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import D3Drag from "./components/D3Drag.vue"
import SaveImage from "./components/SaveImage.vue"
import TooltipCloseOutside from "./components/TooltipCloseOutside.vue"

export default defineComponent({
  components: {
    D3Drag,
    TooltipCloseOutside,
    SaveImage,
  },
  setup() {
    return {}
  },
  TooltipCloseOutside,
})
</script>
