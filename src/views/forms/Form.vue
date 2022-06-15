<template>
  <div>
    <DefaultCheckbox v-model="state.checkboxSelected" :items="checkboxItems" />
    <DefaultSelect v-model="state.selectSelected" :items="selectItems" />
    <DefaultRadioBtn v-model="state.radioBtnSelected" :items="radioBtnItems" />
    <pre>{{ state }}</pre>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api"
import DefaultCheckbox from "@/components/checkboxes/DefaultCheckbox.vue"
import DefaultSelect from "@/components/selects/DefaultSelect.vue"
import DefaultRadioBtn from "@/components/radioBtns/DefaultRadioBtn.vue"

export default defineComponent({
  components: {
    DefaultCheckbox,
    DefaultSelect,
    DefaultRadioBtn,
  },
  setup() {
    const state = reactive({
      checkboxSelected: [],
      selectSelected: "",
      radioBtnSelected: "",
    })

    const checkboxItems = [
      { label: "チェック1", value: "check1" },
      { label: "チェック2", value: "check2" },
      { label: "チェック3", value: "check3" },
    ]

    const selectItems = [
      { text: "セレクト1", value: "select1" },
      { text: "セレクト2", value: "select2" },
      { text: "セレクト3", value: "select3" },
    ]

    const radioBtnItems = [
      { label: "ボタン1", value: "btn1" },
      { label: "ボタン2", value: "btn2" },
      { label: "ボタン3", value: "btn3" },
    ]

    return { state, checkboxItems, selectItems, radioBtnItems }
  },
})
</script>
