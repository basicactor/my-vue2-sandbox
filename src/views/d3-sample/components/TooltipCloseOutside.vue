<template>
  <div style="position: relative">
    <svg height="500" width="500" style="background-color: white">
      <circle
        :cx="50"
        :cy="50"
        :r="40"
        stroke="black"
        fill="yellow"
        @click="() => (isOpenTooltip = true)"
      />
    </svg>
    <!-- v-sheetを使って要素外クリックを実現する -->
    <v-sheet
      v-if="isOpenTooltip"
      style="
        position: absolute;
        width: 200px;
        height: 200px;
        top: 0;
        background-color: black;
      "
      v-click-outside="() => (isOpenTooltip = false)"
    >
      <div style=""></div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const isOpenTooltip = ref(false)

    return {
      isOpenTooltip,
    }
  },
})
</script>
