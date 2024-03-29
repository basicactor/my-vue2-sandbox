<template>
  <div>
    <DefaultCard
      v-for="cardItem in rootItem.value"
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
            v-for="(formItem, formIndex) in cardItem.value"
            :key="formItem.id"
          >
            <v-divider v-if="formIndex > 0" class="mb-6" />
            <v-row>
              <DefaultSelect
                v-model="formItem.type"
                :items="level01Options"
                :style="{ 'max-width': '200px' }"
              />
              <CloseButton
                delBtn
                :style="{ right: '0' }"
                @click="deleteForm(cardItem.id, formItem.id)"
              />
            </v-row>
            <PageOption
              v-if="formItem.type === 'page'"
              :formId="formItem.id"
              :cardId="cardItem.id"
              @input="
                (inputedItem) =>
                  $set(cardItem.formItems, formIndex, inputedItem)
              "
            />
            <ParamOption
              v-if="formItem.type === 'param'"
              :formId="formItem.id"
              :cardId="cardItem.id"
              @input="
                (inputedItem) =>
                  $set(cardItem.formItems, formIndex, inputedItem)
              "
            />
          </div>
        </v-container>
      </template>
      <template #actions>
        <DefaultButton @click="addNewForm(cardItem.id)">追加</DefaultButton>
      </template>
    </DefaultCard>
    <DefaultButton class="mt-10" @click="addNewCard">カード追加</DefaultButton>
    <!-- <pre>rootItem:{{ rootItem }}</pre> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  inject,
  computed,
} from "@vue/composition-api"
import DefaultCard from "@/components/cards/DefaultCard.vue"
import DefaultButton from "@/components/buttons/DefaultButton.vue"
import DefaultSelect from "@/components/selects/DefaultSelect.vue"
import CloseButton from "@/components/buttons/CloseButton.vue"
import PageOption from "./level01/PageOption.vue"
import ParamOption from "./level01/ParamOption.vue"
import useSegment, { SegmentStore, SegmentKey } from "./useSegment"
import { Segment, ConditionForm, ConditionValue } from "@/models/segment"

export const numOpertorOptions = [
  {
    text: "と等しい",
    value: "eq",
  },
  {
    text: "以上",
    value: "ge",
  },
  {
    text: "以下",
    value: "le",
  },
]

export const strOpertorOptions = [
  {
    text: "と等しい",
    value: "eq",
  },
  {
    text: "から始まる",
    value: "startWith",
  },
  {
    text: "を含む",
    value: "include",
  },
]

export default defineComponent({
  components: {
    DefaultCard,
    DefaultButton,
    DefaultSelect,
    CloseButton,
    PageOption,
    ParamOption,
  },
  setup() {
    const level01Options = [
      { text: "ページ", value: "page" },
      { text: "パラメータ", value: "param" },
    ]

    const { state } = inject(SegmentKey) as SegmentStore

    //computedを付けないと値が反映されない。なぜ？ 子コンポーネントはcomputed使わなくても値が変更される。
    //⇒objectリテラルを直接代入してるから、reativityが失われたのかも？
    //⇒stateは変わっているが、rootItemが変わってない。
    const rootItem = computed(() => state.condition)

    // const rootItem = reactive({
    //   id: "",
    //   cardItems: [{ id: "c1", formItems: [{ id: "f1", level01: "option1" }] }],
    // })

    const pageDefultFormValue: Array<ConditionValue> = [
      //pageで使われるデフォルト値をセットしないと怒られる。
      {
        type: "page_id",
        operator: "eq",
        value: "1",
      },
      {
        type: "page_frequency",
        operator: "eq",
        value: "10",
      },
    ]

    const addNewCard = () => {
      rootItem.value.value.push({
        id: `c${rootItem.value.value.length + 1}`,
        type: "andOr",
        operator: "and",
        value: [
          {
            id: "f1",
            type: "page",
            operator: "and",
            value: [], //pageDefultFormValue
          },
        ],
      })
    }

    const addNewForm = (id: string) => {
      const cardItem = rootItem.value.value.find((i) => i.id === id)
      if (!cardItem?.value) return
      cardItem.value.push({
        id: `f${cardItem.value.length + 1}`,
        type: "page",
        operator: "and",
        value: [], //pageDefultFormValue
      })
    }

    //特定カードを削除
    const deleteCard = (cardId: string) => {
      const items = rootItem.value.value
      items.splice(
        items.findIndex((i) => i.id === cardId),
        1
      )
    }

    //特定フォームを削除
    const deleteForm = (cardId: string, formId: string) => {
      const items = rootItem.value.value.find((i) => i.id === cardId)?.value
      if (!items) return
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
