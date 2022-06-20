<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      :items-per-page="5"
      disable-sort
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.title="{ item }">
        <DefaultSelect
          v-model="item.title"
          :items="selectOptions"
          class="pt-4"
          @input="() => $emit('input', tableItems)"
        />
      </template>
      <template v-slot:item.mount="{ item }">
        <DefaultSlider
          v-model="item.mount"
          @input="() => $emit('input', tableItems)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect.vue"
import DefaultSlider from "@/components/sliders/DefaultSlider.vue"

export default defineComponent({
  components: {
    DefaultSelect,
    DefaultSlider,
  },
  props: {
    value: Array,
  },
  setup(props) {
    const headers = [
      { text: "タイトル", value: "title", width: "200px" },
      { text: "数量", value: "mount" },
    ]

    const tableItems = reactive(
      props.value.length > 0
        ? props.value
        : [
            { title: "", mount: "" },
            { title: "", mount: "" },
          ]
    )

    const selectOptions = [
      { text: "セレクト1", value: "select1" },
      { text: "セレクト2", value: "select2" },
      { text: "セレクト3", value: "select3" },
    ]

    return { headers, tableItems, selectOptions }
  },
})
</script>
