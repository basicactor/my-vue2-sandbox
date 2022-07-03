<template>
  <div class="ma-0 pa-0">
    <v-card>
      <v-navigation-drawer
        permanent
        height="auto"
        :style="{ 'min-height': '100vh' }"
      >
        <v-list> </v-list>

        <v-list nav dense>
          <template v-for="navi in navis">
            <v-list-item :key="navi.link" :to="navi.link">
              <v-list-item-icon>
                <v-icon>{{ navi.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ navi.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const navis = [
      { title: "form", icon: "mdi-star", link: "/form" },
      { title: "テーブル", icon: "mdi-table-edit", link: "/tableView" },
      { title: "ストアテスト", icon: "mdi-database", link: "/storeTest" },
      {
        title: "ダイナミックフォーム",
        icon: "mdi-text-box-edit",
        link: "/dynamicForm",
      },
      { title: "カウンター", icon: "mdi-counter", link: "/counter" },
      {
        title: "axiosユーザー一覧",
        icon: "mdi-account-multiple",
        link: "/usersList",
      },
    ]
    return { navis }
  },
})
</script>
