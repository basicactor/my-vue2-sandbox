import axios from "axios"

// eslint-disable-next-line
const useFetch = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:3000",
  // timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
  },
})

const getAsync = async (path) => {
  return await useFetch.get(path)
}

const postAsync = async (path, data) => {
  //dataのJSON.parseは不要
  return await useFetch.post(path, data)
}

export { getAsync, postAsync }
