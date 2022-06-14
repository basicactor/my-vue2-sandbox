<template>
  <div>
    <Table :headers="headers" :items="items">
      <template #actions="{ id }">
        <v-btn icon @click="openEditPage(id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon><v-icon>mdi-menu</v-icon></v-btn>
      </template>
    </Table>

    <v-btn @click="appendRow">Append row </v-btn>

    <!-- <EditPage v-if="isOpenEditPage" :item="{ id: '' }" /> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api"
import Table from "@/components/Table"
// import EditPage from "./EditPage"
//routerの使い方：https://qiita.com/azukiazusa/items/9f467fdea7298baf3476
import { useRouter } from "@/plugins/router"
import { useCampaign } from "@/store/campaignStore.js"

export default defineComponent({
  components: {
    Table,
    // EditPage,
  },
  setup() {
    const router = useRouter()
    const isOpenEditPage = ref(false)

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

    const openEditPage = (id) => {
      console.log("id", id)
      // isOpenEditPage.value = true
      router.push("/campaignList/edit")
      console.log("edit item: ", campaignStore.getItemById(id))
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

    return { headers, items, openEditPage, isOpenEditPage, appendRow }
  },
})
</script>
