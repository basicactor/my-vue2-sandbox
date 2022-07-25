<template>
  <!-- <div class="ma-0 pa-0" :style="{ position: 'fixed' }"> -->
  <!-- <v-navigation-drawer
    permanent
    class="ma-0 pa-0"
    expand-on-hover
    height="auto"
    :style="{
      'min-height': '100vh',
      position: 'fixed',
      top: '65px',
      'background-color': 'white',
      'z-index': '10',
      'backdrop-filter': 'blur(4px)',
    }"
  > -->
  <v-navigation-drawer
    class="ma-0 pa-0 custom-drawer"
    expand-on-hover
    height="auto"
    fixed
  >
    <v-list class="mt-6">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>x tarou</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />

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
  <!-- </div> -->
</template>

<script lang="ts">
//@ts-nocheck
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
      {
        title: "ダイナミックフォーム(ProvideTest)",
        icon: "mdi-star",
        link: "/dynamicFormProvideTest",
      },

      { title: "カウンター", icon: "mdi-counter", link: "/counter" },
      {
        title: "axiosユーザー一覧",
        icon: "mdi-account-multiple",
        link: "/usersList",
      },
      {
        title: "reactiveTest",
        icon: "mdi-account-multiple",
        link: "/reactiveTest",
      },
      {
        title: "refTest",
        icon: "mdi-account-multiple",
        link: "/refTest",
      },
      {
        title: "provideInjectTest2",
        icon: "mdi-star",
        link: "/provideInjectTest2",
      },
    ]
    return { navis }
  },
})
</script>

<style lang="scss" scoped>
.custom-drawer {
  min-height: 400px;
  top: 10% !important;
  background-color: white;
  z-index: 10;
  backdrop-filter: blur(4px);
  border-radius: 0 100px 100px 0;
  box-shadow: 3px 5px 5px #e2e2e2;

  &.v-navigation-drawer--is-mouseover {
    border-radius: 10px;
    // min-height: 100vh;
  }
}
</style>
