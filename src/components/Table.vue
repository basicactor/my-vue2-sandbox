<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <slot name="actions" :id="item.id" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: {
    headers: Array,
    items: Array,
  },
  setup() {
    return {}
  },
})
</script>
