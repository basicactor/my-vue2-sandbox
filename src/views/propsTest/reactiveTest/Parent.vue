<template>
  <div>
    <h1 class="white--text">Reactive TEST</h1>
    <Child01 v-if="true" :item="test01.reactivObj" />
    <Child02 v-if="true" :item="test01.reactivObj" />
    <!-- ↓こっちだと子コンポーネントのstateが変わる。ただし、props.itemがvalueから始まる） -->
    <Child03 v-if="false" :item="test03.refObj" />
    <!-- ↓こっちだと子コンポーネントのstateが変わらない: define使ってないRefでも同じ動き） -->
    <Child03 v-if="false" :item="test03.refObj.value" />

    <Child04 v-if="true" :item="test04.objArray" />
    <Child05 v-if="true" :item="test05.objArray" />
    <Child06 v-if="true" :item="test06.objArray" />
    <Child07 v-if="true" :item="test07.deepObj" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api"
import Child01 from "./Child01.vue"
import Child02 from "./Child02.vue"
import Child03 from "./Child03.vue"
import Child04 from "./Child04.vue"
import Child05 from "./Child05.vue"
import Child06 from "./Child06.vue"
import Child07 from "./Child07.vue"

export interface Item {
  id: string
  name: string
}

//=========================
//テスト01（対象：Child01, Child02)
//=========================
const defineTest01 = () => {
  const reactivObj = reactive<Item>({
    id: "1",
    name: "john",
  })

  const changeData = (time = 2000): void => {
    //オブジェクトの値を変更する
    setTimeout(() => {
      reactivObj.id = "newVal"
      reactivObj.name = "newVal"
    }, time)
  }

  const test01 = { reactivObj, changeData }
  return test01
}

//=========================
//テスト03（対象：Child03)
//=========================
const defineTest03 = () => {
  const refObj = ref<Item>({
    id: "1",
    name: "john",
  })

  const changeData = (time = 2000): void => {
    //オブジェクトに再代入する
    setTimeout(() => {
      refObj.value = { id: "newVal", name: "newVal" }
    }, time)
  }

  const test03 = { refObj, changeData }
  return test03
}

//=========================
//テスト04（対象：Child04)
//=========================
const defineTest04 = () => {
  const objArray = reactive<Array<Item>>([
    { id: "1", name: "john" },
    { id: "2", name: "kevin" },
  ])

  const changeData = (time = 2000): void => {
    //配列内の1番目要素の値を変更する
    setTimeout(() => {
      objArray[0].id = "newVal"
      objArray[0].name = "newVal"
    }, time)
  }

  const test04 = { objArray, changeData }
  return test04
}

//=========================
//テスト05（対象：Child05)
//=========================
const defineTest05 = () => {
  const objArray = reactive<Array<Item>>([
    { id: "1", name: "john" },
    { id: "2", name: "kevin" },
  ])

  const changeData = (time = 2000): void => {
    //配列内の1番目要素にオブジェクトを再代入する(対象：child05)
    setTimeout(() => {
      objArray[0] = { id: "newVal", name: "newVal" }
    }, time)
  }

  const test05 = { objArray, changeData }
  return test05
}
//=========================
//テスト06（対象：Child06)
//=========================
const defineTest06 = () => {
  const objArray = reactive<Array<Item>>([
    { id: "1", name: "john" },
    { id: "2", name: "kevin" },
  ])

  const changeData = (time = 2000): void => {
    //配列内の1番目要素にオブジェクトをpushする
    setTimeout(() => {
      objArray.push({ id: "newVal", name: "newVal" })
    }, time)
  }

  const test06 = { objArray, changeData }
  return test06
}
//=========================
//テスト07（対象：Child07)
//=========================
const defineTest07 = () => {
  type Obj = { title: string }
  type DeepItem = Item & { deep: Obj }

  const obj = { title: "award" }
  const deepObj = reactive<DeepItem>({ id: "1", name: "john", deep: obj })

  const changeData = (time = 2000): void => {
    //オブジェクト内のオブジェクトの値を変更する
    setTimeout(() => {
      deepObj.deep.title = "newValue"
    }, time)
  }

  const test07 = { deepObj, changeData }
  return test07
}

export default defineComponent({
  components: {
    Child01,
    Child02,
    Child03,
    Child04,
    Child05,
    Child06,
    Child07,
  },
  props: {},
  setup() {
    const test01 = defineTest01()
    test01.changeData()

    const test03 = defineTest03()
    test03.changeData()

    const test04 = defineTest04()
    test04.changeData()

    const test05 = defineTest05()
    test05.changeData()

    const test06 = defineTest06()
    test06.changeData()

    const test07 = defineTest07()
    test07.changeData()

    return { test01, test03, test04, test05, test06, test07 }
  },
})
</script>
