import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
// import { useAuth } from "@/store/authStore"
// import { reactiveLocalStorage } from "@/plugins/reactiveLocalStorage"
import HomeView from "../views/HomeView.vue"
import TableMain from "@/views/tableViews/Main.vue"
import TableEdit from "@/views/tableViews/EditPage.vue"
import Counter from "@/views/storeTest/Counter.vue"
import StoreTest from "@/views/storeTest/StoreTest.vue"
import FetchTest from "@/views/storeTest/FetchTest.vue"
import Form from "@/views/forms/Form.vue"
import DynamicForm from "@/views/dynamicForms/DynamicForm.vue"
import Login from "@/views/logins/Login.vue"
import UsersList from "@/views/users/UsersList.vue"
import ReactiveTest from "@/views/propsTest/reactiveTest/Parent.vue"
import RefTest from "@/views/propsTest/refTest/Parent.vue"
import DynamicFormProvideTest from "@/views/provideInjectTest/ProvideParent.vue"
import ProvideInjectTest2 from "@/views/provideInjectTest2/Parent.vue"
import CulterChart from "@/views/cluster-chart/ClusterChart.vue"
import AgGridTable from "@/views/ag-grid/AgGridTable.vue"
import D3Sample from "@/views/d3-sample/D3Sample.vue"

Vue.use(VueRouter)
//ログインstateをlocalStorageから取得
// const { authState } = reactiveLocalStorage()
// const isAuthenticated = authState.value

export const routes: Array<RouteConfig> = [
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
    //ログイン中にはアクセスさせない
    // beforeEnter: (to, from, next) => {
    //   if (isAuthenticated) next("/")
    //   else next()
    // },
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
    // meta: { requiresAuth: false },
  },
  {
    path: "/usersList",
    name: "usersList",
    component: UsersList,
    // meta: { requiresAuth: false },
  },
  {
    path: "/reactiveTest",
    name: "reactiveTest",
    component: ReactiveTest,
  },
  {
    path: "/refTest",
    name: "refTest",
    component: RefTest,
  },
  {
    path: "/dynamicFormProvideTest",
    name: "dynamicFormProvideTest",
    component: DynamicFormProvideTest,
  },
  {
    path: "/provideInjectTest2",
    name: "provideInjectTest2",
    component: ProvideInjectTest2,
  },
  {
    path: "/clusterChart",
    name: "clusterChart",
    component: CulterChart,
  },
  {
    path: "/ag-grid-table",
    name: "ag-grid-table",
    component: AgGridTable,
  },
  {
    path: "/d3-sample",
    name: "d3-sample",
    component: D3Sample,
  },
]

export const goToRoute = (path: string) => {
  if (path === router.currentRoute.path) {
    return //同一ルートへのアクセスエラーをもみ消す。
  } else {
    router.push(path)
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

//ページ遷移毎に認証チェック
// router.beforeEach((to, from, next) => {
//   // メタフィールドrequiresAuthがfalseならスルー
//   if (to.matched.some((record) => record.meta.requiresAuth === false)) {
//     next()
//   }
//   // それ以外は全てのページで認証チェック
//   else if (!isAuthenticated) {
//     // 未ログインならログインページへ
//     console.log("not login")
//     next({ path: "/login", query: { redirect: to.fullPath }, replace: true })
//   } else {
//     if (from.name === "login") {
//       // console.log("from", from)

//       next()
//     } else next() // スルー
//   }
// })

export default router
