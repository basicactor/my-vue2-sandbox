import { goToRoute } from "@/router"
import axios from "axios"

// eslint-disable-next-line
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // baseURL: "http://localhost:3000",
  // timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
  },
})

const getAsync = async (path: string) => {
  try {
    const result = await apiClient.get(path)
    // return result.data
    // throw new Error("aaa")
  } catch {
    //500エラーをここで判定して500エラーページに飛ばす。
    goToRoute("/internal-server-error")
  }
}

const postAsync = async <T>(path: string, param: any) => {
  //dataのJSON.parseは不要
  return await apiClient.post<T>(path, param)
}

export { getAsync, postAsync }
