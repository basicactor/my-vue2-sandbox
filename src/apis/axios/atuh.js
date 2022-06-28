import { postAsync } from "./index"

const postAuthAsync = async (id, pw) => {
  const params = { id, pw }
  const users = await postAsync("/auth", params)
  console.log("auth res data", users.data)
  return users.data
}

export { postAuthAsync }
