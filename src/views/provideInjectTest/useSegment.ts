import { reactive } from "@vue/composition-api"
import { InjectionKey } from "@vue/composition-api"
import { Segment } from "@/models/segment"

export default function useSegment() {
  // 状態
  const state = reactive<Segment>({
    id: "",
    name: "",
    description: "",
    status: "有効",
    uniqueUserYesterday: "0",
    uniqueUser: "0",
    createAt: "",
    updateAt: "",
    condition: {
      id: "root",
      type: "andOr", //カード同士をつなぐ
      operator: "and",
      value: [
        {
          id: "c1",
          type: "andOr", //フォーム同士をつなぐ
          operator: "and",
          value: [
            {
              id: "f1",
              type: "page",
              operator: "and",
              value: [
                // {
                //   type: "page_id",
                //   operator: "eq",
                //   value: "1",
                // },
                // {
                //   type: "page_frequency",
                //   operator: "eq",
                //   value: "10",
                // },
              ],
            },
            {
              id: "f2",
              type: "param",
              operator: "and",
              value: [
                // {
                //   type: "param_id",
                //   operator: "eq",
                //   value: "1",
                // },
                // {
                //   type: "param_frequency",
                //   operator: "eq",
                //   value: "1",
                // },
              ],
            },
          ],
        },
      ],
    },
  })

  // // ロジック
  // const increment = () => state.count++
  // const decrement = () => state.count--

  return {
    state,
    // increment,
    // decrement,
  }
}

type SegmentStore = ReturnType<typeof useSegment>
const SegmentKey: InjectionKey<SegmentStore> = Symbol("SegmentStore")
export { SegmentStore, SegmentKey }
