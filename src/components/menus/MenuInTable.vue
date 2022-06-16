<template>
  <DefaultMenu>
    <template #list>
      <v-list-item @click="onEditClick">
        <v-list-item-title> 編集 </v-list-item-title>
      </v-list-item>
      <v-list-item @click="onCopyClick">
        <v-list-item-title> 複製 </v-list-item-title>
      </v-list-item>
      <slot />
      <v-list-item @click="onDeleteClick">
        <v-list-item-title class="red--text"> 削除 </v-list-item-title>
      </v-list-item>
    </template>
  </DefaultMenu>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import DefaultMenu from "./DefaultMenu.vue"

export default defineComponent({
  components: {
    DefaultMenu,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onEditClick = () => {
      console.log("onEditClick", props.id)
      emit("onEditClick", props.id)
    }
    const onCopyClick = () => {
      console.log("onCopyClick", props.id)
      emit("onCopyClick", props.id)
    }
    const onDeleteClick = () => {
      console.log("onDeleteClick", props.id)
      emit("onDeleteClick", props.id)
    }

    return { onEditClick, onCopyClick, onDeleteClick }
  },
})
</script>
