export type Segment = {
  id: string
  name: string
  description: string
  status: "有効" | "無効"
  uniqueUserYesterday: string
  uniqueUser: string
  createAt: string
  updateAt: string
  condition: SegmentRootCondition
}

export type AndOrOperatorType = "and" | "or"
export type StrOperatorType =
  | "eq"
  | "ne"
  | "startWith"
  | "endWith"
  | "include"
  | "exclude"
  | "regex"
export type NumOperatorType = "eq" | "ne" | "gt" | "ge" | "lt" | "le" | string

export type SegmentRootCondition = {
  id: string
  type: "andOr" //root階層のandOr: カード同士をつなぐ
  operator: AndOrOperatorType //ここはandかor以外は入らない
  value: Array<ConditionCard>
}

export type ConditionCard = {
  id: string
  type: "andOr" //root階層の一つ下: フォーム同士をつなぐ
  operator: AndOrOperatorType //ここはandかor以外は入らない
  value?: Array<ConditionForm> //フォームの入力オブジェクト
}

export type ConditionForm = {
  id: string
  type: string
  operator: "and"
  value?: Array<ConditionValue>
}

export type ConditionValue = {
  type: string
  operator: AndOrOperatorType | StrOperatorType | NumOperatorType
  value?: string | number | Array<ConditionValue>
}
