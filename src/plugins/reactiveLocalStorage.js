//useStorageについて：https://vueuse.org/core/usestorage/#usestorage
//sessionStorageについて：https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage
//タブを閉じたらリセットされる。ページ更新・復元してもデータは残ったまま。
import { useStorage } from "@vueuse/core"

export const reactiveLocalStorage = () => {
  const authState = useStorage("isAuthenticated", false, sessionStorage)
  // const authState = useStorage("isAuthenticated", false)

  return { authState }
}
