import { getAsync } from "./apiClient"

const getUsersAsync = async () => {
  const users = await getAsync("/users")
  return users
}

export const usersApi = { getUsersAsync }
