import { useStorage } from "@vueuse/core"

export const reactiveLocalStorage = () => {
  const authState = useStorage("isAuthenticated", false)

  return { authState }
}
