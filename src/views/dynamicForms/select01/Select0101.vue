<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="state.select02"
        :items="select01"
        placeholder="select02"
      />
      item:{{ item }}
    </v-row>
  </div>
</template>

<script>
import { defineComponent, onActivated } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect"

export default defineComponent({
  components: {
    DefaultSelect,
  },
  props: {
    item: Object,
  },
  setup(props) {
    const state = {
      select02: "",
      item: [],
    }
    const select01 = [
      { text: "オプション1", value: "option1" },
      { text: "オプション2", value: "option2" },
      { text: "オプション3", value: "option3" },
    ]

    console.log("props", props.item)

    onActivated(() => {
      state.item = props.item
      console.log("activated")
    })
    return { state, select01 }
  },
})
</script>
