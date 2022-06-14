<template>
  <div>
    This is Counter2
    <hr />

    <p class="pt-3">currentCount: {{ store.count }}</p>
    <v-btn @click="upCount">カウントアップ</v-btn>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import { useCounter } from "@/store/counterStore.js"

export default defineComponent({
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
