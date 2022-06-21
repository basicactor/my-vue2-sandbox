import { createFetch } from "@vueuse/core"

//https://developer.mozilla.org/ja/docs/Web/API/Fetch_API (本家)
//https://nishinatoshiharu.com/compare-fetch-axios/
//fetch APIはステータスコードに関係なく、fullfilledのPromiseオブジェクトを返す。
// if(reporense.ok)で判断する
// スタータスコードなしのエラー（ネットワークエラーなど）の時は、rejectedのpromiseオブジェクトを返す
const useCustomFetch = createFetch({
  baseUrl: "https://jsonplaceholder.typicode.com",
  options: {
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
  fetchOptions: {
    mode: "cors",
  },
})

const getAsync = async (path) => {
  const { data, error, statusCode } = await useCustomFetch(path).get()
  if (error.value) {
    throw new Error(`error occured: ${statusCode.value}`)
  }
  // 機能しない
  // onFetchError((error) => {
  //   throw new Error(`error occured: ${error}`)
  // })
  return data
}

const postAsync = async (path, params) => {
  const { data, error, statusCode } = await useCustomFetch(path).post(params)
  if (error.value) {
    throw new Error(`error occured: ${statusCode.value}`)
  }
  return data
}

const patchAsync = async (path, params) => {
  return await useCustomFetch(path).patch(params)
}

const deleteAsync = async (path, params) => {
  return await useCustomFetch(path).delete(params)
}

export { getAsync, postAsync, patchAsync, deleteAsync }
