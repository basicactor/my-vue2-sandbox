import { reactive } from "@vue/composition-api"
import { InjectionKey } from "@vue/composition-api"

const useCounter = () => {
  // 状態
  const state = reactive<{
    count: number
  }>({
    count: 0,
  })

  // ロジック
  const increment = () => state.count++
  const decrement = () => state.count--

  return {
    state,
    increment,
    decrement,
  }
}

type CounterStore = ReturnType<typeof useCounter>
const CounterKey: InjectionKey<CounterStore> = Symbol("CounterStore")
export default useCounter
export { CounterStore, CounterKey }
