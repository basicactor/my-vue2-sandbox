import { defineStore } from "pinia"
import { useFetch } from "@vueuse/core"
import { getUsersAsync, getUserByIdAsync } from "@/apis/vueUseFetches/users"
import { createPostAsync } from "@/apis/vueUseFetches/posts"

const baseURL = "https://jsonplaceholder.typicode.com"

export const useFetchTest = defineStore("fetchTest", {
  state: () => ({
    users: [],
    user: {},
    posts: [],
  }),
  getters: {},
  actions: {
    async getUsersAsync() {
      const res = await getUsersAsync()
      this.users = res
    },

    async getUserByIdAsync(id) {
      const res = await getUserByIdAsync(id)
      this.user = res
    },

    //storeから直接APIを投げるバージョン
    async getPostsAsync() {
      const { error, data } = await useFetch(baseURL + "/posts")
        .get()
        .json()
      if (error.value) {
        throw new Error("getPostsAsync failed", error.value)
      }
      // console.log("getPostsAsync", data.value)

      this.posts = data.value
    },

    async sendtPostAsync(params) {
      const res = await createPostAsync(params)
      console.log(res.value)
    },

    // async sendtPostAsync(jsonData) {
    //   const { error, data } = await useFetch(baseURL + "/posts")
    //     .post(JSON.stringify(jsonData))
    //     .text()
    //   if (error.value) {
    //     throw new Error("sendtPostAsync failed", error.value)
    //   }
    //   console.log(data)
    // },
  },
})
