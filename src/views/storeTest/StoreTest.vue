<template>
  <div class="pa-10">
    <DefaultTextField v-model="state.title" label="title" />
    <DefaultRadioBtn v-model="state.radioBtnSelected" :items="radioBtnItems" />
    <DefaultTextField v-model="state.objArray[0].title" label="objArray" />
    <DefaultTextField v-model="state.simpleArray[0]" label="simpleArray" />
    <DefaultTextField v-model="state.simpleObj.name" label="simpleObj" />
    <DefaultTextField v-model="state.nestedObj.name" label="nestedObj level1" />
    <DefaultTextField
      v-model="state.nestedObj.friend.name"
      label="nestedObj level2"
    />

    <CustomTable v-model="state.childObjArray" />

    <pre>state: {{ state }}</pre>
    <pre>store: {{ store }}</pre>
  </div>
</template>

<script>
/* eslint-disable */
// import { extend } from "vue"
import { defineComponent, reactive } from "@vue/composition-api"
import { useTest } from "@/store/testStore"
import DefaultTextField from "@/components/textFields/DefaultTextField.vue"
import CustomTable from "@/views/forms/CustomTable.vue"
import DefaultRadioBtn from "@/components/radioBtns/DefaultRadioBtn.vue"

export default defineComponent({
  components: {
    DefaultTextField,
    CustomTable,
    DefaultRadioBtn,
  },
  setup() {
    const store = useTest()

    const state = reactive({
      title: "",
      objArray: [{ name: "", title: "" }],
      childObjArray: [], //子コンポーネントに渡すArray
      simpleArray: [],
      simpleObj: {},
      nestedObj: {},
      radioBtnSelected: "",
    })

    const radioBtnItems = [
      { label: "ボタン1", value: "btn1" },
      { label: "ボタン2", value: "btn2" },
      { label: "ボタン3", value: "btn3" },
    ]

    //[プリミティブ]
    //storeデータは変更されない
    state.title = store.title
    // console.log(state.title === store.title) //true

    state.title = "wahaha" //片方の値を変更すると別ものになる
    // console.log(state.title === store.title) //false

    //[プリミティブ]
    //storeデータは変更されない
    state.radioBtnSelected = store.radioBtnSelected

    //[オブジェクト配列]
    //storeデータは変更される
    state.objArray = store.objArray
    // console.log(state.objArray === store.objArray) //true

    //[オブジェクト配列を再定義]
    //storeデータは変更される
    const newItems = store.objArray
    state.objArray = newItems
    // console.log(state.objArray === newItems) //true

    //[オブジェクト配列のコピー：非破壊的]
    //storeデータは変更される
    state.objArray = store.objArray.slice()
    // console.log(state.objArray === store.objArray.slice()) //false

    //[オブジェクト配列のコピー：shallowコピー]
    //storeデータは変更されない！
    state.objArray = store.objArray.map((i) => Object.assign({}, i))
    // console.log(
    //   state.objArray === store.objArray.map((i) => Object.assign({}, i))
    // ) //false

    //[オブジェクト配列のコピー：deepコピー]
    //storeデータは変更されない！
    state.objArray = JSON.parse(JSON.stringify(store.objArray))
    // console.log(state.objArray === JSON.parse(JSON.stringify(store.objArray))) //false

    //[単純配列]
    // storeデータは変更される
    state.simpleArray = store.simpleArray
    // console.log(state.simpleArray === store.simpleArray) //true

    state.simpleArray[0] = "wahaha" //配列要素を変えてもtrueのまま
    // console.log(state.simpleArray === store.simpleArray) //true

    //[単純配列のコピー：非破壊的]
    // storeデータは変更されない！
    state.simpleArray = store.simpleArray.slice()
    // console.log(state.simpleArray === store.simpleArray.slice()) //false

    //[子コンポーネントに渡すstateの値]
    //子側で変更してもstoreデータが変わる
    state.childObjArray = store.childObjArray

    //子側で変更してもstoreデータが変わない！！shallow copy
    state.childObjArray = store.childObjArray.map((i) => Object.assign({}, i))

    // [シンプルオブジェクト]
    //storeも変更される
    state.simpleObj = store.simpleObj
    //storeは変更されない！shallow copy
    // state.simpleObj = Object.assign({}, store.simpleObj)

    // [オブジェクトの中のオブジェクト]
    //全階層のstoreも変更される
    state.nestedObj = store.nestedObj
    //第一階層のstoreは変更されない！
    //第二階層のstoreは変更される！
    state.nestedObj = Object.assign({}, store.nestedObj)

    //全階層のstoreが変更されない！
    state.nestedObj = JSON.parse(JSON.stringify(store.nestedObj))

    const deepClone = (obj) => {
      const newObj = Object.assign({}, obj)
      Object.keys(newObj)
        .filter((k) => typeof newObj[k] === "object")
        .forEach((k) => (newObj[k] = deepClone(newObj[k])))
      return newObj
    }

    //全階層のstoreが変更されない！
    state.nestedObj = deepClone(store.nestedObj)

    //--------------------値と参照の検証-------------------^^^^^^^^^---------
    //https://qiita.com/yuta0801/items/f8690a6e129c594de5fb (すごく勉強になった)
    //------[プリミティブ]------
    let a = "a"
    let b = a

    a = "changed" //bは変更されない
    b = "changed" //aは変更されない

    //------[単純配列]------
    let arrA = ["a"]
    let arrB = arrA

    arrB = ["changed"] //arrAは変更されない
    arrB.push("changed") //arrAも変更される。

    //------[オブジェクト]------
    let objA = { name: "john" }
    let objB = objA

    objB.name = "kevin" //objAも変更される。
    objA.name = "kevin" //objBも変更される。

    //------[オブジェクト配列]------
    let objArrA = [{ name: "john" }]
    let objArrB = objArrA

    objArrB[0].name = "kevin" //objArrA[0].nameも変更される。
    objArrA[0].name = "kevin" //objArrB[0].nameも変更される。
    //--------------------終わり-------------------^^^^^^^^^---------

    //--------------------JSON.stringfyの検証-------------------^^^^^^^^^---------
    //参考：https://qiita.com/seihmd/items/74fa9792d05278a2e898

    // [通常]
    const objNomal = { name: "john", height: 170 }
    // console.log(JSON.stringify(objNomal)) //{"name":"john","height":170}

    //[undifiend]
    //undefinedの値を持っているプロパティは消される。
    const objHasUndifined = { name: undefined }
    // console.log(JSON.stringify(objHasUndifined)) //{}
    // console.log(objHasUndifined.toJSON()) //error: objHasUndifined does not have toJSON method

    //[null]
    //nullの値を持っているプロパティは残る
    const objHasNull = { name: null }
    console.log(JSON.stringify(objHasNull)) //{"name":null}

    //[空文字]
    //空文字の値を持っているプロパティは残る。
    const objHasEmptyString = { name: "" }
    console.log(JSON.stringify(objHasEmptyString)) //{"name":""}

    //[空白文字]
    //空白文字の値を持っているプロパティはそのまま残る。
    const objHasSpaceString = { name: " " }
    console.log(JSON.stringify(objHasSpaceString)) //{"name":" "}

    //[function]
    //functionは消える
    const objHasFunction = { fn: () => {} }
    // console.log(JSON.stringify(objHasFunction)) //{}

    //[Date]
    const objHasDate = { date: new Date() }
    // console.log(objHasDate) //Sun Jun 19 2022 11:00:31 GMT+0900 (日本標準時)
    // console.log(JSON.stringify(objHasDate)) //{"date":"2022-06-19T01:38:13.873Z"}

    //[Local Date]
    const objHasLocalDate = { date: new Date().toLocaleString() }
    // console.log(objHasLocalDate) //{date: '2022/6/19 11:02:18'}
    // console.log(JSON.stringify(objHasLocalDate)) //{"date":"2022/6/19 11:02:18"}

    //[iso Date]
    const objHasISODate = { date: new Date().toISOString() }
    // console.log(objHasISODate) //{date: '2022-06-19T02:04:28.941Z'}
    // console.log(JSON.stringify(objHasISODate)) //{"date":"2022-06-19T02:04:28.941Z"}

    const objHasDateToJson = { date: new Date().toJSON() }
    // console.log(objHasDateToJson) //{date: '2022-06-19T02:15:05.098Z'}
    // console.log(JSON.stringify(objHasDateToJson)) //{"date":"2022-06-19T02:15:05.098Z"}

    return { state, store, radioBtnItems }
  },
})
</script>
