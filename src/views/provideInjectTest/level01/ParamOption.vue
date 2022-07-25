<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="food.value"
        :items="foodOptions"
        placeholder="食事"
        :style="{ 'max-width': '200px' }"
      />
      <div class="px-2">を</div>
      <DefaultTextField
        v-model="frequency.value"
        :style="{ 'max-width': '200px' }"
      />
      <DefaultSelect
        v-if="food.value === 'japanese'"
        v-model="frequency.operator"
        :items="strOpertorOptions"
        :style="{ 'max-width': '200px' }"
      />
      <DefaultSelect
        v-if="food.value === 'chinese'"
        v-model="frequency.operator"
        :items="numOpertorOptions"
        :style="{ 'max-width': '200px' }"
      />
    </v-row>
    <!-- <pre> item:{{ customItem }}</pre> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, watch } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect.vue"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import { SegmentStore, SegmentKey, BaseConditonObj } from "../useSegment"
import {
  strOpertorOptions,
  numOpertorOptions,
} from "../DynamicFormProvideTest.vue"

export default defineComponent({
  components: {
    DefaultSelect,
    DefaultTextField,
  },
  props: {
    cardId: String,
    formId: String,
  },
  setup(props) {
    const { state } = inject(SegmentKey) as SegmentStore
    const rootItem = state.condition
    const cardItem = rootItem.value.find((i) => i.id === props.cardId)
    const formItem = cardItem?.value?.find((i) => i.id === props.formId)

    const formItemValue = formItem?.value as Array<BaseConditonObj>
    const food = formItemValue[0] ?? undefined
    const frequency = formItemValue[1] ?? undefined

    const foodOptions = [
      { text: "日本食", value: "japanese" },
      { text: "中華", value: "chinese" },
    ]

    //入力タイプによって数字入力か文字列入力の初期値を入れる
    watch(
      () => food.value,
      () => {
        if (food.value === "japanese") {
          //文字列入力の初期値
          frequency.value = ""
        } else if (food.value === "chinese") {
          //数字入力の初期値
          frequency.value = 0
        }
      },
      { deep: true }
    )

    return {
      food,
      frequency,
      foodOptions,
      strOpertorOptions,
      numOpertorOptions,
    }
  },
})
</script>
