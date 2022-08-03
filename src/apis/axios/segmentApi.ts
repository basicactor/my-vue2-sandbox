// import { postAsync } from "./index"
import { Segment } from "@/models/segment"

const getItemByIdAsync = async () => {
  const item: Segment = {
    id: "",
    name: "",
    description: "",
    status: "有効",
    uniqueUserYesterday: "0",
    uniqueUser: "0",
    createAt: "",
    updateAt: "",
    condition: {
      id: "rootItem",
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
              type: "param",
              operator: "and",
              value: [
                {
                  type: "param_id",
                  operator: "eq",
                  value: "chinese",
                },
                {
                  type: "param_frequency",
                  operator: "eq",
                  value: "1",
                },
              ],
            },
            {
              id: "f2",
              type: "page",
              operator: "and",
              value: [
                {
                  type: "page_id",
                  operator: "eq",
                  value: "movie",
                },
                {
                  type: "page_frequency",
                  operator: "ge",
                  value: "1000",
                },
              ],
            },
          ],
        },
      ],
    },
  }
  return item
}

export { getItemByIdAsync }
