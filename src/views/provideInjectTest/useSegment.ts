import { reactive } from "@vue/composition-api"
import { InjectionKey } from "@vue/composition-api"

export type AndOrOperatorType = "and" | "or"
export type StrOperatorType =
  | "eq"
  | "ne"
  | "startWith"
  | "endWith"
  | "include"
  | "exclude"
  | "regex"
export type NumOperatorType = "eq" | "ne" | "gt" | "ge" | "lt" | "le" | ""

export type Condition = {
  id: string
  type: "andOr" //root階層のandOr: カード同士をつなぐ
  operator: AndOrOperatorType //ここはandかor以外は入らない
  value: Array<ConditionCardObj>
}

export type ConditionCardObj = {
  id: string
  type: "andOr" //root階層の一つ下: フォーム同士をつなぐ
  operator: AndOrOperatorType //ここはandかor以外は入らない
  value?: Array<{ id: string } & BaseConditonObj> //フォームの入力オブジェクト
}

export type BaseConditonObj = {
  type: string
  operator: AndOrOperatorType | StrOperatorType | NumOperatorType
  value?: string | number | Array<BaseConditonObj>
}

export default function useSegment() {
  // 状態
  const state = reactive<{ condition: Condition }>({
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
                {
                  type: "page_id",
                  operator: "eq",
                  value: "1",
                },
                {
                  type: "page_frequency",
                  operator: "eq",
                  value: "10",
                },
              ],
            },
            {
              id: "f2",
              type: "param",
              operator: "and",
              value: [
                {
                  type: "param_id",
                  operator: "eq",
                  value: "1",
                },
                {
                  type: "param_frequency",
                  operator: "eq",
                  value: "1",
                },
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
