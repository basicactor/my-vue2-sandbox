<template>
  <!-- 別々のvueコンポーネントでstoreの値を変更してみる。（グローバルstate検証) -->
  <!-- Counter.vue とCounter.vue2を利用 -->
  <div class="d-flex">
    <div class="pa-4">
      This is Counter1
      <hr />
      <p class="pt-3">currentCount: {{ store.count }}</p>
      <v-btn @click="upCount">カウントアップ</v-btn>
    </div>
    <div>
      <Counter2 class="pa-4" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import { useCounter } from "@/store/counterStore.js"
import Counter2 from "./Counter2.vue"

export default defineComponent({
  components: {
    Counter2,
  },
  setup() {
    const store = useCounter()

    console.log(store)

    const upCount = () => {
      store.increment()
    }

    return { store, upCount }
  },
})
</script>
