<template>
  <IconButton
    iconName="mdi-close"
    :color="delBtn ? 'red' : 'black'"
    @click="() => $emit('click')"
  />
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from "@vue/composition-api"
import IconButton from "./IconButton"

export default defineComponent({
  components: {
    IconButton,
  },
  props: {
    delBtn: Boolean,
  },
  setup() {},
})
</script>
