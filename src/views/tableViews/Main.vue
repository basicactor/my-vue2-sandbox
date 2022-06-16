<template>
  <div>
    <Table :headers="headers" :items="items">
      <template #actions="{ id }">
        <div>{{ id }}</div>
        <MenuInTable :id="id" @onEditClick="goToEditPage(id)">
          <v-list-item @click="appendRow">
            <v-list-item-title> 追加 </v-list-item-title>
          </v-list-item>
        </MenuInTable>
      </template>
    </Table>

    <v-btn @click="appendRow">Append row </v-btn>

    <!-- <EditPage v-if="isOpenEditPage" :item="{ id: '' }" /> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import Table from "@/components/Table"
import MenuInTable from "@/components/menus/MenuInTable.vue"
// import EditPage from "./EditPage"
//routerの使い方：https://qiita.com/azukiazusa/items/9f467fdea7298baf3476
import { useRouter } from "@/plugins/router"
import { useCampaign } from "@/store/campaignStore.js"

export default defineComponent({
  components: {
    Table,
    // EditPage,
    MenuInTable,
  },
  setup() {
    const router = useRouter()
    // const isOpenEditPage = ref(false)

    const campaignStore = useCampaign()
    const items = campaignStore.items

    const headers = [
      { text: "", value: "actions" },
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ]

    const goToEditPage = (id) => {
      router.push(`/tableView/${id}/edit`)
    }

    const appendRow = () => {
      const row = {
        actions: "",
        id: "4",
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      }

      campaignStore.items.push(row)
    }

    // const onEditClick = () => {
    //   console.log("onEditClick")
    // }
    // const onCopyClick = () => {
    //   console.log("onCopyClick")
    // }
    // const onDeleteClick = () => {
    //   console.log("onDeleteClick")
    // }

    return {
      headers,
      items,
      // menuItems,
      // isOpenEditPage,
      // openEditPage,
      appendRow,
      goToEditPage,
    }
  },
})
</script>
