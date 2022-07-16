<template>
  <v-sheet v-show="isLoading">
    <v-overlay color="white" opacity="0.6">
      <div class="loading d-flex">
        <div class="loading-bar mx-1" v-for="n in 4" :key="n" />
      </div>
    </v-overlay>
  </v-sheet>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"
import { useLoading } from "@/store/loadingStore"
import { storeToRefs } from "pinia"

export default defineComponent({
  setup() {
    //分割代入するときは、storeToRefsを使う。
    const { isLoading } = storeToRefs(useLoading())

    return { isLoading }
  },
})
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
}
.loading-bar {
  display: inline-block;
  width: 4px;
  height: 18px;
  border-radius: 4px;
  animation: loading 1s ease-in-out infinite;
}
.loading-bar:nth-child(1) {
  background-color: #3498db;
  animation-delay: 0;
}
.loading-bar:nth-child(2) {
  background-color: #c0392b;
  animation-delay: 0.09s;
}
.loading-bar:nth-child(3) {
  background-color: #f1c40f;
  animation-delay: 0.18s;
}
.loading-bar:nth-child(4) {
  background-color: #27ae60;
  animation-delay: 0.27s;
}

@keyframes loading {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1, 2.2);
  }
  40% {
    transform: scale(1);
  }
}
</style>
