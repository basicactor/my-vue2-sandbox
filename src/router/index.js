import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import CampaignListMain from "@/views/campaignsList/Main.vue"
import CampaignListEdit from "@/views/campaignsList/EditPage.vue"
import Counter from "@/views/storeTest/Counter"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/campaignList",
    name: "campaignList",
    component: CampaignListMain,
    children: [
      {
        path: "edit",
        component: CampaignListEdit,
      },
    ],
  },
  {
    path: "/counter",
    name: "counter",
    component: Counter,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
