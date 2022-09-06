<template>
  <div>
    <ClusterChartA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import ClusterChartA from "../cluster-chart/ClusterChartA.vue"

export default defineComponent({
  components: {
    ClusterChartA,
  },
  setup() {
    return {}
  },
})
</script>
