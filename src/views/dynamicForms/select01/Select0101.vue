<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="state.select02"
        :items="select01"
        placeholder="select02"
      />
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect"

export default defineComponent({
  components: {
    DefaultSelect,
  },
  setup() {
    const state = {
      select02: "",
    }
    const select01 = [
      { text: "オプション1", value: "option1" },
      { text: "オプション2", value: "option2" },
      { text: "オプション3", value: "option3" },
    ]
    return { state, select01 }
  },
})
</script>
