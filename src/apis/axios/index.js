import axios from "axios"

const useFetch = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
})

const getAsync = async () => {
  const result = await useFetch
}
