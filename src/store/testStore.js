import { defineStore } from "pinia"

export const useTest = defineStore("test", {
  //vueで言うとdata()に値する:reactiveなデータ
  state: () => ({
    title: "this is Title",
    objArray: [{ name: "john", title: "this is obj title" }],
    childObjArray: [{ title: "select1", mount: "50" }],
    simpleArray: ["aaa", "bbb", "ccc"],
    simpleObj: { name: "john", height: "165" },
    nestedObj: { name: "john", friend: { name: "kevin" } },
    radioBtnSelected: "btn1",
  }),
  //vueで言うとcomputed()に値する
  getters: {
    doubledCount() {
      return this.count * 2
    },
  },
  //vueで言うとmethods()に値する
  actions: {
    increment() {
      this.count++
    },
  },
})
