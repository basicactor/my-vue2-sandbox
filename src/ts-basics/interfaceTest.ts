//@ts-nocheck //エラーを確認したいときはこれを外す

//1. 同じinterface名で二つ宣言した場合は、統合される。
interface Person {
  name: string
}

interface Person {
  nickName: string
}

export const person: Person = {
  name: "john",
  nickName: "johnney",
}

//2. 外部モジュールからimportしたinterfaceと同名宣言するとエラーになる。
import { Person } from "./personInterface" //ローカル競合でエラーになる

interface Person {
  name: string
}

//3-1.interface拡張：通常
interface User {
  id: string
}

interface CustomUser extends User {
  name: string
}

export const user: CustomUser = {
  id: "1",
  name: "kevin",
}

//3-2.拡張: 継承元プロパティのタイプと同じタイプで宣言
interface CustomUser extends User {
  id: string
  name: string
}

export const user2: CustomUser = {
  id: "1",
  name: "kevin",
}

//3-3.拡張: 継承元プロパティのタイプと別のタイプで宣言（怒られる）
interface User2 {
  id: number
}

//継承元プロパティのタイプを変更すると怒られる。
interface CustomUser2 extends User2 {
  id: string
  name: string
}

export const user3: CustomUser2 = {
  id: "1",
  name: "kevin",
}

interface AB {}
