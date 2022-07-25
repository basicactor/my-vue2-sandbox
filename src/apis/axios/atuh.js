// import { postAsync } from "./index"

const postAuthAsync = async (id, pw) => {
  const params = { id, pw }
  console.log("param", params)
  // const users = await postAsync("/auth", params)
  const users = {
    id: "1",
    name: "kevin",
  }
  console.log("auth res data", users.data)
  return users
}

export { postAuthAsync }
