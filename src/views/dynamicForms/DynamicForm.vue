<template>
  <div>
    <DefaultCard v-for="cardItem in cardItems" :key="cardItem.id" class="mt-6">
      <template #content>
        <v-container>
          <div
            v-for="(formItem, index) in cardItem.formItems"
            :key="formItem.id"
          >
            <hr v-if="index !== 0" class="mb-6" />
            <v-row>
              <DefaultSelect
                v-model="state.select01"
                :items="select01"
                @input="onSelectInput"
              />
            </v-row>
            <!-- is directiveだとidも渡せないのかな? -->
            <!-- <Select0101 v-if="state.isShowSelect0101" />
            <Select0102 v-if="state.isShowSelect0102" />
            <Select0103 v-if="state.isShowSelect0103" /> -->
            <keep-alive>
              <component
                :is="state.activeSelect"
                v-bind="cardItem[Object.keys(cardItem)]"
              />
            </keep-alive>
          </div>
        </v-container>
      </template>
      <template #actions>
        <DefaultButton @click="addNewForm(cardItem.id)">追加</DefaultButton>
      </template>
    </DefaultCard>
    <DefaultButton class="mt-10" @click="addNewCard">カード追加</DefaultButton>
    <pre>state:{{ state }}</pre>
    <pre>cardItems:{{ cardItems }}</pre>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api"
import DefaultCard from "@/components/cards/DefaultCard"
import DefaultButton from "@/components/buttons/DefaultButton"
import DefaultSelect from "@/components/selects/DefaultSelect"
import Select0101 from "./select01/Select0101"
import Select0102 from "./select01/Select0102"
import Select0103 from "./select01/Select0103"

export default defineComponent({
  components: {
    DefaultCard,
    DefaultButton,
    DefaultSelect,
    Select0101,
    Select0102,
    Select0103,
  },
  setup() {
    const state = reactive({
      select01: "",
      select02: "",
      isShowSelect0101: false,
      isShowSelect0102: false,
      isShowSelect0103: false,
      activeSelect: "",
    })
    const select01 = [
      { text: "オプション1", value: "option1" },
      { text: "オプション2", value: "option2" },
      { text: "オプション3", value: "option3" },
    ]

    const cardItems = reactive([
      { id: "c1", formItems: [{ id: "f1", title: "haha" }] },
    ])

    const addNewCard = () => {
      cardItems.push({
        id: `c${cardItems.length + 1}`,
        title: "",
        formItems: [{ id: `f${cardItems.length + 1}`, title: "haha" }],
      })
    }

    const addNewForm = (id) => {
      const cardItem = cardItems.filter((i) => i.id === id)[0]
      cardItem.formItems.push({
        id: cardItem.formItems.length + 1,
        title: "",
      })
    }

    const onSelectInput = (input) => {
      // state.isShowSelect0101 = false
      // state.isShowSelect0102 = false
      // state.isShowSelect0103 = false
      // if (input === "option1") state.isShowSelect0101 = true
      // else if (input === "option2") state.isShowSelect0102 = true
      // else if (input === "option3") state.isShowSelect0103 = true

      if (input === "option1") state.activeSelect = "Select0101"
      else if (input === "option2") state.activeSelect = "Select0102"
      else if (input === "option3") state.activeSelect = "Select0103"
    }

    return { state, select01, cardItems, addNewCard, addNewForm, onSelectInput }
  },
})
</script>
