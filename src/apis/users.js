import { getAsync } from "./index"

const getUsersAsync = async () => {
  const res = await getAsync("users")
  return JSON.parse(res.value)
}

const getUserByIdAsync = async (id) => {
  const res = await getAsync(`users/${id}`)
  // console.log(" getUserByIdAsync res", res)
  return JSON.parse(res.value)
}

export { getUsersAsync, getUserByIdAsync }
