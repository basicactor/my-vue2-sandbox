<template>
  <div>
    <div>This is Home</div>
    <div>URL一覧</div>
    <p v-for="route in allRoutes" :key="route.key">
      <router-link :to="route.path">{{ route.path }}</router-link>
    </p>
    <!-- <p><router-link to="/checkboxView">チェックボックス</router-link></p>
    <p><router-link to="/selectView">セレクト</router-link></p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { routes } from "@/router"
import { RouteConfig } from "vue-router"

export default defineComponent({
  setup() {
    const allRoutes: Array<RouteConfig> = routes

    return { allRoutes }
  },
})
</script>
