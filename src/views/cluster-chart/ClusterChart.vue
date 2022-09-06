<template>
  <div>
    <!-- 10個ずつのクラスターIDでページ分け -->
    <ClusterChartA v-if="false" />

    <!-- カテゴリ分け＋10個ずつのクラスターIDでページ分け -->
    <ClusterChartCategory />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import ClusterChartA from "./components/ClusterChartA.vue"
import ClusterChartCategory from "./components/ClusterChartCategory.vue"

export default defineComponent({
  components: {
    ClusterChartA,
    ClusterChartCategory,
  },
  setup() {
    return {}
  },
})
</script>
