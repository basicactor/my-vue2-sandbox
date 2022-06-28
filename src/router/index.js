import Vue from "vue"
import VueRouter from "vue-router"
// import { useAuth } from "@/store/authStore"
import { reactiveLocalStorage } from "@/plugins/reactiveLocalStorage"
import HomeView from "../views/HomeView.vue"
import TableMain from "@/views/tableViews/Main.vue"
import TableEdit from "@/views/tableViews/EditPage.vue"
import Counter from "@/views/storeTest/Counter"
import StoreTest from "@/views/storeTest/StoreTest.vue"
import FetchTest from "@/views/storeTest/FetchTest.vue"
import Form from "@/views/forms/Form.vue"
import DynamicForm from "@/views/dynamicForms/DynamicForm.vue"
import Login from "@/views/logins/Login.vue"
import UsersList from "@/views/users/UsersList"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/tableView",
    name: "tableView",
    component: TableMain,
  },
  {
    path: "/tableView/:id/edit",
    name: "tableViewEdit",
    component: TableEdit,
  },
  {
    path: "/counter",
    name: "counter",
    component: Counter,
  },
  {
    path: "/storeTest",
    name: "storeTest",
    component: StoreTest,
  },
  {
    path: "/fetchTest/:id",
    name: "fetchTest",
    component: FetchTest,
  },
  {
    path: "/form",
    name: "form",
    component: Form,
  },
  {
    path: "/dynamicForm",
    name: "dynamicForm",
    component: DynamicForm,
    meta: { requiresAuth: false },
  },
  {
    path: "/usersList",
    name: "usersList",
    component: UsersList,
    meta: { requiresAuth: false },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const { authState } = reactiveLocalStorage()

//ページ遷移毎に認証チェック
router.beforeEach((to, from, next) => {
  const isAuthenticated = authState.value

  // if (from.matched.name === to.matched.name) {
  //   next()
  // }

  //ログイン中にログイン画面に入れないようにする
  if (
    to.matched.some((record) => record.name === "login") &&
    authState.value === true
  ) {
    next("/")
  }

  console.log("from.matched", from.matched)
  console.log("to.matched", to.matched)

  // メタフィールドrequiresAuthがfalseならスルー
  if (to.matched.some((record) => record.meta.requiresAuth === false)) {
    next()
  }
  // それ以外は全てのページで認証チェック
  else if (!isAuthenticated) {
    // 未ログインならログインページへ
    console.log("not login")
    // next({ path: "/login", query: { redirect: to.fullPath } })
    next("/login")
  } else {
    next() // スルー
  }
})

export default router
