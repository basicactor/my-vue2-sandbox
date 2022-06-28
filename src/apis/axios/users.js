import { getAsync } from "./index"

const getUsersAsync = async () => {
  const users = await getAsync("/users")
  return users.data
}

export { getUsersAsync }
