import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import TableMain from "@/views/tableViews/Main.vue"
import TableEdit from "@/views/tableViews/EditPage.vue"
import Counter from "@/views/storeTest/Counter"
import StoreTest from "@/views/storeTest/StoreTest.vue"
import FetchTest from "@/views/storeTest/FetchTest.vue"
import Form from "@/views/forms/Form.vue"
import DynamicForm from "@/views/dynamicForms/DynamicForm.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
