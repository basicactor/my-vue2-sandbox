<template>
  <div>
    <svg>
      <circle :cx="cx" :cy="cy" :r="cr" stroke="black" fill="yellow" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import * as d3 from "d3"

export default defineComponent({
  setup() {
    const cx = 50 //x座標
    const cy = 50 //y座標
    const cr = 40 //半径

    return { cx, cy, cr }
  },
})
</script>
