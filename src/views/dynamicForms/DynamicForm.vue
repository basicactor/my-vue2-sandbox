<template>
  <div>
    <DefaultCard
      v-for="cardItem in rootItem.cardItems"
      :key="cardItem.id"
      class="mt-6"
      maxWidth="100%"
    >
      <template #content>
        <h2 class="py-4">アンケート</h2>
        <CloseButton
          delBtn
          :style="{ right: '0', top: '0' }"
          @click="deleteCard(cardItem.id)"
        />
        <v-container>
          <div
            v-for="(formItem, formIndex) in cardItem.formItems"
            :key="formItem.id"
          >
            <v-divider v-if="formIndex > 0" class="mb-6" />
            <v-row>
              <DefaultSelect
                v-model="formItem.level01"
                :items="level01Options"
                :style="{ 'max-width': '200px' }"
              />
              <CloseButton
                delBtn
                :style="{ right: '0' }"
                @click="deleteForm(cardItem.id, formItem.id)"
              />
            </v-row>
            <Level0101
              v-if="formItem.level01 === 'option1'"
              :item="formItem"
              @input="
                (inputedItem) =>
                  $set(cardItem.formItems, formIndex, inputedItem)
              "
            />
            <Level0102
              v-if="formItem.level01 === 'option2'"
              :item="formItem"
              @input="
                (inputedItem) =>
                  $set(cardItem.formItems, formIndex, inputedItem)
              "
            />
            <Level0103 v-if="formItem.level01 === 'option3'" :item="formItem" />
            <!-- <keep-alive>
              <component
                :is="state.activeSelect"
                v-bind="cardItem[Object.keys(cardItem)]"
              />
            </keep-alive> -->
          </div>
        </v-container>
      </template>
      <template #actions>
        <DefaultButton @click="addNewForm(cardItem.id)">追加</DefaultButton>
      </template>
    </DefaultCard>
    <DefaultButton class="mt-10" @click="addNewCard">カード追加</DefaultButton>
    <pre>rootItem:{{ rootItem }}</pre>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api"
import DefaultCard from "@/components/cards/DefaultCard"
import DefaultButton from "@/components/buttons/DefaultButton"
import DefaultSelect from "@/components/selects/DefaultSelect"
import CloseButton from "@/components/buttons/CloseButton"
import Level0101 from "./level01/Level0101"
import Level0102 from "./level01/Level0102"
import Level0103 from "./level01/Level0103"

export default defineComponent({
  components: {
    DefaultCard,
    DefaultButton,
    DefaultSelect,
    CloseButton,
    Level0101,
    Level0102,
    Level0103,
  },
  setup() {
    const level01Options = [
      { text: "オプション1", value: "option1" },
      { text: "オプション2", value: "option2" },
      { text: "オプション3", value: "option3" },
    ]

    const rootItem = reactive({
      id: "",
      cardItems: [{ id: "c1", formItems: [{ id: "f1", level01: "option1" }] }],
    })

    const addNewCard = () => {
      rootItem.cardItems.push({
        id: `c${rootItem.cardItems.length + 1}`,
        formItems: [{ id: "f1", level01: "option1" }],
      })
    }

    const addNewForm = (id) => {
      const cardItem = rootItem.cardItems.find((i) => i.id === id)
      cardItem.formItems.push({
        id: `f${cardItem.formItems.length + 1}`,
      })
    }

    //特定カードを削除
    const deleteCard = (cardId) => {
      const items = rootItem.cardItems
      items.splice(
        items.findIndex((i) => i.id === cardId),
        1
      )
    }

    //特定フォームを削除
    const deleteForm = (cardId, formId) => {
      const items = rootItem.cardItems.find((i) => i.id === cardId).formItems
      items.splice(
        items.findIndex((i) => i.id === formId),
        1
      )
    }

    return {
      level01Options,
      rootItem,
      addNewCard,
      addNewForm,
      deleteCard,
      deleteForm,
    }
  },
})
</script>
