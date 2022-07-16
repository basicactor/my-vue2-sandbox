<template>
  <div>
    <div>This is Home</div>
    <p><router-link to="/checkboxView">チェックボックス</router-link></p>
    <p><router-link to="/selectView">セレクト</router-link></p>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {},
})
</script>
