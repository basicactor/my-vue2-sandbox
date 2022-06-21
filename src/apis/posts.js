import { postAsync } from "./index"

const createPostAsync = async (params) => {
  const jsonParams = JSON.stringify(params)
  const res = await postAsync("posts", jsonParams)
  return res
}

export { createPostAsync }
