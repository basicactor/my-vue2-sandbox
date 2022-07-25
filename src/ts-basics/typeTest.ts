//@ts-nocheck //エラーを確認したいときはこれを外す
//1. 同じtype名で二つ宣言出来ない。
type Person = {
  name: string
}

type Person = {
  nickName: string
}

export const person: Person = {
  name: "john",
  nickName: "johnney",
}

//2. 外部モジュールからimportしたtypeと同名宣言するとエラーになる。
import { Person2 } from "./personType" //ローカル競合でエラーになる

type Person2 = {
  name: string
}

//3-1.type拡張：通常
type User = {
  id: string
}

type CustomUser = User & {
  name: string
}

export const user: CustomUser = {
  id: "1",
  name: "kevin",
}

//3-2.拡張: 継承元プロパティのタイプと同じタイプで宣言。
type User2 = {
  id: string
}

type CustomUser2 = User2 & {
  id: string
  name: string
}

export const user2: CustomUser2 = {
  id: "1",
  name: "kevin",
}

//3-3.拡張: 継承元プロパティのタイプと別のタイプで宣言（怒られない。naver型になる）
type User3 = {
  id: number
}

type CustomUser3 = User3 & {
  id: string
  name: string
}

//異なる型で宣言したプロパティは、エラーにはならず、naver型になる。
export const user3: CustomUser3 = {
  id: "1",
  name: "kevin",
}
