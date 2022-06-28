<template>
  <div class="ma-0 pa-0">
    <v-card>
      <v-navigation-drawer permanent>
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
      { title: "テーブル", icon: "mdi-star", link: "/tableView" },
      { title: "ストアテスト", icon: "mdi-star", link: "/storeTest" },
      { title: "ダイナミックフォーム", icon: "mdi-star", link: "/dynamicForm" },
      { title: "カウンター", icon: "mdi-star", link: "/counter" },
      { title: "axiosユーザー一覧", icon: "mdi-star", link: "/usersList" },
    ]
    return { navis }
  },
})
</script>
