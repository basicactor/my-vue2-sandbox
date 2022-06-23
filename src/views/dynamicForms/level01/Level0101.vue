<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="customItem.food"
        :items="foodOptions"
        placeholder="食事"
        :style="{ 'max-width': '200px' }"
        @input="() => $emit('input', customItem)"
      />
    </v-row>
    <!-- <pre> item:{{ customItem }}</pre> -->
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect"

export default defineComponent({
  components: {
    DefaultSelect,
  },
  props: {
    item: Object,
  },
  setup(props) {
    const customItem = reactive({
      ...props.item,
      food: "",
    })

    const foodOptions = [
      { text: "日本食", value: "japanese" },
      { text: "中華", value: "chinese" },
      { text: "洋食", value: "western" },
    ]

    console.log("props", props.item)

    return { customItem, foodOptions }
  },
})
</script>
