<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="activity.value"
        :items="activityOptions"
        placeholder="娯楽"
        :style="{ 'max-width': '200px' }"
      />
      <div class="px-2">を</div>
      <DefaultTextField
        v-model="frequency.value"
        :style="{ 'max-width': '200px' }"
      />
      <DefaultSelect
        v-model="frequency.operator"
        :items="numOpertorOptions"
        :style="{ 'max-width': '200px' }"
      />
    </v-row>
    <!-- <pre>{{ customItem }}</pre> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api"
import DefaultSelect from "@/components/selects/DefaultSelect.vue"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import { SegmentStore, SegmentKey, BaseConditonObj } from "../useSegment"
import { numOpertorOptions } from "../DynamicFormProvideTest.vue"

export default defineComponent({
  components: {
    DefaultSelect,
    DefaultTextField,
  },
  props: { cardId: String, formId: String },
  setup(props) {
    const { state } = inject(SegmentKey) as SegmentStore
    const rootItem = state.condition

    const cardItem = rootItem.value.find((i) => i.id === props.cardId)
    const formItem = cardItem?.value?.find((i) => i.id === props.formId)

    const formItemValue = formItem?.value as Array<BaseConditonObj>
    const activity = formItemValue[0] ?? undefined
    const frequency = formItemValue[1] ?? undefined

    // console.log("props.cardId", props.cardId)
    // console.log("cardItem", cardItem)
    // console.log("formItem", formItem)
    // // const customItem = reactive({
    // //   activity: "",
    // //   frequency: "",
    // // })

    const activityOptions = [
      { text: "音楽", value: "music" },
      { text: "映画", value: "movie" },
      { text: "スポーツ", value: "suport" },
    ]

    // const frequencyOptions = [
    //   { text: "週１", value: "onceAWeek" },
    //   { text: "月１", value: "onceAMonth" },
    //   { text: "毎日", value: "everyDay" },
    // ]
    return { activity, frequency, activityOptions, numOpertorOptions }
  },
})
</script>
