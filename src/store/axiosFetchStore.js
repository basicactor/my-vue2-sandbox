import { defineStore } from "pinia"
import axios from "axios"

const baseURL = "https://jsonplaceholder.typicode.com"

export const useAxiosFetch = defineStore("fetchAxiosTest", {
  state: () => ({
    users: [],
    user: {},
    posts: [],
  }),
  getters: {},
  actions: {
    async getUsersAsync() {
      const res = await axios.get(baseURL + "/users")
      this.users = res
      console.log("res", res)
    },
  },
})
