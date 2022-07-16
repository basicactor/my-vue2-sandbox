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

<script lang="ts">
//@ts-nocheck
import { defineComponent, PropType } from "@vue/composition-api"
import { useCounter } from "@/store/counterStore.js"

interface User {
  id: string
  name: string
}

export default defineComponent({
  props: {
    users: Array as PropType<Array<User>>,
    user: Object as PropType<User>,
  },
  setup() {
    const store = useCounter()

    const upCount = () => {
      store.increment()
    }

    return { store, upCount }
  },
})
</script>
