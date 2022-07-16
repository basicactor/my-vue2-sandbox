<template>
  <div>
    <v-row>
      <DefaultSelect
        v-model="customItem.activity"
        :items="activityOptions"
        :style="{ 'max-width': '200px' }"
        @input="() => $emit('input', customItem)"
      />
      <div class="px-2">を</div>
      <DefaultSelect
        v-model="customItem.frequency"
        :items="frequencyOptions"
        :style="{ 'max-width': '200px' }"
        @input="() => $emit('input', customItem)"
      />
    </v-row>
    <!-- <pre>{{ customItem }}</pre> -->
  </div>
</template>

<script lang="ts">
//@ts-nocheck
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
      activity: "",
      frequency: "",
    })
    const activityOptions = [
      { text: "音楽", value: "music" },
      { text: "映画", value: "movie" },
      { text: "スポーツ", value: "suport" },
    ]

    const frequencyOptions = [
      { text: "週１", value: "onceAWeek" },
      { text: "月１", value: "onceAMonth" },
      { text: "毎日", value: "everyDay" },
    ]
    return { customItem, activityOptions, frequencyOptions }
  },
})
</script>
